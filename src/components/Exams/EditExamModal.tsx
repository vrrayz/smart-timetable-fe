import { editExams } from "@/actions/exams";
import {
  ModalOverlay,
  Modal,
  ModalHeading,
  CloseButton,
  ModalBody,
} from "@/styles";
import {
  CurrentTerm,
  Exam,
  ScheduleInputsWithId,
  TimeFieldsInput,
} from "@/types";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorModal } from "../modals/ErrorModal";
import { Label, ErrorMessage, Input, Select } from "../Form";
import { useCoursesHook } from "@/hooks/useCoursesHook";
import { millisecondsToTime, timeToMilliseconds } from "@/helpers";
import { redirect } from "next/navigation";

type ExamsFormInputs = {
  courseId: number;
  termId: number;
  room?: string;
  building?: string;
  schedule: ScheduleInputsWithId[];
};

interface Props {
  setShowModal: (value: boolean) => void;
  currentSelectedExam: Exam;
  currentTerm: CurrentTerm;
}
type FormNames = "startTime" | "endTime";
export const EditExamModal = ({
  setShowModal,
  currentSelectedExam,
  currentTerm,
}: Props) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ExamsFormInputs>({
    defaultValues: {
      ...(currentSelectedExam as unknown as ExamsFormInputs),
      schedule: [
        {
          days: currentSelectedExam.schedule[0].days.split(","),
          startDate: new Date(currentSelectedExam.schedule[0].startDate)
            .toISOString()
            .split("T")[0],
          endDate: new Date(currentSelectedExam.schedule[0].endDate)
            .toISOString()
            .split("T")[0],
          startTime: currentSelectedExam.schedule[0].startTime,
          endTime: currentSelectedExam.schedule[0].endTime,
        },
      ],
    },
  });

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [isFormActionSuccessful, setIsFormActionSuccessful] =
    useState<boolean>(false);
  const { courses, setCourses } = useCoursesHook(currentTerm);
  const [timeFields, setTimeFields] = useState<TimeFieldsInput>({
    startTime: millisecondsToTime(currentSelectedExam.schedule[0].startTime),
    endTime: millisecondsToTime(currentSelectedExam.schedule[0].endTime),
  });

  const closeModal = (event: any) => {
    if (event.target.id === "modal-overlay") setShowModal(false);
  };

  const setTimeValues = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: FormNames,
    index: number
  ) => {
    const millisecondTime = timeToMilliseconds(event.target.value);
    setValue(`schedule.${index}.${name}`, millisecondTime);
    setTimeFields((prev) => {
      return { ...prev, [name]: event.target.value };
    });
  };

  const onSubmit: SubmitHandler<ExamsFormInputs> = (data) => {
    const actualSchedule = data.schedule.map(({ startDate, ...item }) => {
      return {
        ...item,
        id: currentSelectedExam.schedule[0].id,
        startTime: item.startTime || 0,
        endTime: item.endTime || 0,
        startDate,
        endDate: startDate,
        days: new Date(startDate).toLocaleDateString("en-US", {
          weekday: "long",
        }),
        // days:
        //   item.days?.length > 0
        //     ? item.days.join(",")
        //     : new Date(startDate).toLocaleDateString("en-US", {
        //         weekday: "long",
        //       }),
      };
    });
    const actualFormData = {
      ...data,
      courseId: Number(data.courseId),
      termId: currentTerm?.termId,
      schedule: actualSchedule,
    };
    editExams(actualFormData, currentSelectedExam.id).then(async (res) => {
      if (res.statusCode !== 200) setShowErrorModal(true);
      else {
        setIsFormActionSuccessful(true);
      }
    });
  };
  useEffect(() => {
    if (currentTerm && courses) {
      setCourses(
        courses.filter((course) => course.termId === currentTerm.termId)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTerm]);

  useEffect(() => {
    if (isFormActionSuccessful) redirect("/dashboard/exams");
  }, [isFormActionSuccessful]);

  return (
    <ModalOverlay onClick={(event) => closeModal(event)} id="modal-overlay">
      {showErrorModal ? (
        <ErrorModal title={"Error Updating Exam"} setShowModal={setShowModal} />
      ) : (
        <Modal>
          <ModalHeading>Edit Exam</ModalHeading>
          <CloseButton onClick={() => setShowModal(false)}>
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </CloseButton>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Label htmlFor="courseId">Course</Label>
              <Select
                {...register("courseId", {
                  required: "Please select a course",
                })}
                className="mb-2"
                defaultValue={currentSelectedExam.courseId}
              >
                {courses?.map((course) => (
                  <option
                    value={course.id}
                    key={course.id}
                    selected={currentSelectedExam.courseId === course.id}
                  >
                    {course.title}
                  </option>
                ))}
              </Select>
              <Label htmlFor="room">Room</Label>
              <Input
                type="text"
                {...register("room")}
                className={`${errors.room ? "mb-0" : "mb-2"}`}
                // value={currentSelectedExam.room}
              />
              <Label htmlFor="building">Building</Label>
              <Input
                type="text"
                {...register("building")}
                className={`${errors.building ? "mb-0" : "mb-2"}`}
              />
              <Label htmlFor="time">Date</Label>
              <Input
                type="date"
                {...register(`schedule.${0}.startDate`, { required: true })}
                className={`${errors.schedule ? "mb-0" : "mb-2"}`}
              />

              <Label htmlFor="time">Time</Label>
              <div className="flex place-content-around gap-2 mb-2">
                <Input
                  type="time"
                  onChange={(event) => setTimeValues(event, "startTime", 0)}
                  value={timeFields.startTime}
                  required
                />
                <span className="my-auto">till</span>
                <Input
                  type="time"
                  onChange={(event) => setTimeValues(event, "endTime", 0)}
                  value={timeFields.endTime}
                  required
                />
              </div>
              {timeToMilliseconds(timeFields.startTime) >=
                timeToMilliseconds(timeFields.endTime) && (
                <ErrorMessage>
                  Start time should be less than the Ending time
                </ErrorMessage>
              )}
              <Input
                type="submit"
                value="Update Exam Details"
                className="btn-primary mb-2"
              />
            </form>
          </ModalBody>
        </Modal>
      )}
    </ModalOverlay>
  );
};

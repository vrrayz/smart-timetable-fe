import { addClasses } from "@/actions/classes";
import {
  ModalOverlay,
  Modal,
  ModalHeading,
  CloseButton,
  ModalBody,
} from "@/styles";
import { Classes, CurrentTerm, ScheduleInputs, TimeFieldsInput } from "@/types";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorModal } from "../modals/ErrorModal";
import { Label, ErrorMessage, Input, Select } from "../Form";
import { useCoursesHook } from "@/hooks/useCoursesHook";
import { timeToMilliseconds } from "@/helpers";

type ClassesFormInputs = {
  courseId: number;
  termId: number;
  room?: string;
  building?: string;
  lecturer?: string;
  repeat: number;
  schedule: ScheduleInputs[];
};

interface Props {
  setShowModal: (value: boolean) => void;
  classes: Classes[];
  currentTerm: CurrentTerm;
  setClasses: (value: Classes[]) => void;
}
type FormNames = "startTime" | "endTime";
export const AddClassModal = ({ setShowModal, classes, setClasses, currentTerm }: Props) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassesFormInputs>();

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [shouldRepeat, setShouldRepeat] = useState<boolean>(false);
  const { courses, setCourses } = useCoursesHook(currentTerm);
  const [timeFields, setTimeFields] = useState<TimeFieldsInput>({
    startTime: "00:00",
    endTime: "00:00",
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

  const onSubmit: SubmitHandler<ClassesFormInputs> = (data) => {
    console.log("The data passed is ", data);
    const actualSchedule = data.schedule.map(({ startDate, ...item }) => {
      return {
        ...item,
        startTime: item.startTime || 0,
        endTime: item.endTime || 0,
        startDate,
        endDate: item.endDate || startDate,
        days:
          item.days?.length > 0
            ? item.days.join(",")
            : new Date(startDate).toLocaleDateString("en-US", {
                weekday: "long",
              }),
      };
    });
    const actualFormData = {
      ...data,
      courseId: Number(data.courseId),
      termId: currentTerm?.termId,
      repeat: shouldRepeat,
      schedule: actualSchedule,
    };
    addClasses(actualFormData).then(async (res) => {
      if (res.statusCode !== 200) setShowErrorModal(true);
      else {
        setClasses([...classes, res.message]);
        setShowModal(false);
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
  return (
    <ModalOverlay onClick={(event) => closeModal(event)} id="modal-overlay">
      {showErrorModal ? (
        <ErrorModal title={"Error Creating Term"} setShowModal={setShowModal} />
      ) : (
        <Modal>
          <ModalHeading>Add New Class</ModalHeading>
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
              >
                {courses?.map((course) => (
                  <option value={course.id} key={course.id}>
                    {course.title}
                  </option>
                ))}
              </Select>
              <Label htmlFor="room">Room</Label>
              <Input
                type="text"
                {...register("room")}
                className={`${errors.room ? "mb-0" : "mb-2"}`}
              />
              <Label htmlFor="building">Building</Label>
              <Input
                type="text"
                {...register("building")}
                className={`${errors.building ? "mb-0" : "mb-2"}`}
              />
              <Label htmlFor="lecturer">Lecturer</Label>
              <Input
                type="text"
                {...register("lecturer")}
                className={`${errors.lecturer ? "mb-0" : "mb-2"}`}
              />
              <div className="mb-2">
                <Label htmlFor="repeat">Repeat</Label>
                <input
                  type="radio"
                  name="repeat_option"
                  className="ml-3"
                  onChange={() => setShouldRepeat(true)}
                  checked={shouldRepeat}
                />
                Yes
                <input
                  type="radio"
                  name="repeat_option"
                  className="ml-3"
                  onChange={() => setShouldRepeat(false)}
                  checked={!shouldRepeat}
                />
                No
              </div>
              {shouldRepeat ? (
                <>
                  <Label htmlFor="days">Days</Label>
                  <div className="flex mb-2">
                    <div className="flex">
                      <Input
                        {...register(`schedule.${0}.days`, {
                          required: "Please select at least one day",
                        })}
                        type="checkbox"
                        value={"Sunday"}
                      />
                      <span className="my-auto ml-1 mr-2">S</span>
                    </div>
                    <div className="flex mr-1">
                      <Input
                        {...register(`schedule.${0}.days`, {
                          required: "Please select at least one day",
                        })}
                        type="checkbox"
                        value={"Monday"}
                      />
                      <span className="my-auto ml-1 mr-2">M</span>
                    </div>
                    <div className="flex mr-1">
                      <Input
                        {...register(`schedule.${0}.days`, {
                          required: "Please select at least one day",
                        })}
                        type="checkbox"
                        value={"Tuesday"}
                      />
                      <span className="my-auto ml-1 mr-2">T</span>
                    </div>
                    <div className="flex mr-1">
                      <Input
                        {...register(`schedule.${0}.days`, {
                          required: "Please select at least one day",
                        })}
                        type="checkbox"
                        value={"Wednesday"}
                      />
                      <span className="my-auto ml-1 mr-2">W</span>
                    </div>
                    <div className="flex mr-1">
                      <Input
                        {...register(`schedule.${0}.days`, {
                          required: "Please select at least one day",
                        })}
                        type="checkbox"
                        value={"Thursday"}
                      />
                      <span className="my-auto ml-1 mr-2">T</span>
                    </div>
                    <div className="flex mr-1">
                      <Input
                        {...register(`schedule.${0}.days`, {
                          required: "Please select at least one day",
                        })}
                        type="checkbox"
                        value={"Friday"}
                      />
                      <span className="my-auto ml-1 mr-2">F</span>
                    </div>
                    <div className="flex mr-1">
                      <Input
                        {...register(`schedule.${0}.days`, {
                          required: "Please select at least one day",
                        })}
                        type="checkbox"
                        value={"Saturday"}
                      />
                      <span className="my-auto ml-1 mr-2">S</span>
                    </div>
                  </div>
                  <Label htmlFor="repeat">Date</Label>
                  <div className="flex place-content-around gap-2 mb-2">
                    <Input
                      type="date"
                      {...register(`schedule.${0}.startDate`, {
                        required: true,
                      })}
                      className={`${errors.schedule ? "mb-0" : "mb-2"}`}
                    />
                    <span className="my-auto">till</span>
                    <Input
                      type="date"
                      {...register(`schedule.${0}.endDate`, {
                        required: true,
                      })}
                      className={`${errors.schedule ? "mb-0" : "mb-2"}`}
                    />
                  </div>
                  {errors.schedule && (
                    <ErrorMessage>{errors.schedule.message}</ErrorMessage>
                  )}
                </>
              ) : (
                <>
                  <Label htmlFor="repeat">Date</Label>
                  <Input
                    type="date"
                    {...register(`schedule.${0}.startDate`, { required: true })}
                    className={`${errors.schedule ? "mb-0" : "mb-2"}`}
                  />
                </>
              )}
              <Label htmlFor="repeat">Time</Label>
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
                value="Add Class"
                className="btn-primary mb-2"
              />
            </form>
          </ModalBody>
        </Modal>
      )}
    </ModalOverlay>
  );
};

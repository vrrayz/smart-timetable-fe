import { editTasks } from "@/actions/tasks";
import {
  ModalOverlay,
  Modal,
  ModalHeading,
  CloseButton,
  ModalBody,
} from "@/styles";
import { ScheduleInputsWithId, Task, TimeFieldsInput } from "@/types";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorModal } from "../modals/ErrorModal";
import { Label, ErrorMessage, Input } from "../Form";
import { millisecondsToTime, timeToMilliseconds } from "@/helpers";
import { redirect } from "next/navigation";

type TasksFormInputs = {
  title: string;
  detail?: string;
  schedule: ScheduleInputsWithId[];
};

interface Props {
  setShowModal: (value: boolean) => void;
  currentSelectedTask: Task;
}
type FormNames = "startTime" | "endTime";
export const EditTaskModal = ({ setShowModal, currentSelectedTask }: Props) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TasksFormInputs>({
    defaultValues: {
      ...(currentSelectedTask as unknown as TasksFormInputs),
      schedule: [
        {
          days: currentSelectedTask.schedule[0].days.split(","),
          startDate: new Date(currentSelectedTask.schedule[0].startDate)
            .toISOString()
            .split("T")[0],
          endDate: new Date(currentSelectedTask.schedule[0].endDate)
            .toISOString()
            .split("T")[0],
          startTime: currentSelectedTask.schedule[0].startTime,
          endTime: currentSelectedTask.schedule[0].endTime,
        },
      ],
    },
  });

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [isFormActionSuccessful, setIsFormActionSuccessful] =
    useState<boolean>(false);
  const [timeFields, setTimeFields] = useState<TimeFieldsInput>({
    startTime: millisecondsToTime(currentSelectedTask.schedule[0].startTime),
    endTime: millisecondsToTime(currentSelectedTask.schedule[0].endTime),
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

  const onSubmit: SubmitHandler<TasksFormInputs> = (data) => {
    const actualSchedule = data.schedule.map(({ startDate, ...item }) => {
      return {
        ...item,
        id: currentSelectedTask.schedule[0].id,
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
      schedule: actualSchedule,
    };
    editTasks(actualFormData, currentSelectedTask.id).then(async (res) => {
      console.log("Response is ", res);
      if (res.statusCode !== 200) setShowErrorModal(true);
      else {
        setIsFormActionSuccessful(true);
      }
    });
  };

  useEffect(() => {
    if (isFormActionSuccessful) redirect("/dashboard/tasks");
  }, [isFormActionSuccessful]);

  return (
    <ModalOverlay onClick={(event) => closeModal(event)} id="modal-overlay">
      {showErrorModal ? (
        <ErrorModal title={"Error Updating Task"} setShowModal={setShowModal} />
      ) : (
        <Modal>
          <ModalHeading>Edit Task</ModalHeading>
          <CloseButton onClick={() => setShowModal(false)}>
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </CloseButton>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                {...register("title", { required: "Title is required" })}
                className={`${errors.title ? "mb-0" : "mb-2"}`}
              />
              {errors.title && (
                <ErrorMessage>{errors.title.message}</ErrorMessage>
              )}
              <Label htmlFor="detail">Detail</Label>
              <textarea
                {...register("detail", { required: "Detail is required" })}
                cols={30}
                rows={3}
                className="w-full block border border-black"
              ></textarea>
              {errors.detail && (
                <ErrorMessage>{errors.detail.message}</ErrorMessage>
              )}
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
                value="Update Task Details"
                className="btn-primary mb-2"
              />
            </form>
          </ModalBody>
        </Modal>
      )}
    </ModalOverlay>
  );
};

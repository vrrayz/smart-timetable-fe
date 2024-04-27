import { addTasks } from "@/actions/tasks";
import {
  ModalOverlay,
  Modal,
  ModalHeading,
  CloseButton,
  ModalBody,
} from "@/styles";
import { Task, ScheduleInputs, TimeFieldsInput } from "@/types";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorModal } from "../modals/ErrorModal";
import { Label, ErrorMessage, Input } from "../Form";
import { timeToMilliseconds } from "@/helpers";

type TasksFormInputs = {
  title: string;
  detail?: string;
  schedule: ScheduleInputs[];
};

interface Props {
  setShowModal: (value: boolean) => void;
  tasks: Task[];
  setTasks: (value: Task[]) => void;
}
type FormNames = "startTime" | "endTime";
export const AddTaskModal = ({ setShowModal, tasks, setTasks }: Props) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TasksFormInputs>();

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
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

  const onSubmit: SubmitHandler<TasksFormInputs> = (data) => {
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
      schedule: actualSchedule,
    };
    addTasks(actualFormData).then(async (res) => {
      console.log('Response is ',res)
      if (res.statusCode !== 200) setShowErrorModal(true);
      else {
        setTasks([...tasks, res.message]);
        setShowModal(false);
      }
    });
  };
  return (
    <ModalOverlay onClick={(event) => closeModal(event)} id="modal-overlay">
      {showErrorModal ? (
        <ErrorModal title={"Error Creating Term"} setShowModal={setShowModal} />
      ) : (
        <Modal>
          <ModalHeading>Add New Task</ModalHeading>
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
              <textarea {...register("detail", { required: 'Detail is required' })} cols={30} rows={3} className="w-full block border border-black"></textarea>
              {errors.detail && (
                <ErrorMessage>{errors.detail.message}</ErrorMessage>
              )}
              <Label htmlFor="date">Date</Label>
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
                value="Add Task"
                className="btn-primary mb-2"
              />
            </form>
          </ModalBody>
        </Modal>
      )}
    </ModalOverlay>
  );
};

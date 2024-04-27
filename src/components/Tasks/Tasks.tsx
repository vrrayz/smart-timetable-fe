"use client";

import { Button, ListItem } from "@/styles";
import React, { useCallback, useEffect, useState } from "react";
import { AddTaskModal } from "./AddTaskModal";
import { millisecondsToStandardTime } from "@/helpers";
import { NoItem } from "../NoItem";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Task } from "@/types";
import { DeleteModal } from "../modals/DeleteModal";
import { deleteTasks } from "@/actions/tasks";
import { ErrorModal } from "../modals/ErrorModal";
import { EditTaskModal } from "./EditTaskModal";
import { useTaskHook } from "./hooks/useTaskHook";

export const Tasks = () => {
  const { tasks, setTasks } = useTaskHook();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [currentSelectedTask, setCurrentSelectedTask] = useState<Task>();

  const displayEditModal = (task: Task) => {
    setCurrentSelectedTask(task);
    setShowEditModal(true);
  };
  const displayDeleteModal = (task: Task) => {
    setCurrentSelectedTask(task);
    setShowDeleteModal(true);
  };
  const performAction = useCallback(() => {
    if (currentSelectedTask) {
      deleteTasks({}, currentSelectedTask?.id).then(async (res) => {
        if (res.statusCode !== 200) setShowErrorModal(true);
        else {
          setTasks(tasks.filter((item) => item.id !== currentSelectedTask?.id));
          setShowDeleteModal(false);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, currentSelectedTask]);
  useEffect(() => {
    console.log("The tasks here === ", tasks);
  }, [tasks]);
  return (
    <>
      <div className="text-center flex place-content-around mb-4">
        <span className="text-2xl font-bold ">Tasks</span>
        <Button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add New Task
        </Button>
      </div>
      {showModal && (
        <AddTaskModal
          setShowModal={setShowModal}
          tasks={tasks}
          setTasks={setTasks}
        />
      )}
      {showEditModal && currentSelectedTask && (
        <EditTaskModal
          setShowModal={setShowEditModal}
          currentSelectedTask={currentSelectedTask}
        />
      )}
      {showDeleteModal && currentSelectedTask && (
        <DeleteModal
          setShowModal={setShowDeleteModal}
          deleteAction={performAction}
          message="Are you sure you want to delete this task"
        />
      )}
      {showErrorModal && (
        <ErrorModal title={"Error Deleting Term"} setShowModal={setShowModal} />
      )}
      {tasks.length > 0 ? (
        <>
          {tasks.map((item, i) => (
            <CustomListItem key={item.id}>
              <div>
                <h1 className="font-bold">{item.title}</h1>
                <span className="text-sm block">{item.schedule[0].days}</span>
                <span className="text-sm">
                  {millisecondsToStandardTime(item.schedule[0].startTime)} -{" "}
                  {millisecondsToStandardTime(item.schedule[0].endTime)}
                </span>
              </div>
              <div className="my-auto flex pr-4">
                <Button
                  className="btn btn-secondary text-sm my-auto mr-1"
                  onClick={() => displayEditModal(item)}
                >
                  <FontAwesomeIcon icon={faPencil} size="sm" />
                </Button>
                <Button
                  className="btn btn-danger text-sm my-auto mr-1"
                  onClick={() => displayDeleteModal(item)}
                >
                  <FontAwesomeIcon icon={faDeleteLeft} size="sm" />
                </Button>
              </div>
            </CustomListItem>
          ))}
        </>
      ) : (
        <NoItem imgName={"scheduler"} itemName={"tasks"} />
      )}
    </>
  );
};

const CustomListItem = styled(ListItem)`
  justify-content: space-between;
  padding-left: 16px;
`;

import { getTasks } from "@/actions/tasks";
import { Task } from "@/types";
import { useEffect, useState } from "react";

export const useTaskHook = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const res = getTasks().then((results) => {
      setTasks(results)
      // console.log("Results are ", results);
    });
  }, []);

  return { tasks, setTasks };
};

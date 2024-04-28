import { getTasks } from "@/actions/tasks";
import { Task } from "@/types";
import { useEffect, useState } from "react";

export const useTaskHook = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const res = getTasks().then((results) => {
      setTasks(results);
    });
  }, []);

  return { tasks, setTasks };
};

export const useTodaysTasksHook = (isFromTabs?: boolean) => {
  const { tasks } = useTaskHook();
  const [todaysTasks, setTodaysTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (isFromTabs) {
      const date = new Date().toLocaleDateString("en-US", {
        weekday: "long",
      });
      const dateMs = new Date(new Date().toISOString().split("T")[0]).getTime();
      setTodaysTasks(
        tasks
          .filter((item) => {
            const startDateMs = new Date(
              new Date(item.schedule[0].startDate).toISOString().split("T")[0]
            ).getTime();
            return startDateMs === dateMs;
          })
          .map((item) => {
            return { ...item, schedule: [{ ...item.schedule[0], days: date }] };
          })
      );
    } else setTodaysTasks(tasks);
  }, [tasks, isFromTabs]);

  return { todaysTasks, setTodaysTasks };
};

// api.js
import dayjs from "dayjs";
import { Task } from "../TaskModels/TaskModel";

const API_URL = "http://localhost:5161/api/Task";

function getStatus(status: number): "TO DO" | "IN PROGRESS" | "DONE" {
  if (status === 0) {
    return "TO DO";
  } else if (status === 1) {
    return "IN PROGRESS";
  } else {
    return "DONE";
  }
}

export const fetchTasks = (): Promise<Task[]> => {
  return fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const tasksWithDateObjects = data.map(
        (task: {
          creationDate: string | number | Date | dayjs.Dayjs | null | undefined;
          dueDate: string | number | Date | dayjs.Dayjs | null | undefined;
          status: 0 | 1 | 2;
        }) => ({
          ...task,
          creationDate: dayjs(task.creationDate),
          dueDate: dayjs(task.dueDate),
          status: getStatus(task.status),
        })
      );
      return tasksWithDateObjects;
    })
    .catch((error) => {
      console.error("Error:", error);
      return [];
    });
};

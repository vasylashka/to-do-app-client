import { Dayjs } from "dayjs";
import { Task } from "../TaskModels/TaskModel";

export var Created = true;

interface taskObject {
  title: string;
  description: string;
  dueDate: string;
  status: number;
}
function getStatus(status: "TO DO" | "IN PROGRESS" | "DONE"): number {
  if (status === "TO DO") {
    return 0;
  } else if (status === "IN PROGRESS") {
    return 1;
  } else {
    return 2;
  }
}

export function Create(task: Task) {
  const taskObj: taskObject = {
    title: task.title,
    description: task.description,
    dueDate: task.dueDate.toISOString(),
    status: getStatus(task.status),
  };

  fetch("http://localhost:5161/api/Task", {
    method: "POST",
    headers: {
      "Content-Type": "text/json",
    },
    body: JSON.stringify(taskObj),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  Created = !Created;
}

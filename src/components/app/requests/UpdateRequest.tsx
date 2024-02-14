import { Task } from "../../../models/Task/TaskModel";

interface taskObject {
  title: string;
  description: string;
  dueDate: string;
  status: number;
}
function getStatus(status: string | null): number {
  if (status === "TO DO") {
    return 0;
  } else if (status === "IN PROGRESS") {
    return 1;
  } else {
    return 2;
  }
}

export const handleUpdate = (
  updatedTask: Task,
  Id?: number,
  status?: string | null
) => {
  const taskObj: taskObject = {
    title: updatedTask.title,
    description: updatedTask.description,
    dueDate: updatedTask.dueDate.toISOString(),
    status: getStatus(updatedTask.status),
  };
  if (status) {
    taskObj.status = getStatus(status);
  }

  fetch(`http://localhost:5161/api/Task/${Id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
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
};

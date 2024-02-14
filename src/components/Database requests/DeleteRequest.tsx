import { useState } from "react";
import ListOfNotes from "../ListOfNotes/ListOfNotes";
import { fetchTasks } from "../TaskModels/TaskProvider";

export const handleDelete = (taskId: number) => {
  fetch(`http://localhost:5161/api/Task/${taskId}`, {
    method: "DELETE",
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

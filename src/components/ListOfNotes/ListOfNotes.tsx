import OneNote from "../OneNote/OneNote";
import { useEffect, useState } from "react";

import { Task } from "../TaskModels/TaskModel";
import { fetchTasks } from "../TaskModels/TaskProvider";

interface ListOfNotesProps {
  toDo: boolean;
  inProgress: boolean;
  done: boolean;
}

function ListOfNotes({ toDo, inProgress, done }: ListOfNotesProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    fetchTasks().then((data) => {
      const emptyArray: Task[] = [];
      if (toDo) {
        const first: Task[] = data.filter((task) => task.status === "TO DO");
        first.forEach((num) => {
          emptyArray.push(num);
        });
      }
      if (inProgress) {
        const first: Task[] = data.filter(
          (task) => task.status === "IN PROGRESS"
        );
        first.forEach((num) => {
          emptyArray.push(num);
        });
      }
      if (done) {
        const first: Task[] = data.filter((task) => task.status === "DONE");
        first.forEach((num) => {
          emptyArray.push(num);
        });
      }
      if (!toDo && !inProgress && !done) {
        setTasks(data);
      } else {
        setTasks(emptyArray);
      }
    });
  }, [toDo, inProgress, done]);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridGap: 20,
        alignItems: "flex-start",
      }}
    >
      {tasks.map((noteHere) => (
        <div className="task-one">
          <OneNote task={noteHere} key={noteHere.id} />{" "}
        </div>
      ))}
    </div>
  );
}
export default ListOfNotes;

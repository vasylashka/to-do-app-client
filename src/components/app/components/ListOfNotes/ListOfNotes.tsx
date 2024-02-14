import OneNote from "../OneNote/OneNote";
import { useEffect, useState } from "react";
import "./ListOfNotes.css";
import { Task } from "../../../../models/Task/TaskModel";
import { fetchTasks } from "../../../../models/Task/TaskProvider";
import performFiltration from "./performFiltration";

interface ListOfNotesProps {
  toDo: boolean;
  inProgress: boolean;
  done: boolean;
  isCreated: boolean;
}

function ListOfNotes({ toDo, inProgress, done, isCreated }: ListOfNotesProps) {
  const [editPerformed, setEditPerformed] = useState<boolean>(false);
  const [deletePerformed, setDeletePerformed] = useState<boolean>(false);

  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    fetchTasks().then((data) => {
      const filtratedArray: Task[] = performFiltration(
        data,
        toDo,
        inProgress,
        done
      );
      if (!toDo && !inProgress && !done) {
        setTasks(data);
      } else {
        setTasks(filtratedArray);
      }
    });
  }, [toDo, inProgress, done, isCreated, editPerformed, deletePerformed]);
  return (
    <div className="wrapper">
      <div className="manageAllNotes">
        {tasks.map((noteHere) => (
          <div className="task-one">
            <OneNote
              task={noteHere}
              key={noteHere.id}
              isEdited={editPerformed}
              setIsEdited={setEditPerformed}
              isDeleted={deletePerformed}
              setIsDeleted={setDeletePerformed}
            />{" "}
          </div>
        ))}
      </div>
    </div>
  );
}
export default ListOfNotes;

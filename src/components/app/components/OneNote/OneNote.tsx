import { Dayjs } from "dayjs";
import AutocompleteBox from "./AutocompleteBox/AutocompleteBox";
import BasicMenu from "./BasicMenu/BasicMenu";
import "./OneNote.css";
import { Task } from "../../../../models/Task/TaskModel";

interface OneNoteProps {
  task: Task;
  isEdited: boolean;
  setIsEdited: (tmp: boolean) => void;
  isDeleted: boolean;
  setIsDeleted: (tmp: boolean) => void;
}

function OneNote({
  task,
  isEdited,
  setIsEdited,
  isDeleted,
  setIsDeleted,
}: OneNoteProps) {
  
  const { title, description, creationDate, dueDate, status } = task;

  return (
    <div className="body-of-note">
      <div className="context">
        <div className="context-title">
          <p className="title">{title}</p>
          <div className="more">
            <BasicMenu
              currentTask={task}
              isEdited={isEdited}
              setIsEdited={setIsEdited}
              isDeleted={isDeleted}
              setIsDeleted={setIsDeleted}
            ></BasicMenu>
          </div>
        </div>
        <div className="description">
          <p className="text-description">{description}</p>
        </div>
        <div className="dates">
          <p>{"Creation date: " + creationDate.format("DD/MM/YYYY")}</p>
          <p>{"Due date: " + dueDate.format("DD/MM/YYYY")}</p>
        </div>
        <div>
          <AutocompleteBox defaults={status} task={task} />
        </div>
      </div>
    </div>
  );
}

export default OneNote;

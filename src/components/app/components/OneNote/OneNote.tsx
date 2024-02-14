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
  return (
    <div className="body-of-note">
      <div className="context">
        <div className="context-title">
          <p className="title">{task.title}</p>
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
          <p className="text-description">{task.description}</p>
        </div>
        <div className="dates">
          <p>{"Creation date: " + task.creationDate.format("DD/MM/YYYY")}</p>
          <p>{"Due date: " + task.dueDate.format("DD/MM/YYYY")}</p>
        </div>
        <div>
          <AutocompleteBox defaults={task.status} task={task} />
        </div>
      </div>
    </div>
  );
}

export default OneNote;

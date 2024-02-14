import { Dayjs } from "dayjs";
import AutocompleteBox from "./AutocompleteBox";
import BasicMenu from "./BasicMenu";
import "./OneNote.css";
import { Task } from "../TaskModels/TaskModel";

interface OneNoteProps {
  task: Task;
}

function OneNote({ task }: OneNoteProps) {
  return (
    <div className="body-of-note">
      <div className="context">
        <div className="context-title">
          <p className="title">{task.title}</p>
          <div className="more">
            <BasicMenu currentTask={task}></BasicMenu>
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

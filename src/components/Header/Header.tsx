import { Button } from "@mui/material";
import "./Header.css";
import PopUpWindow from "../PopUpWindow/PopUpWindow";
import dayjs from "dayjs";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Task } from "../TaskModels/TaskModel";

function Header() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const task: Task = {
    title: "Your title",
    description: "Your description",
    creationDate: dayjs(),
    dueDate: dayjs(),
    status: "TO DO",
  };
  return (
    <div className="container-header">
      <div className="site-name">
        <p>todo</p>
      </div>
      <div className="add-icon">
        <Button
          sx={{ "&.MuiButton-text": { color: "#3D3C42" } }}
          className="Button"
          onClick={handleOpen}
        >
          <AddIcon fontSize="large" className="icon"></AddIcon>
        </Button>
        <PopUpWindow
          currentTask={task}
          open={open}
          operationName="Create"
          handleClose={handleClose}
        ></PopUpWindow>
      </div>
    </div>
  );
}

export default Header;

import { Button } from "@mui/material";
import "./Header.css";
import PopUpWindow from "../../components/PopUpWindow/PopUpWindow";
import dayjs from "dayjs";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Task } from "../../../../models/Task/TaskModel";

interface headerProps {
  isCreated: boolean;
  setIsCreated: (tmp: boolean) => void;
}

function Header({ isCreated, setIsCreated }: headerProps) {
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
          isRequested={isCreated}
          setIsRequested={setIsCreated}
        ></PopUpWindow>
      </div>
    </div>
  );
}

export default Header;

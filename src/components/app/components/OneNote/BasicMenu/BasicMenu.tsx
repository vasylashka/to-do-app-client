import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import "./BasicMenu.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import PopUpWindow from "../../PopUpWindow/PopUpWindow";
import { Task } from "../../../../../models/Task/TaskModel";
import { handleDelete } from "../../../requests/DeleteRequest";

interface BasicMenuProps {
  currentTask: Task;
  isEdited: boolean;
  setIsEdited: (tmp: boolean) => void;
  isDeleted: boolean;
  setIsDeleted: (tmp: boolean) => void;
}

export default function BasicMenu({
  currentTask,
  isEdited,
  setIsEdited,
  isDeleted,
  setIsDeleted,
}: BasicMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenButton(!openButton);
    event.stopPropagation();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openButton, setOpenButton] = useState<boolean>(true);
  const handleOpenButton = () => {
    setOpenButton(true);
  };

  const handleCloseButton = () => {
    setOpenButton(false);
    setAnchorEl(null);
  };
  const handleDeleteButton = (id?: number) => {
    if (id) {
      handleDelete(id);
    }
    handleClose();
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          "&.MuiButton-text": { color: "#3D3C42" },
        }}
      >
        <MoreHorizIcon fontSize="large"></MoreHorizIcon>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <Button
            onClick={handleOpenButton}
            sx={{
              "&.MuiButton-text": { color: "#3D3C42" },
            }}
          >
            <div className="option">
              <EditIcon fontSize="small"></EditIcon>
              <p className="text">Edit</p>
              <PopUpWindow
                currentTask={currentTask}
                open={openButton}
                operationName="Edit"
                handleClose={handleCloseButton}
                isRequested={isEdited}
                setIsRequested={setIsEdited}
              />
            </div>
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            onClick={() => {
              handleDeleteButton(currentTask.id);
              setIsDeleted(!isDeleted);
            }}
            sx={{
              "&.MuiButton-text": { color: "#3D3C42" },
            }}
          >
            <div className="option">
              <DeleteIcon fontSize="small"></DeleteIcon>
              <p className="text">Delete</p>
            </div>
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
}

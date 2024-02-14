import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";
import "./PopUpWindow.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { Task } from "../TaskModels/TaskModel";
import { Create } from "../Database requests/PostRequest";
import { handleUpdate } from "../Database requests/UpdateRequest";

interface PopUpWindowProps {
  currentTask: Task;
  open: boolean;
  operationName: string;
  handleClose: () => void;
}

function PopUpWindow({
  currentTask,
  open,
  operationName,
  handleClose,
}: PopUpWindowProps) {
  //title field
  const [titleFieldValue, setTitleFieldValue] = useState(currentTask.title);
  const handleTitleFieldChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTitleFieldValue(event.target.value);
  };
  //description field
  const [descriptionFieldValue, setDescriptionFieldValue] = useState(
    currentTask.description
  );
  const handleDescriptionFieldChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDescriptionFieldValue(event.target.value);
  };
  //due date field
  const [dateFieldValue, setDateFieldValue] = useState<Dayjs | null>(
    currentTask.dueDate
  );
  const handleDateFieldChange = (date: Dayjs | null) => {
    setDateFieldValue(date);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    currentTask.title = titleFieldValue;
    currentTask.description = descriptionFieldValue;
    if (dateFieldValue) {
      currentTask.dueDate = dateFieldValue;
    }
    const titleValid = validateTitle();
    const descriptionValid = validateDescription();
    const dateValid = validateDate();
    if (titleValid && descriptionValid && dateValid) {
      if (operationName === "Create") {
        Create(currentTask);
      }
      if (operationName === "Edit") {
        if (currentTask.id) {
          handleUpdate(currentTask, currentTask.id);
        }
      }
      handleClose();
    }
  };

  //validation of title
  const [titleError, setTitleError] = useState(false);

  const validateTitle = () => {
    if (!titleFieldValue) {
      setTitleError(true);
      return false;
    } else {
      setTitleError(false);
      return true;
    }
  };
  //validation of description
  const [descriptionError, setDescriptionError] = useState(false);

  const validateDescription = () => {
    if (!descriptionFieldValue) {
      setDescriptionError(true);
      return false;
    } else {
      setDescriptionError(false);
      return true;
    }
  };
  // validation of due date
  const [dateError, setDateError] = useState(false);

  const validateDate = () => {
    if (dateFieldValue?.isBefore(currentTask.creationDate)) {
      setDateError(true);
      return false;
    } else {
      setDateError(false);
      return true;
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "#FAF3F0",
          },
        }}
      >
        <DialogTitle sx={{ color: "black", alignContent: "center" }}>
          {operationName + " Task"}
        </DialogTitle>
        <DialogContent>
          <TextField
            required
            id="outlined-required-error"
            label="Title"
            defaultValue={currentTask.title}
            fullWidth
            error={titleError}
            helperText={titleError ? "Title is required" : ""}
            margin="dense"
            onChange={handleTitleFieldChange}
          />
          <TextField
            required
            id="outlined-multiline-required"
            label="Description"
            multiline
            rows={4}
            defaultValue={currentTask.description}
            fullWidth
            error={descriptionError}
            helperText={descriptionError ? "Description is required" : ""}
            margin="dense"
            onChange={handleDescriptionFieldChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="date-pickers">
              <DatePicker
                readOnly
                defaultValue={currentTask.creationDate}
                label="Creation Date"
              />
              <DatePicker
                label="Due Date"
                defaultValue={currentTask.dueDate}
                onChange={handleDateFieldChange}
              />
              {dateError && (
                <Typography variant="caption" color="error">
                  Due date should be after creationDate
                </Typography>
              )}
            </div>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <div className="buttons">
            <Button
              onClick={handleClose}
              sx={{ "&.MuiButton-text": { color: "red" } }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              sx={{ "&.MuiButton-text": { color: "#3D3C42" } }}
            >
              {operationName}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PopUpWindow;

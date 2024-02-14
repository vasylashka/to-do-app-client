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
import { Task } from "../../../../models/Task/TaskModel";
import { Create } from "../../requests/PostRequest";
import { handleUpdate } from "../../requests/UpdateRequest";
import {
  validateTitle,
  validateDescription,
  validateDate,
} from "./FieldValidation";

interface PopUpWindowProps {
  currentTask: Task;
  open: boolean;
  operationName: string;
  handleClose: () => void;
  isRequested: boolean;
  setIsRequested: (tmp: boolean) => void;
}

function PopUpWindow({
  currentTask,
  open,
  operationName,
  handleClose,
  isRequested,
  setIsRequested,
}: PopUpWindowProps) {
  //handle title field changes
  const [titleFieldValue, setTitleFieldValue] = useState(currentTask.title);
  const handleTitleFieldChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTitleFieldValue(event.target.value);
  };
  //handle description field changes
  const [descriptionFieldValue, setDescriptionFieldValue] = useState(
    currentTask.description
  );
  const handleDescriptionFieldChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDescriptionFieldValue(event.target.value);
  };
  //handle due date field changes
  const [dateFieldValue, setDateFieldValue] = useState<Dayjs | null>(
    currentTask.dueDate
  );
  const handleDateFieldChange = (date: Dayjs | null) => {
    setDateFieldValue(date);
  };
  // handle create/edit operations
  const handleSubmit = (event: { preventDefault: () => void }) => {
    //validate
    const titleValid = validateTitle(titleFieldValue, setTitleError);
    const descriptionValid = validateDescription(
      descriptionFieldValue,
      setDateError
    );
    const dateValid = validateDate(
      currentTask.creationDate,
      setDateError,
      dateFieldValue
    );

    //apply changes
    event.preventDefault();
    currentTask.title = titleFieldValue;
    currentTask.description = descriptionFieldValue;
    if (dateFieldValue) {
      currentTask.dueDate = dateFieldValue;
    }

    if (titleValid && descriptionValid && dateValid) {
      if (operationName === "Create") {
        Create(currentTask);
        setIsRequested(!isRequested);
      }
      if (operationName === "Edit") {
        if (currentTask.id) {
          handleUpdate(currentTask, currentTask.id);
          setIsRequested(!isRequested);
        }
      }
      handleClose();
    }
  };

  //validation of title
  const [titleError, setTitleError] = useState(false);
  //validation of description
  const [descriptionError, setDescriptionError] = useState(false);
  // validation of due date
  const [dateError, setDateError] = useState(false);

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

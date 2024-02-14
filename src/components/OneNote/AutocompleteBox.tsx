import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./AutocompleteBox.css";
import { Task } from "../TaskModels/TaskModel";
import { handleUpdate } from "../Database requests/UpdateRequest";

// Define the options for Autocomplete
const options = ["TO DO", "IN PROGRESS", "DONE"];

function ChooseColor(color: string | null): string | null {
  switch (color) {
    case "TO DO":
      return "green";
    case "IN PROGRESS":
      return "pink";
    case "DONE":
      return "purple";
    default:
      return "green";
  }
}

interface AutocompleteBoxProps {
  defaults: string | null;
  task: Task;
}
const AutocompleteBox = ({ defaults, task }: AutocompleteBoxProps) => {
  const [value, setValue] = useState<string | null>(defaults);

  return (
    <div className="stateOfNote">
      <div className={"circle-new " + ChooseColor(value)}></div>
      <div>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            handleUpdate(task, task.id, newValue);
          }}
          sx={{
            width: 200,
            fontFamily: "Verdana",
            borderColor: "#3D3C42",
            outline: "#3D3C42",
          }}
          options={options}
          renderInput={(params) => (
            <TextField {...params} label="Status" variant="outlined" />
          )}
        />
      </div>
    </div>
  );
};

export default AutocompleteBox;

import Grid from "@mui/material/Grid";
import FilterIcon from "../FilterIcon/FilterIcon";
import OneNote from "../OneNote/OneNote";
import "./Content.css";
import { List } from "@mui/material";
import ListOfNotes from "../ListOfNotes/ListOfNotes";
import { useState } from "react";

function Content() {
  const [clickedIndexTODO, setClickedIndexTODO] = useState(false);
  const [clickedIndexIN, setClickedIndexIN] = useState(false);
  const [clickedIndexDONE, setClickedIndexDONE] = useState(false);
  return (
    <div className="flex-container">
      <div className="side-bar">
        <div className="filter">
          <FilterIcon
            colorOfButton="green"
            clickedIndex={clickedIndexTODO}
            setClickedIndex={setClickedIndexTODO}
          >
            to do
          </FilterIcon>
          <FilterIcon
            colorOfButton="pink"
            clickedIndex={clickedIndexIN}
            setClickedIndex={setClickedIndexIN}
          >
            in progress
          </FilterIcon>
          <FilterIcon
            colorOfButton="purple"
            clickedIndex={clickedIndexDONE}
            setClickedIndex={setClickedIndexDONE}
          >
            done
          </FilterIcon>
        </div>
        <img
          src="src\assets\greenMan.png"
          alt="man with completed task"
          height={270}
        ></img>
      </div>
      <div className="main">
        <ListOfNotes
          toDo={clickedIndexTODO}
          inProgress={clickedIndexIN}
          done={clickedIndexDONE}
        />
      </div>
    </div>
  );
}

export default Content;

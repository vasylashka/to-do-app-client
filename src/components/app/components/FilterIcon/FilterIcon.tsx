import { Button } from "@mui/material";
import "./FilterIcon.css";
import { useState } from "react";

interface FilterIconProps {
  colorOfButton: "green" | "pink" | "purple";
  children: string;
  clickedIndex: boolean;
  setClickedIndex: (index: boolean) => void;
}

function FilterIcon({
  colorOfButton = "green",
  children,
  clickedIndex,
  setClickedIndex,
}: FilterIconProps) {
  return (
    <div className="container-main">
      <Button
        variant={clickedIndex ? "outlined" : "text"}
        sx={{
          "&.MuiButton-text": { color: "#3D3C42" },
          "&.MuiButton-outlined": {
            color: "#3D3C42",
            borderColor: "#3D3C42",
          },
        }}
        onClick={() => setClickedIndex(!clickedIndex)}
      >
        <div className={"circle " + colorOfButton}></div>
        <p className="text">{children}</p>
      </Button>
    </div>
  );
}

export default FilterIcon;

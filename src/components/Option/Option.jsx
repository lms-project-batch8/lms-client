import React from "react";
import { Paper, Typography } from "@mui/material";

const Option = ({ option, index, onClick, isSelected }) => {
  return (
    <Paper
      elevation={isSelected ? 3 : 1}
      onClick={onClick}
      className={`flex items-center p-2 my-2 cursor-pointer transition-colors duration-300 ${
        isSelected
          ? "bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200"
          : "hover:bg-gray-100"
      }`}
    >
      <Typography variant='body1' className='mr-2 text-gray-700'>
        {index + 1}.
      </Typography>
      <Typography variant='body1' className='text-gray-900'>
        {option}
      </Typography>
    </Paper>
  );
};

export default Option;

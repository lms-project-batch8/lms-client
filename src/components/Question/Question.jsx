import React, { useState } from 'react';
import Option from '../Option/Option';
import { Paper, Typography } from '@mui/material';

const Question = ({ question, options, questionId, onOptionSelect }) => {
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const handleOptionClick = (optionId) => {
    setSelectedOptionId(optionId);
    onOptionSelect(questionId, optionId);
  };

  return (
    <Paper className="p-4 my-4 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50">
      <Typography variant="h5" className="mb-4 text-blue-800">
        {question}
      </Typography>

      {options.map((option, index) => (
        <Option
          key={option.option_id}
          option={option.option_text}
          isSelected={option.option_id === selectedOptionId}
          index={index}
          onClick={() => handleOptionClick(option.option_id)}
        />
      ))}
    </Paper>
  );
};

export default Question;

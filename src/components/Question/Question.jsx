import { useState } from "react";
import Option from "../Option/Option";
import "./Question.css";

const Question = ({ question, options, questionId, onOptionSelect }) => {
  const handleOptionClick = (optionId) => {
    onOptionSelect(questionId, optionId);
  };

  return (
    <main className='question'>
      <div className='question__title'>
        <span>{question}</span>
      </div>

      <section className='question__options'>
        {options.map((option, index) => (
          <Option
            key={option.option_id}
            option={option.option_text}
            index={index}
            onClick={() => handleOptionClick(option.option_id)} // Add click handler
          />
        ))}
      </section>
    </main>
  );
};

export default Question;

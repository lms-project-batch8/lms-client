import { useState } from "react";
import Option from "../Option/Option";
import "./Question.css";

const Question = ({ question, options, questionId, onOptionSelect }) => {
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const handleOptionClick = (optionId) => {
    setSelectedOptionId(optionId);
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
            isSelected={option.option_id === selectedOptionId}
            index={index}
            onClick={() => handleOptionClick(option.option_id)}
          />
        ))}
      </section>
    </main>
  );
};

export default Question;

import Option from "../Option/Option";
import "./Question.css";

const Question = ({ question, options }) => {
  // Component names must be capitalized
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
          /> // Pass option_text and use option_id for key
        ))}
      </section>
    </main>
  );
};

export default Question;

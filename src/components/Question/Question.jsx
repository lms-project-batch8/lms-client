import Option from "../Option/Option";
import "./Question.css";

const question = ({ question, options }) => {
  return (
    <main className='question'>
      <div className='question__title'>
        <span>{question.question_id}.</span>
        <span>{question.question_text}</span>
      </div>

      {/* <section className='question__options'>
        {options.map((option, index) => (
          <Option option={option} index={index} />
        ))}
      </section> */}
    </main>
  );
};

export default question;

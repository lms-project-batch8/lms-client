import Option from "../Option/Option";
import "./Question.css";

const question = ({ question }) => {
    return (
        <main className="question">
            <div className="question__title">
                <span>{question.id}.</span>
                <span>{question.question}</span>
            </div>

            <section className="question__options">
                {question.options.map((option, index) => (
                    <Option option={option} index={index} />
                ))}
            </section>
        </main>
    );
};

export default question;

import "./Option.css";

const option = ({ option, index }) => {
    return (
        <main className="option hover:bg-[#D4E7C5]">
            <div className="option_number">
                <span>{index + 1}.</span>
            </div>

            <div className="option__text">
                <span>{option}</span>
            </div>
        </main>
    );
};

export default option;

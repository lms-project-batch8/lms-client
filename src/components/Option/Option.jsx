import "./Option.css";

const Option = ({ option, index, onClick, isSelected }) => {
  return (
    <main
      className={`option ${isSelected ? "option--selected" : ""} hover:bg-[#D4E7C5]`}
      onClick={onClick}
    >
      <div className='option_number'>
        <span>{index + 1}.</span>
      </div>

      <div className='option__text'>
        <span>{option}</span>
      </div>
    </main>
  );
};

export default Option;

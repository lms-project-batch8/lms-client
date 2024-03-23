import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import axios from "axios";

const QuizForm = () => {
  const [quizName, setQuizName] = useState("");
  const [quizDuration, setQuizDuration] = useState("");
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: [{ id: 1, text: "" }],
      correctAnswer: null,
      marks: 0,
    },
  ]);

  const handleQuizNameChange = (event) => {
    setQuizName(event.target.value);
  };

  const handleQuizDurationChange = (event) => {
    setQuizDuration(event.target.value);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex].text = event.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, optionText) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctAnswer = optionText;
    setQuestions(newQuestions);
  };

  const handleMarksChange = (qIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].marks = event.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: [], correctAnswer: "", marks: "" },
    ]);
  };

  const addOption = (qIndex) => {
    const newQuestions = [...questions];
    const newOptionId =
      newQuestions[qIndex].options.reduce(
        (maxId, option) => Math.max(option.id, maxId),
        0,
      ) + 1;
    newQuestions[qIndex].options.push({ id: newOptionId, text: "" });
    setQuestions(newQuestions);
  };

  const deleteQuestion = (qIndex) => {
    setQuestions(questions.filter((_, index) => index !== qIndex));
  };

  const submitQuiz = async () => {
    console.log(JSON.stringify({ quizName, quizDuration, questions }));
    await axios.post("http://localhost:20190/quiz", {
      quizName,
      quizDuration,
      questions,
    });
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
      <div className='w-full max-w-2xl p-5 bg-white shadow-md rounded-lg'>
        <h2 className='text-center text-2xl font-bold mb-4'>Create Quiz</h2>
        <div className='flex gap-4 mb-4'>
          <input
            type='text'
            placeholder='Quiz Name'
            value={quizName}
            onChange={handleQuizNameChange}
            className='input input-bordered flex-1 p-2 bg-slate-200'
          />
          <input
            type='text'
            placeholder='Duration (minutes)'
            value={quizDuration}
            onChange={handleQuizDurationChange}
            className='input input-bordered flex-3 p-2 bg-slate-200'
          />
        </div>
        {questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className='mb-4 bg-slate-300 p-2 rounded-lg relative'
          >
            <input
              type='text'
              placeholder={`Question ${qIndex + 1}`}
              value={q.questionText}
              onChange={(e) => handleQuestionChange(qIndex, e)}
              className='input input-bordered w-full mb-2 p-2 bg-slate-100'
            />
            <input
              type='number'
              placeholder={`Marks for Question ${qIndex + 1}`}
              value={parseInt(q.marks)}
              onChange={(e) => handleMarksChange(qIndex, e)}
              className='input input-bordered w-full mb-2 p-2 bg-slate-100'
            />
            {q.options.map((option, oIndex) => (
              <input
                key={oIndex}
                type='text'
                placeholder={`Option ${oIndex + 1}`}
                value={option.text}
                onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                className='input input-bordered w-full mb-1 p-1 bg-slate-100'
              />
            ))}

            <div className='flex flex-col justify-center gap-1 bg-slate-100 p-2 rounded-md'>
              <select
                value={q.correctAnswer || ""}
                onChange={(e) =>
                  handleCorrectAnswerChange(qIndex, e.target.value)
                }
                className='input input-bordered bg-slate-50 w-full mb-2 p-1'
              >
                <option value=''>Select Correct Answer</option>
                {q.options.map((option, index) => (
                  <option key={index} value={option.text}>
                    {`Option ${index + 1}: ${option.text}`}
                  </option>
                ))}
              </select>
            </div>
            <IconButton
              onClick={() => addOption(qIndex)}
              color='primary'
              component='span'
            >
              <AddCircleOutlineIcon />
              <span className='text-sm p-1'>Add Option</span>
            </IconButton>
            <IconButton
              onClick={() => deleteQuestion(qIndex)}
              color='error'
              component='span'
              className='absolute top-0 right-0 m-2'
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        <div className='flex justify-between'>
          <IconButton onClick={addQuestion} color='secondary'>
            <AddCircleOutlineIcon />
            <span className='text-sm p-1'>Add Question</span>
          </IconButton>
          <IconButton onClick={submitQuiz} color='success'>
            <SendIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default QuizForm;

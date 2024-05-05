import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { read, utils } from "xlsx";
import Navbar from "./Navbar/Navbar";
import axios from "axios";
import { backend } from "../url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const QuizForm = () => {
  const [quizName, setQuizName] = useState("");
  const [quizDuration, setQuizDuration] = useState("");
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json(sheet, { header: 1 });
        parseExcelData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const parseExcelData = (data) => {
    setQuizName(data[1][0]);
    setQuizDuration(data[1][1]);
    const newQuestions = data
      .slice(3)
      .filter((row) => row.length > 4 && row[0])
      .map((row, index) => ({
        questionText: row[0],
        options: row
          .slice(1, -2)
          .map((option, idx) => ({ id: idx + 1, text: option })),
        correctAnswer: row[row.length - 2],
        marks: parseInt(row[row.length - 1]),
      }));
    setQuestions(newQuestions);
  };

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

  const handleCorrectAnswerChange = (qIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctAnswer = event.target.value;
    setQuestions(newQuestions);
  };

  const handleMarksChange = (qIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].marks = parseInt(event.target.value);
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        options: [{ id: 1, text: "" }],
        correctAnswer: "",
        marks: "",
      },
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
    try {
      await axios.post(`${backend}/quiz`, {
        quizName,
        quizDuration,
        questions,
      });
      toast.success("Quiz Creation Successfull");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("Quiz Creation Failed");
    }
  };

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar />
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
        <div className='w-full max-w-2xl p-5 bg-white shadow-md rounded-lg'>
          <h2 className='text-center text-2xl font-bold mb-4'>Create Quiz</h2>
          <div className='mb-4 flex flex-row justify-between'>
            <input
              id='file-upload'
              type='file'
              accept='.xlsx, .xls'
              onChange={handleFile}
              className='hidden'
            />
            <label
              htmlFor='file-upload'
              className='cursor-pointer bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded inline-flex items-center'
            >
              <svg
                className='w-4 h-4 mr-2'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M16.7,5.3L10.4,11.6l-3.3-3.3C7,8.2,6.9,8.1,6.7,8.1H6.6c-0.4,0-0.8,0.3-0.8,0.8c0,0.2,0.1,0.4,0.3,0.5l4.3,4.3   c0.2,0.2,0.4,0.3,0.6,0.3s0.4-0.1,0.6-0.3l7-7c0.2-0.2,0.3-0.4,0.3-0.6s-0.1-0.4-0.3-0.6C17.5,4.9,17.1,4.9,16.7,5.3z' />
              </svg>
              <span>Upload Excel File</span>
            </label>
            <a
              href={`${process.env.PUBLIC_URL}/LMS Quiz Creation Template.xlsx`}
              download
              className='btn btn-primary mb-4 bg-purple-500 px-4 py-2 rounded text-white font-bold'
            >
              Download Quiz Template
            </a>
          </div>

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
              <IconButton
                onClick={() => addOption(qIndex)}
                color='primary'
                component='span'
              >
                <AddCircleOutlineIcon />
                <span className='text-sm p-1'>Add Option</span>
              </IconButton>
              <select
                value={q.correctAnswer || ""}
                onChange={(e) => handleCorrectAnswerChange(qIndex, e)}
                className='input input-bordered bg-slate-50 w-full mb-2 p-1'
              >
                <option value=''>Select Correct Answer</option>
                {q.options.map((option, index) => (
                  <option key={index} value={option.text}>
                    {`Option ${index + 1}: ${option.text}`}
                  </option>
                ))}
              </select>
              <input
                type='number'
                placeholder='Marks'
                value={q.marks}
                onChange={(e) => handleMarksChange(qIndex, e)}
                className='input input-bordered w-full mb-2 p-2 bg-slate-100'
              />
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
            <Button variant='contained' onClick={submitQuiz} color='success'>
              Submit Quiz
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizForm;
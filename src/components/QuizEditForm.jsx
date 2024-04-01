import React, { useEffect, useRef, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import axios from "axios";
import Navbar from "./Navbar/Navbar";

const QuizEditForm = ({ quiz }) => {
  const [quizName, setQuizName] = useState("");
  const [quizDuration, setQuizDuration] = useState("");
  const [questions, setQuestions] = useState([]);

  const [optionText, setOptionText] = useState("");

  const debounceTimer = useRef();

  useEffect(() => {
    if (quiz) {
      setQuizName(quiz.title || "");
      setQuizDuration(quiz.duration_minutes || "");

      const formattedQuestions =
        quiz.questions?.map((q) => ({
          question_id: q.question_id,
          questionText: q.question_text,
          options:
            q.options?.map((o) => ({
              id: o.option_id,
              text: o.option_text,
            })) || [],
          correctAnswer: q.correct_ans,
          marks: q.question_marks,
        })) || [];

      setQuestions(formattedQuestions);
    }
  }, [quiz]);

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
    setOptionText(event.target.value);
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

  const addOption = async (q, qIndex) => {
    const newQuestions = [...questions];

    const lastOptionIndex = newQuestions[qIndex].options.length - 1;
    const lastOptionText =
      lastOptionIndex >= 0
        ? newQuestions[qIndex].options[lastOptionIndex].text
        : "";

    const newOptionId =
      newQuestions[qIndex].options.reduce(
        (maxId, option) => Math.max(option.id, maxId),
        0,
      ) + 1;
    newQuestions[qIndex].options.push({ id: newOptionId, text: "" });
    setQuestions(newQuestions);

    // Use debounce to delay the API call
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        await axios.post("http://localhost:20190/option", {
          question_id: q.question_id,
          optionText: lastOptionText,
        });
      } catch (error) {
        console.log(error);
      }
    }, 5000);
  };

  const deleteOption = async (option, qIndex, oIndex) => {
    try {
      await axios.delete(`http://localhost:20190/option/${option.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      const newQuestions = [...questions];
      newQuestions[qIndex].options.splice(oIndex, 1);
      setQuestions(newQuestions);
    }
  };

  const deleteQuestion = async (ques, qIndex) => {
    console.log(ques);

    try {
      await axios.delete(`http://localhost:20190/question/${ques.question_id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setQuestions(questions.filter((_, index) => index !== qIndex));
    }
  };

  const submitQuiz = async () => {
    console.log(JSON.stringify({ quizName, quizDuration, questions }));

    await axios.put(`http://localhost:20190/quiz/${quiz.quiz_id}`, {
      quizName,
      quizDuration,
      questions,
    });
  };

  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
        <div className='w-full max-w-2xl p-5 bg-white shadow-md rounded-lg'>
          <h2 className='text-center text-2xl font-bold mb-4'>Edit Quiz</h2>
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
          {questions?.map((q, qIndex) => (
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
                <div key={oIndex} className='flex items-center'>
                  <input
                    type='text'
                    placeholder={`Option ${oIndex + 1}`}
                    value={option.text}
                    onChange={(e) => {
                      handleOptionChange(qIndex, oIndex, e);
                    }}
                    className='input input-bordered w-full mb-1 p-1 bg-slate-100'
                  />
                  <IconButton
                    onClick={() => deleteOption(option, qIndex, oIndex)}
                    color='error'
                    component='span'
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
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
                  {q.options?.map((option, index) => (
                    <option key={index} value={option.text}>
                      {`Option ${index + 1}: ${option.text}`}
                    </option>
                  ))}
                </select>
              </div>
              <IconButton
                onClick={() => addOption(q, qIndex)}
                color='primary'
                component='span'
              >
                <AddCircleOutlineIcon />
                <span className='text-sm p-1'>Add Option</span>
              </IconButton>
              <IconButton
                onClick={() => deleteQuestion(q, qIndex)}
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
    </>
  );
};

export default QuizEditForm;

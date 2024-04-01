import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Question from "../../components/Question/Question";
import Timer from "../Timer/Timer";
import { Button, Container, Typography, Box } from "@mui/material";
import QuizResultsDialog from "../../pages/QuizResultsDialog";
import { useSelector } from "react-redux";

const Quiz = () => {
  const [quiz, setQuiz] = useState({});
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [userAnswers, setUserAnswers] = useState({});
  const [marksObtained, setMarksObtained] = useState(0);
  const [marks, setMarks] = useState(0);
  const [open, setOpen] = React.useState(false);

  const handleAnswerChange = (questionId, selectedOptionId) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOptionId,
    }));
  };

  const checkAnswersAndCalculateMarks = (quiz, userAnswers) => {
    let totalMarks = 0;
    let totalPossibleMarks = 0;

    quiz.questions.forEach((ques) => {
      const userSelectedOption = userAnswers[ques.question_id]
        ? ques.options.find(
            (option) =>
              option.option_id === parseInt(userAnswers[ques.question_id]),
          )
        : null;

      let quesMarks = ques.question_marks;
      totalPossibleMarks += quesMarks;

      if (
        userSelectedOption &&
        userSelectedOption.option_text === ques.correct_ans
      ) {
        totalMarks += quesMarks;
      }
    });

    setMarksObtained(totalMarks);
    setMarks(totalPossibleMarks);
  };

  useEffect(() => {
    const getQuiz = async () => {
      const res = await axios.get(
        `https://lms-server-tktv.onrender.com/quiz/${id}`,
      );
      console.log("Quiz Data:", res.data);
      setQuiz(res.data);
    };

    getQuiz();
  }, [id]);

  useEffect(() => {
    if (open) {
      handleMarksSubmit(marksObtained);
    }
  }, [marksObtained, open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleMarksSubmit = async (marksObtained) => {
    await axios.post(`https://lms-server-tktv.onrender.com/marks`, {
      quiz_id: quiz.quiz_id,
      user_id: user.user_id,
      marks: marksObtained,
    });
  };

  return (
    <Container sx={{ padding: "30px" }}>
      <Typography variant='h4' className='text-center my-6 text-purple-800'>
        {quiz.title || "Quiz"}
      </Typography>

      <Timer seconds={parseInt(quiz.duration_minutes || 0) * 60} />

      <div>
        {quiz.questions?.map((question) => (
          <Question
            key={question.question_id}
            question={question.question_text}
            options={question.options}
            questionId={question.question_id}
            onOptionSelect={handleAnswerChange}
          />
        ))}
      </div>

      <Button
        variant='contained'
        color='primary'
        className='mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
        onClick={() => {
          checkAnswersAndCalculateMarks(quiz, userAnswers);
          handleClickOpen();
        }}
      >
        Submit
      </Button>

      <QuizResultsDialog open={open} marksObtained={marksObtained} />
    </Container>
  );
};

export default Quiz;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Container, Typography, LinearProgress } from "@mui/material";
import Question from "../../components/Question/Question";
import Timer from "../Timer/Timer";
import QuizResultsDialog from "../../pages/QuizResultsDialog";
import { useSelector } from "react-redux";
import { backend } from "../../url";

const Quiz = () => {
  const [quiz, setQuiz] = useState({});
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [userAnswers, setUserAnswers] = useState({});
  const [marksObtained, setMarksObtained] = useState(0);
  const [marks, setMarks] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAnswerChange = (questionId, selectedOptionId) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOptionId,
    }));
  };

  const checkAnswersAndCalculateMarks = (quiz, userAnswers) => {
    let totalMarks = 0;
    let totalPossibleMarks = 0;

    quiz.questions?.forEach((ques) => {
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

    console.log("Total Marks:", totalMarks);
    console.log("Total Possible Marks:", totalPossibleMarks);
    setMarksObtained(totalMarks);
    setMarks(totalPossibleMarks);
  };

  useEffect(() => {
    // Check session storage for existing state
    const storedQuiz = sessionStorage.getItem("quiz");
    const storedUserAnswers = sessionStorage.getItem("userAnswers");
    const storedMarksObtained = sessionStorage.getItem("marksObtained");

    if (storedQuiz) setQuiz(JSON.parse(storedQuiz));
    if (storedUserAnswers) setUserAnswers(JSON.parse(storedUserAnswers));
    if (storedMarksObtained) setMarksObtained(parseInt(storedMarksObtained));

    // Prevent default unload and prompt the user to stay
    const handleUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  useEffect(() => {
    // Save state to session storage on changes
    sessionStorage.setItem("quiz", JSON.stringify(quiz));
    sessionStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    sessionStorage.setItem("marksObtained", marksObtained.toString());
  }, [quiz, userAnswers, marksObtained]);

  useEffect(() => {
    const getQuiz = async () => {
      setLoading(true);
      const res = await axios.get(`${backend}/quiz/${id}`);
      setQuiz(res.data);
      setLoading(false);
    };

    if (!quiz || Object.keys(quiz).length === 0) {
      getQuiz();
    }
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
    await axios.post(`${backend}/marks`, {
      quiz_id: quiz.quiz_id,
      user_id: user.user_id,
      marks: marksObtained,
    });
  };

  const handleSubmit = () => {
    checkAnswersAndCalculateMarks(quiz, userAnswers);
    handleClickOpen();
  };

  return (
    <Container sx={{ padding: "30px" }}>
      {loading ? <LinearProgress /> : null}
      <Typography variant='h4' className='text-center my-6 text-purple-800'>
        {quiz.title || "Quiz"}
      </Typography>

      {!loading && (
        <>
          <Timer
            seconds={parseInt(quiz.duration_minutes || 0) * 60}
            onTimeExpired={handleSubmit}
          />

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
            onClick={handleSubmit}
          >
            Submit
          </Button>

          <QuizResultsDialog
            open={open}
            marks={marks}
            marksObtained={marksObtained}
          />
        </>
      )}
    </Container>
  );
};

export default Quiz;

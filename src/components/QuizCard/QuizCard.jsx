import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import QuizImage from "../../assets/quiz.jpg"; // Ensure the correct spelling of your import
import axios from "axios";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector } from "react-redux";

const QuizCard = ({ quizId, handleQuizResults }) => {
  const { user } = useSelector((state) => state.auth);

  const isTrainer = user.user_role === "trainer";

  const [quiz, setQuiz] = useState({});

  useEffect(() => {
    const getQuiz = async () => {
      const res = await axios.get(
        `https://lms-server-tktv.onrender.com/quiz/${quizId}`,
      );
      console.log(res.data);
      setQuiz(res.data);
    };

    getQuiz();
  }, []);
  return (
    <div className='relative flex justify-center items-center bg-gray-100 m-4'>
      <Card className='w-full max-w-sm'>
        <Link to={`/quiz/${quizId}`} state={{ quizId }} className='block'>
          <CardMedia
            component='img'
            alt='quiz image'
            height='140'
            image={QuizImage}
            className='w-full object-cover'
          />
          <CardContent className='bg-gray-100'>
            <Typography gutterBottom variant='h5' component='div'>
              {quiz.title}
            </Typography>
          </CardContent>
        </Link>
        <div className='absolute top-0 right-0 m-2'>
          <Link to={`/quiz/${quiz.quiz_id}/edit`}>
            <Button variant='contained' color='secondary'>
              Edit
            </Button>
          </Link>
        </div>
        <CardActions className='flex flex-row justify-end p-2 bg-gray-100'>
          {isTrainer && (
            <Button
              size='small'
              className='text-xs text-blue-600 hover:text-blue-800'
            >
              Assign
            </Button>
          )}
          {isTrainer && (
            <Button
              size='small'
              className='text-xs text-blue-600 hover:text-blue-800'
              onClick={() => {
                handleQuizResults(quizId);
              }}
            >
              Scores
            </Button>
          )}
          <Button
            size='small'
            className='text-xs text-blue-600 hover:text-blue-800'
            onClick={() => {
              navigator.clipboard.writeText(
                `http://localhost:3000/quiz/${quizId}`,
              );
            }}
          >
            <ShareIcon />
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default QuizCard;

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

const QuizCard = ({ quizId }) => {
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
    <main className='cursor-pointer p-4'>
      <Card
        sx={{ maxWidth: 250 }}
        className='bg-white overflow-hidden shadow-lg rounded-lg'
      >
        <Link to={`/quiz/${quizId}`} state={{ quizId }} className='block'>
          <CardMedia
            component='img'
            alt='quiz image'
            height='140'
            image={QuizImage}
            className='w-full object-cover'
          />
          <CardContent className='bg-gray-100'>
            <Typography
              gutterBottom
              variant='h5'
              component='div'
              className='text-lg font-semibold'
            >
              {quiz.title}
            </Typography>
          </CardContent>
        </Link>
        <CardActions className='flex flex-row justify-end p-2 bg-gray-100'>
          {" "}
          {/* Background color applied here */}
          <Button
            size='small'
            className='text-xs text-blue-600 hover:text-blue-800'
            onClick={() => {
              navigator.clipboard.writeText(
                `http://localhost:3000/quiz/${quizId}`,
              );
            }}
          >
            Share
          </Button>
        </CardActions>
      </Card>
    </main>
  );
};

export default QuizCard;

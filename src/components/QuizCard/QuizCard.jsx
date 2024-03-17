import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import QuizImage from "../../assets/quiz_image.jpg"; // Ensure the correct spelling of your import

const QuizCard = ({ quizId }) => {
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
            height='140' // Adjusted for better proportion
            image={QuizImage}
            className='w-full object-cover' // Tailwind classes for full width and cover object fit
          />
          <CardContent className='bg-gray-100'>
            {" "}
            {/* Background color applied here */}
            <Typography
              gutterBottom
              variant='h5'
              component='div'
              className='text-lg font-semibold'
            >
              Lizard
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              className='text-gray-600'
            >
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
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

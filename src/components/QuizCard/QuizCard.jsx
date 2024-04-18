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
import Select from "react-select";

const QuizCard = ({ quizId, handleQuizResults }) => {
  const { user } = useSelector((state) => state.auth);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [optionList, setOptionList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState();

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

    const getTrainees = async () => {
      const res = await axios.get("http://localhost:20190/users/trainees");

      const newOptionList = res.data.map((user) => ({
        value: user.user_id.toString(),
        label: user.user_name,
      }));

      setOptionList(newOptionList);
    };

    getTrainees();
    getQuiz();
  }, []);

  const openTrainerDropdown = (user_id) => {
    setIsFormOpen(true);
  };

  const closeFormOverlay = () => {
    setIsFormOpen(false);
  };

  const handleAssign = async () => {
    await axios.post("http://localhost:20190/assign", {
      trainer_id: user.user_id,
      data: selectedOptions,
      quiz_id: quizId,
      course_id: null,
    });
  };

  const submitForm = () => {
    console.log(selectedOptions);
    console.log({ trainee_id: user.user_id, data: selectedOptions });
    handleAssign();
    setSelectedOptions();
    closeFormOverlay();
  };

  function handleSelect(data) {
    setSelectedOptions(data);
  }

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
        {isTrainer && (
          <div className='absolute top-0 right-0 m-2'>
            <Link to={`/quiz/${quiz.quiz_id}/edit`}>
              <Button variant='contained' color='secondary'>
                Edit
              </Button>
            </Link>
          </div>
        )}
        <CardActions className='flex flex-row justify-end p-2 bg-gray-100'>
          {isTrainer && (
            <Button
              size='small'
              className='text-xs text-blue-600 hover:text-blue-800'
              onClick={openTrainerDropdown}
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
      {isFormOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            backgroundColor: "purple",
            padding: "20px",
            borderRadius: "8px",
            minWidth: "500px",
          }}
        >
          <Select
            options={optionList}
            placeholder='Select Trainees'
            value={selectedOptions}
            onChange={handleSelect}
            isSearchable={true}
            isMulti
            className='mb-4'
          />
          <div className='flex justify-between'>
            <button
              onClick={closeFormOverlay}
              className='border py-1 px-2 rounded text-white font-bold'
            >
              Close
            </button>
            <button
              onClick={submitForm}
              className='border py-1 px-2 rounded text-white font-bold'
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizCard;

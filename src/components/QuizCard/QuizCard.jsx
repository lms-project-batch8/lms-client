import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import QuizImage from "../../assets/quiz.webp";
import axios from "axios";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector } from "react-redux";
import Select from "react-select";
import { backend, frontend } from "../../url";
import DeleteIcon from "@mui/icons-material/Delete";

const QuizCard = ({ quizId, handleQuizResults, handleDeleteQuiz, quiz }) => {
  const { user } = useSelector((state) => state.auth);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [optionList, setOptionList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState();

  const isTrainer = user.user_role === "trainer";

  useEffect(() => {
    const getTrainees = async () => {
      const res = await axios.get(`${backend}/users?user_role=trainee`);
      const newOptionList = res.data.map((user) => ({
        value: user.user_id.toString(),
        label: user.user_name,
      }));
      setOptionList(newOptionList);
    };

    getTrainees();
  }, []);

  const openTrainerDropdown = () => {
    setIsFormOpen(true);
  };

  const closeFormOverlay = () => {
    setIsFormOpen(false);
  };

  const handleAssign = async () => {
    await axios.post(`${backend}/assign/quiz`, {
      trainer_id: user.user_id,
      trainee_ids: selectedOptions,
      quiz_id: quizId,
    });
  };

  const submitForm = () => {
    handleAssign();
    setSelectedOptions([]);
    closeFormOverlay();
  };

  function handleSelect(data) {
    setSelectedOptions(data);
  }

  return (
    <div className='relative flex justify-center items-center bg-gray-100 m-4 shadow-lg rounded-lg'>
      <Card className='w-full max-w-sm rounded-lg overflow-hidden'>
        <Link to={`/quiz/${quizId}`} className='block'>
          <CardMedia
            component='img'
            alt='quiz image'
            image={QuizImage}
            className='h-48 w-full object-contain'
          />
          <CardContent className='bg-white'>
            <Typography gutterBottom variant='h5' component='div'>
              {quiz.title}
            </Typography>
          </CardContent>
        </Link>
        {isTrainer && (
          <div className='flex absolute gap-2 top-0 right-0 m-2'>
            <Button
              variant='contained'
              onClick={() => handleDeleteQuiz(quizId)}
              className='w-10 h-10 p-0'
            >
              <DeleteIcon />
            </Button>
          </div>
        )}
        <CardActions className='flex flex-row justify-end p-2 bg-white'>
          {isTrainer && (
            <Button
              size='large'
              className='text-xs text-blue-600 hover:text-blue-800'
              onClick={openTrainerDropdown}
            >
              Assign
            </Button>
          )}
          {isTrainer && (
            <Button
              size='large'
              className='text-lg text-blue-600 hover:text-blue-800'
              onClick={() => {
                handleQuizResults(quizId);
              }}
            >
              Scores
            </Button>
          )}
          <Button
            size='large'
            className='text-xs text-blue-600 hover:text-blue-800'
            onClick={() => {
              navigator.clipboard.writeText(`${frontend}/quiz/${quizId}`);
            }}
          >
            <ShareIcon />
          </Button>
        </CardActions>
      </Card>
      {isFormOpen && (
        <div className='fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-6 w-[600px] rounded-lg shadow-xl z-50'>
            <Select
              options={optionList}
              placeholder='Select Trainees'
              value={selectedOptions}
              onChange={handleSelect}
              isSearchable={true}
              isMulti
              className='mb-4 z-50'
            />
            <div className='flex justify-between'>
              <button
                onClick={closeFormOverlay}
                className='border py-1 px-2 rounded text-white bg-blue-500 hover:bg-blue-700 font-bold'
              >
                Close
              </button>
              <button
                onClick={submitForm}
                className='border py-1 px-2 rounded text-white bg-blue-500 hover:bg-blue-700 font-bold'
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizCard;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import QuizImage from "../../assets/quiz_imagr.jpg";

const QuizCard = ({ quizId }) => {
    return (
        <main className="cursor-pointer p-4">
            <Card sx={{ maxWidth: 250 }}>
                <Link to={`/quiz/${quizId}`} state={{ quizId }}>
                    <CardMedia
                        component="img"
                        alt="quiz image"
                        height="100"
                        image={QuizImage}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles,
                            with over 6,000 species, ranging across all
                            continents except Antarctica
                        </Typography>
                    </CardContent>
                </Link>
                <CardActions className="flex flex-row justify-end">
                    <Button
                        size="small"
                        onClick={() => {
                            navigator.clipboard.writeText(
                                `http://localhost:3000/quiz/${quizId}`
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

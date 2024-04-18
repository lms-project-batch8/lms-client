import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Grid,
  Autocomplete,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Divider,
} from "@mui/material";
import axios from "axios";

function TraineeDetails() {
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [trainees, setTrainees] = useState([]);
  const [selectedTrainee, setSelectedTrainee] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:20190/users/trainees`);
      setTrainees(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTrainee) {
      const fetchDetails = async () => {
        const coursesResponse = await axios.get(
          `http://localhost:20190/courseProgress?user_id=${selectedTrainee.user_id}`,
        );
        setCourses(coursesResponse.data);

        const quizzesResponse = await axios.get(
          `http://localhost:20190/marks?user_id=${selectedTrainee.user_id}`,
        );
        setQuizzes(quizzesResponse.data);
      };

      fetchDetails();
    }
  }, [selectedTrainee]);

  return (
    <div className='p-4'>
      <Grid container spacing={3} justifyContent='center' width={"1024px"}>
        <Grid item xs={12} md={6} padding={"20px"}>
          <Autocomplete
            options={trainees}
            getOptionLabel={(option) => option.user_name || ""}
            value={selectedTrainee}
            onChange={(event, newValue) => {
              setSelectedTrainee(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Select Trainee'
                variant='outlined'
                fullWidth
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className='mt-4'>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Courses Progress
              </Typography>
              <List dense>
                {courses.map((course, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={course.course_title}
                        secondary={
                          <LinearProgress
                            variant='determinate'
                            value={course.course_complition_percentage}
                          />
                        }
                      />
                      <Typography variant='caption'>
                        {course.course_complition_percentage}%
                      </Typography>
                    </ListItem>
                    {index < courses.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Quizzes Results
              </Typography>
              <List dense>
                {quizzes.map((quiz, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={quiz.title}
                        secondary={
                          <Typography variant='overline' color='Highlight'>
                            Mark: {quiz.marks}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {index < quizzes.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default TraineeDetails;

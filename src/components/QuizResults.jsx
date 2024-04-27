import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { backend } from "../url";

const QuizResults = ({ quizId }) => {
  const [scores, setScores] = useState([]);

  const getScores = async () => {
    const res = await axios.get(
      `${backend}/marks/${quizId}`,
    );

    setScores(res.data);
  };

  useEffect(() => {
    getScores();
  }, []);

  return (
    <TableContainer component={Paper} className='mt-2'>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", fontSize: "18px" }}>
              Trainee
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "18px" }}
              align='center'
            >
              Marks
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scores.map((score) => (
            <TableRow
              key={score.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {score.user_name}
              </TableCell>
              <TableCell align='center'>{score.marks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuizResults;
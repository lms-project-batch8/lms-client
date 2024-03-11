import React, { useEffect, useState } from 'react';
import Question from "../../components/Question/Question";
import "./Quiz.css";
import Timer from '../Timer/Timer';
import { quizQuestions } from '../../data/quizes';

const Quiz = () => {

  return (
    <main className='quiz'>
        <section className="quiz__header">
            <div className='quiz__header_title'>
                <span>JavaScript Quiz</span>
            </div>
            <div className='quiz__timer'>
                <Timer seconds={6*60}/>
            </div>
        </section>
        <section className='quiz__questions'>
            {quizQuestions.map(question => <Question question={question} />)}
        </section>

        <section className='quiz__submit hover:bg-[#D4E7C5]'>
            <span>Submit</span>
        </section>
        
    </main>
  )
}

export default Quiz
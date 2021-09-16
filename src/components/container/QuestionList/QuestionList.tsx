import React, {useMemo,useEffect, useContext, useRef} from 'react';

import styles from './QuestionList.module.scss';
import { QuestionType, ProfileQuestion } from 'types/types';
import Question from 'components/view/Question/Question';
import SettingsContext from 'context/settingsContext';

import {ReactComponent as Semicircle} from 'assets/shapes/Semicircle.svg';
import {ReactComponent as Circle} from 'assets/shapes/Circle.svg';

const questionTransitionAudio = require('assets/audios/transicaoPerguntas.mp3');

type QuestionListProps = {
  questions: QuestionType[] | ProfileQuestion[];
  currentQuestion: number;
}

const QuestionList: React.FC<QuestionListProps> = ({questions, currentQuestion }) => {

  const { libras } = useContext(SettingsContext);

  const transitionAudioRef = useRef<HTMLAudioElement>(new Audio(questionTransitionAudio.default));

  useEffect(() => {
    if(transitionAudioRef.current){
      transitionAudioRef.current.load();
    }
  }, []);

  useEffect(() => {
    if(currentQuestion + 1 && questions[currentQuestion] && questions.length > 1){
      transitionAudioRef.current.pause();
      transitionAudioRef.current.currentTime = 0;
      transitionAudioRef.current.play();
    }
  }, [currentQuestion, questions]);

  const shapesStrokeColor = useMemo(() => {
    if(!questions[currentQuestion]){
      if(questions[currentQuestion - 1]?.resposta){
        return styles.blackStroke;
      } 
    }
    if(questions[currentQuestion]?.resposta){
      return styles.blackStroke;
    }
    return '';
  },[questions, currentQuestion]);
  
  const questionShapes = useMemo(() => {
    if(questions.length){
      return (
      <>
        {questions.map((question,index) => (
          <span className={styles.shapesContainer}>
            <Semicircle className={`${index % 2 === 0 ? styles.semicircle : styles.semicircleRotated} ${shapesStrokeColor}`}/>
            <span className={styles.circleContainer}>
              <Circle fill="white" className={styles.circle}/>
              <Question question={question} current={currentQuestion === index || !questions[currentQuestion]}/>
            </span>
          </span>
        ))}
        <Semicircle className={`${questions.length % 2 === 0 ? styles.semicircle : styles.semicircleRotated} ${shapesStrokeColor}`}/>
      </>);
    }
    return (
      <>
        <Semicircle className={styles.semicircle}/>
          <Circle/>
        <Semicircle className={styles.semicircleRotated}/>
      </>
    );
  }, [questions, shapesStrokeColor, currentQuestion]);

  const translateAnimationValue = useMemo(() => {
    if(window.screen.width > 640){
      if(questions.length && questions[currentQuestion]){
        return `${((currentQuestion) * (libras ? -90 : -105)) -20}vh`;
      } 
      if(questions.length){
        return `${((questions.length -1) * (libras ? -90 : -105)) -20}vh`;
      }
      return 0;
    } else {
      if(questions.length && questions[currentQuestion]){
        return `${((currentQuestion) * -120) - 10}vw`;
      } 
      if(questions.length){
        return `${((questions.length -1) * -120) - 10}vw`;
      }
      return 0;
    }
  },[questions, currentQuestion, libras]);

  return <div className={`${styles.circles} ${libras ? styles.libras : ''}`} style={{transform: `translateY(${translateAnimationValue})`}}>
    {questionShapes}
  </div>;
}

export default QuestionList;
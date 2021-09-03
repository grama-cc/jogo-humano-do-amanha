import React, {useMemo, useCallback} from 'react';

import styles from './QuestionList.module.scss';
import { QuestionType } from 'types/types';
import Question from 'components/view/Question/Question';

import {ReactComponent as Semicircle} from 'assets/shapes/Semicircle.svg';
import {ReactComponent as Circle} from 'assets/shapes/Circle.svg';

type QuestionListProps = {
  questions: QuestionType[];
  currentQuestion: number;
}

const QuestionList: React.FC<QuestionListProps> = ({questions, currentQuestion }) => {

  const shapesStrokeColor = useMemo(() => {
    console.log(questions[currentQuestion])
    if(!questions[currentQuestion]){
      if(questions[currentQuestion - 1]?.resposta){
        return styles.blackStroke;
      } 
    }
    if(questions[currentQuestion].resposta){
      return styles.blackStroke;
    }
    return '';
  },[questions, currentQuestion]);

  const questionText = useCallback((index) => {
    return questions[index].texto || '';
  }, [questions]);
  
  const questionShapes = useMemo(() => {
    if(questions.length){
      return (
      <>
        {questions.map((question,index) => (
          <>
            <Semicircle className={`${index % 2 === 0 ? styles.semicircle : styles.semicircleRotated} ${shapesStrokeColor}`}/>
            <span className={styles.circleContainer}>
              <Circle fill="white" className={styles.circle}/>
              <Question question={question}/>
            </span>
          </>
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
  }, [questions, questionText, shapesStrokeColor]);

  const translateAnimationValue = useMemo(() => {
    if(window.screen.width > 640){
      if(questions.length && questions[currentQuestion]){
        return `${((currentQuestion) * -105) -20}vh`;
      } 
      if(questions.length){
        return `${((questions.length -1) * -105) -20}vh`;
      }
      return 0;
    } else {
      if(questions.length && questions[currentQuestion]){
        return `${((currentQuestion) * -120) - 10}vw `;
      } 
      if(questions.length){
        return `${((questions.length -1) * -120) - 10}vw`;
      }
      return 0;
    }
  },[questions, currentQuestion]);

  return <div className={styles.circles} style={{transform: `translateY(${translateAnimationValue})`}}>
    {questionShapes}
  </div>;
}

export default QuestionList;
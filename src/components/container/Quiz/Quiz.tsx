import React, { useState, useCallback,useMemo, useContext, useEffect } from 'react';

import { QuestionType } from 'types/types';
import SettingsContext from 'context/settingsContext';
import { QuizQuestions } from 'api/index';

import Menu from '../Menu/Menu';
import LibrasToggle from '../LibrasToggle/LibrasToggle';
import QuestionList from 'components/container/QuestionList/QuestionList';
import Options from 'components/view/Options/Options';

import globalStyles from 'globals.module.scss';
import styles from './Quiz.module.scss';


const Quiz: React.FC = () => {
  const { step, setStep, userId, setUserId } = useContext(SettingsContext);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionsIndex] = useState<number>(0);
  const [finished, setFinished]= useState<boolean>(false);

  const goToResearch = useCallback(() => {
    setStep('research')
  }, [setStep]);

  const goToResult = useCallback(() => {
    setStep('result')
  }, [setStep]);

  const getInitialQuestion = useCallback(() => {
    QuizQuestions.getQuestion(currentQuestionIndex).then(res => {
      const updatedQuestions = [...questions];
      updatedQuestions.push(res.pergunta);
      setQuestions(updatedQuestions);
      setUserId(res.id);
    });
  },[currentQuestionIndex, questions, setUserId]);

  useEffect(() => {
    if(!questions.length){
      getInitialQuestion();
    }
  }, [questions, getInitialQuestion]);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex] || null, [currentQuestionIndex, questions]);

  const getNextQuestion = useCallback((answer = null) => {
    QuizQuestions.getQuestion(currentQuestionIndex + 1, answer, userId, currentQuestion.alternativa).then(res => {
      if(res.pergunta && res.has_next_question){
        const updatedQuestions = [...questions];
        updatedQuestions.push({
          ...res.pergunta,
          resposta: ''
        });
        setQuestions(updatedQuestions);
      } else {
        setFinished(true);
        goToResearch();
      }
    });
    setCurrentQuestionsIndex(current => current + 1);
  },[currentQuestionIndex, userId, questions, currentQuestion, goToResearch]);

  const goToPreviousQuestion = useCallback(() => {
    const previousIndex = currentQuestionIndex - 1;
    if(questions[previousIndex]){
      setCurrentQuestionsIndex(previousIndex);
    }
  }, [currentQuestionIndex, questions]);

  const goToNextQuestion = useCallback(() => {
    const nextIndex = currentQuestionIndex + 1;
    if(nextIndex < questions.length){
      setCurrentQuestionsIndex(nextIndex);
    } else {
      if(finished){
        goToResearch();
      }else {
        getNextQuestion();
      }
    }
  }, [currentQuestionIndex, questions, getNextQuestion, finished, goToResearch]);

  const setAnswer = useCallback((value) => {
    if(currentQuestion.resposta){
      goToNextQuestion();
    } else {
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex].resposta = value;
      setQuestions(updatedQuestions);
      getNextQuestion(value);
    }
    
  }, [currentQuestionIndex, questions, currentQuestion, getNextQuestion, goToNextQuestion]);

  const answerColor = useMemo(() => {
    if(currentQuestion){
      if(currentQuestion.resposta === 'SIM'){
        return styles.blue;
      }
      if(currentQuestion.resposta === 'TALVEZ'){
        return styles.yellow;
      }
      if(currentQuestion.resposta === 'NAO'){
        return styles.orange;
      } return '';
    }
    if(questions[currentQuestionIndex - 1]){
      if(questions[currentQuestionIndex - 1].resposta === 'SIM'){
        return styles.blue;
      }
      if(questions[currentQuestionIndex - 1].resposta === 'TALVEZ'){
        return styles.yellow;
      }
      if(questions[currentQuestionIndex - 1].resposta === 'NAO'){
        return styles.orange;
      } 
    }
    return '';
    
  }, [questions, currentQuestion, currentQuestionIndex]);

  return (
    <>
    {step === 'quiz' && (
      <main className={`${globalStyles.container} ${styles.quizWrapper} ${answerColor}`}>
        <Menu prevStep={'countdown'} text={currentQuestionIndex.toString()} prevAction={currentQuestionIndex ? goToPreviousQuestion : null}/>
        <QuestionList questions={questions} currentQuestion={currentQuestionIndex}/>
        <div className={styles.sidebar}>
          <Options
            options={[{label: 'Sim', value: 'SIM'},{label: 'Talvez', value: 'TALVEZ'}, {label: 'Não', value: 'NAO'}, ]}
            onSelect={currentQuestion ? setAnswer :  () => {}}
            selected={currentQuestion?.resposta}
          />
        </div>
        <LibrasToggle />
      </main>
    )}
    </>
  );
}

export default Quiz;
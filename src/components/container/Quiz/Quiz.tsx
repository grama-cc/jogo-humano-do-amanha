import React, { useState, useCallback,useMemo, useContext, useEffect } from 'react';

import { QuestionType } from 'types/types';
import SettingsContext from 'context/settingsContext';
import { QuizQuestions } from 'api/index';

import Menu from '../Menu/Menu';
import LibrasToggle from '../LibrasToggle/LibrasToggle';
import Question from 'components/view/Question/Question';
import Options from 'components/view/Options/Options';


import styles from 'globals.module.scss';

const Quiz: React.FC = () => {
  const { step, setStep } = useContext(SettingsContext);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionsIndex] = useState<number>(0);
  const [userId, setUserId] = useState<string|null>(null);
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
  },[]);

  useEffect(() => {
    if(!questions.length){
      getInitialQuestion();
    }
  }, [questions]);

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
  },[currentQuestionIndex, userId, questions, currentQuestion]);

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
  }, [currentQuestionIndex, questions, getNextQuestion, finished]);

  const setAnswer = useCallback((value) => {
    if(currentQuestion.resposta){
      goToNextQuestion();
    } else {
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex].resposta = value;
      setQuestions(updatedQuestions);
      getNextQuestion(value);
    }
    
  }, [currentQuestionIndex, questions, userId]);

  

  return (
    <>
    {step === 'quiz' && (
      <main className={styles.container}>
        <Menu prevStep={'countdown'} text={currentQuestionIndex.toString()} prevAction={goToPreviousQuestion}/>
        <Question question={currentQuestion} />
        <div className={styles.sidebar}>
          <Options options={['SIM', 'NAO', 'TALVEZ']} onSelect={currentQuestion ? setAnswer :  () => {}} />
          <div>
            <button onClick={goToResult} style={{ display: 'block', marginBottom: '16px'}}>Ir para resultado</button>
            <button onClick={goToResearch} style={{ display: 'block', marginBottom: '16px'}}>Ir para questionário socioeconômico</button>
          </div>
        </div>
        <LibrasToggle />
      </main>
    )}
    </>
  );
}

export default Quiz;
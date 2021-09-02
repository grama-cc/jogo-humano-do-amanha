import React, { useState, useEffect, useCallback, useContext, useMemo } from 'react';
import ResearchQuestion from 'components/view/ResearchQuestion/ResearchQuestion';
import ResearchOptions from 'components/view/ResearchOptions/ResearchOptions';

import SettingsContext from 'context/settingsContext';
import Menu from '../Menu/Menu';
import { Profile } from 'api';

import styles from 'globals.module.scss'
import LibrasToggle from '../LibrasToggle/LibrasToggle';
import { ProfileQuestion } from 'types/types';

const MOCK = [ '20-40 anos', '40-60 anos']

const Research: React.FC = () => {
  const { step, setStep } = useContext(SettingsContext);
  const [questions, setQuestions] = useState<ProfileQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionsIndex] = useState<number>(0);

  useEffect(() => {
    Profile.getQuestion().then(res => {
      console.log(res);
      setQuestions(res.questions);
    })
  }, []);

  const goToQuiz = useCallback(() => {
    setStep('quiz')
  }, [setStep]);

  const goToResult = useCallback(() => {
    setStep('result')
  }, [setStep]);


  const currentQuestion = useMemo(() => questions[currentQuestionIndex] || null, [currentQuestionIndex, questions]);

  const goToPreviousQuestion = useCallback(() => {
    const previousIndex = currentQuestionIndex - 1;
    if(questions[previousIndex]){
      setCurrentQuestionsIndex(previousIndex);
    } else {
      goToQuiz();
    }
  }, [currentQuestionIndex, questions]);

  const goToNextQuestion = useCallback(() => {
    const nextIndex = currentQuestionIndex + 1;
    if(nextIndex < questions.length){
      setCurrentQuestionsIndex(nextIndex);
    } else {
      goToResult();
    }
  }, [currentQuestionIndex, questions]);

  const setAnswer = useCallback((value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].answer = value;
    setQuestions(updatedQuestions);
    goToNextQuestion();
  }, [currentQuestion, questions, goToNextQuestion]);

  return (
    <>
    {step === 'research' && (
      <main className={styles.container}>
        <Menu text="Texto" prevStep={'quiz'} prevAction={currentQuestionIndex ? goToPreviousQuestion : null} />
        {!!questions.length ? (
          <>
            <ResearchQuestion question={currentQuestion.text} />
            <div className={styles.sidebar}>
              <ResearchOptions options={currentQuestion.options} onSelect={setAnswer} />
              <div>
                <button onClick={goToResult} style={{ display: 'block', marginBottom: '16px'}}>Próxima fase</button>
              </div>
            </div>
          </>
        ): 'Carregando...'}
        <LibrasToggle />
      </main>
    )}
    </>
  );
}

export default Research;
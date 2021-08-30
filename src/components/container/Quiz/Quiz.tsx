import React, { useState, useCallback, useContext } from 'react';

import { QuestionType } from 'types/types';
import SettingsContext from 'context/settingsContext';

import Menu from '../Menu/Menu';
import LibrasToggle from '../LibrasToggle/LibrasToggle';
import Question from 'components/view/Question/Question';
import Options from 'components/view/Options/Options';

import styles from 'globals.module.scss';

const Quiz: React.FC = () => {
  const { step, setStep } = useContext(SettingsContext);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestion, setCurrentQuestions] = useState<number>(0);

  const MockQuestion: QuestionType = {
    id: 34534,
    title: "Pergunta",
    options: ["yes", "no", "maybe"],
  };
  
  const setAnswer = useCallback((value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].answer = value;
  
    setQuestions(updatedQuestions);
  }, [currentQuestion, questions]);

  const changeStep = (value: number) => {
    setStep(step + value)
  };

  return (
    <>
    {step === 2 && (
      <main className={styles.container}>
        <Menu text="Quiz" />
        <Question question={MockQuestion} />
        <div className={styles.sidebar}>
          <Options options={MockQuestion.options} onSelect={setAnswer} />
          <div>
            <button onClick={() => changeStep(2)} style={{ display: 'block', marginBottom: '16px'}}>Ir para resultado</button>
            <button onClick={() => changeStep(1)} style={{ display: 'block', marginBottom: '16px'}}>Ir para questionário socioeconômico</button>
          </div>
        </div>
        <LibrasToggle />
      </main>
    )}
    </>
  );
}

export default Quiz;
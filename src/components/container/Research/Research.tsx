import React, { useState, useCallback, useContext } from 'react';
import ResearchQuestion from 'components/view/ResearchQuestion/ResearchQuestion';
import ResearchOptions from 'components/view/ResearchOptions/ResearchOptions';

import SettingsContext from 'context/settingsContext';
import Menu from '../Menu/Menu';

import styles from 'globals.module.scss'
import LibrasToggle from '../LibrasToggle/LibrasToggle';

const MOCK = [ '20-40 anos', '40-60 anos']

const Research: React.FC = () => {
  const { step, setStep } = useContext(SettingsContext);
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestions] = useState<number>(0);

  const setAnswer = useCallback((value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion] = value;
  
    setQuestions(updatedQuestions);
  }, [currentQuestion, questions]);

  const changeStep = () => {
    setStep('result')
  };

  return (
    <>
    {step === 'research' && (
      <main className={styles.container}>
        <Menu text="Texto" prevStep={'quiz'} />
        <ResearchQuestion question="Pergunta questionário" />
        <div className={styles.sidebar}>
          <ResearchOptions options={MOCK} onSelect={setAnswer} />
          <div>
            <button onClick={changeStep} style={{ display: 'block', marginBottom: '16px'}}>Próxima fase</button>
          </div>
        </div>
        <LibrasToggle />
      </main>
    )}
    </>
  );
}

export default Research;
import React, { useState, useCallback } from 'react';
import ResearchQuestion from 'components/view/ResearchQuestion/ResearchQuestion';
import ResearchOptions from 'components/view/ResearchOptions/ResearchOptions';

const MOCK = [ '20-40 anos', '40-60 anos']

const Research: React.FC = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestions] = useState<number>(0);

  const setAnswer = useCallback((value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion] = value;
  
    setQuestions(updatedQuestions);
  }, [currentQuestion, questions])

  return (
    <>
      <ResearchQuestion question="Pergunta questionário" />
      <ResearchOptions options={MOCK} onSelect={setAnswer} />
    </>
  );
}

export default Research;
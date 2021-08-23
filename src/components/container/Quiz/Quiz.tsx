import React, { useState, useCallback } from 'react';
import Question from 'components/view/Question/Question';

import { QuestionType } from 'types/types';
import Options from 'components/view/Options/Options';

const Quiz: React.FC = () => {
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
  }, [currentQuestion, questions])

  return (
    <>
      <Question question={MockQuestion} />
      <Options options={MockQuestion.options} onSelect={setAnswer} />
    </>
  );
}

export default Quiz;
import React, { useState } from 'react';

enum Option {
  yes,
  no,
  maybe
}

type QuestionType = {
  id: number;
  title: string;
  options: Option[];
  answer?: Option;
}

const Quiz: React.FC = () => {

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestion, setCurrentQuestions] = useState<number>(0);

  return <div />;
}

export default Quiz;
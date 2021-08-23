import React from 'react';
import { QuestionType } from 'types/types';

type QuestionProps = {
  question: QuestionType;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  return (
    <div>
      <h1>{question.title}</h1>
    </div>
  );
}

export default Question;


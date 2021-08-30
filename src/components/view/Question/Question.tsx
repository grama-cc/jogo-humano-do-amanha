import React from 'react';
import { QuestionType } from 'types/types';

import globalStyles from 'globals.module.scss'

type QuestionProps = {
  question: QuestionType;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  return (
    <div className={globalStyles.content}>
      <h1>{question.title}</h1>
    </div>
  );
}

export default Question;


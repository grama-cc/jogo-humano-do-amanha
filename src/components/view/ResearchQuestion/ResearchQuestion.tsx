import React from 'react';

import globalStyles from 'globals.module.scss';

type ResearchQuestionProps = {
  question: string;
}


const ResearchQuestion: React.FC<ResearchQuestionProps> = ({ question }) => {
  return (
    <div className={globalStyles.content}>
      <h1>{question}</h1>
    </div>
  );
}

export default ResearchQuestion;


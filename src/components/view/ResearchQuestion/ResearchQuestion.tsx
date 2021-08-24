import React from 'react';

type ResearchQuestionProps = {
  question: string;
}

const ResearchQuestion: React.FC<ResearchQuestionProps> = ({ question }) => {
  return (
    <div>
      <h1>{question}</h1>
    </div>
  );
}

export default ResearchQuestion;


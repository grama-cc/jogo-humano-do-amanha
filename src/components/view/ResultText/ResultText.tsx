import React from 'react';

type ResultTextProps = {
  title: string;
  text: string;
}

const ResultText: React.FC<ResultTextProps> = ({ title, text }) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{text}</p>
    </>
  );
}

export default ResultText;
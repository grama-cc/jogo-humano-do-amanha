import React from 'react';

type ResultShareProps = {
  link: string;
}

const ResultShare: React.FC<ResultShareProps> = ({ link }) => {
  return <a href={link} rel="noopener noreferrer" >Compartilhar</a>;
}

export default ResultShare;
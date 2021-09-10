import React from 'react';

import styles from './ResultText.module.scss';

type ResultTextProps = {
  title: string;
  text: string;
  revealResultMode?: boolean; 
}

const ResultText: React.FC<ResultTextProps> = ({ title, text, revealResultMode }) => {
  return (
    <>
      <h1 className={`${styles.title} ${revealResultMode && styles.revealTitle}`}><span>{title}</span></h1>
      <p className={`${styles.text} ${revealResultMode && styles.revealText}`}>{text}</p>
    </>
  );
}

export default ResultText;
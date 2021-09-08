import React from 'react';

import styles from './ResultText.module.scss';

type ResultTextProps = {
  title: string;
  text: string;
}

const ResultText: React.FC<ResultTextProps> = ({ title, text }) => {
  return (
    <>
      <h1 className={styles.title}><span>{title}</span></h1>
      <p className={styles.text}>{text}</p>
    </>
  );
}

export default ResultText;
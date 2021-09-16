import React, { useContext, useMemo } from 'react';
import { QuestionType, ProfileQuestion } from 'types/types';

import SettingsContext from 'context/settingsContext';

import Video from '../Video/Video';

import styles from './Question.module.scss';

type QuestionProps = {
  question: QuestionType | ProfileQuestion;
  current: boolean
}

const Question: React.FC<QuestionProps> = ({ question, current }) => {
  const { libras } = useContext(SettingsContext);
  const content = useMemo(() => {
    if(question){
      return <>
        {libras && current && <div className={styles.librasWrapper}>
          <Video source={question.libras || question.texto_libras?.url || false}/>
        </div>}
        <p className={styles.text}>{question.texto || question.text}</p>
      </>
    } return null;
  },[libras, question, current]);

  return (
    <div className={styles.question}>
      {content || 'Carregando...'}
    </div>
  );
}

export default Question;


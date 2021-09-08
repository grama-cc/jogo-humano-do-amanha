import React, { useContext, useMemo } from 'react';
import { QuestionType, ProfileQuestion } from 'types/types';

import SettingsContext from 'context/settingsContext';

import Video from '../Video/Video';

import styles from './Question.module.scss';

type QuestionProps = {
  question: QuestionType | ProfileQuestion;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  const { libras } = useContext(SettingsContext);

  const content = useMemo(() => {
    if(question){
      if(libras){
        return <Video source={question.libras || question.texto_libras?.url || 'http://techslides.com/demos/sample-videos/small.mp4'}/>;
      } return <p className={styles.text}>{question.texto || question.text}</p>
    } return null;
  },[libras, question]);

  return (
    <div className={styles.question}>
      {content || 'Carregando...'}
    </div>
  );
}

export default Question;


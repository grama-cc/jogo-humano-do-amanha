import React, { useContext, useMemo } from 'react';
import { QuestionType } from 'types/types';

import SettingsContext from 'context/settingsContext';

import Video from '../Video/Video';

import globalStyles from 'globals.module.scss'

type QuestionProps = {
  question: QuestionType;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  const { libras } = useContext(SettingsContext);

  const content = useMemo(() => {
    if(question){
      if(libras){
        return <Video source={question.libras || 'http://techslides.com/demos/sample-videos/small.mp4'}/>;
      } return <h1>{question.texto}</h1>
    } return null;
  },[libras, question]);

  return (
    <div className={globalStyles.content}>
      {content || 'Carregando...'}
    </div>
  );
}

export default Question;


import React, { useMemo, useContext } from 'react';

import SettingsContext from 'context/settingsContext';

import globalStyles from 'globals.module.scss';
import { ProfileQuestion } from 'types/types';

import Video from '../Video/Video';

type ResearchQuestionProps = {
  question: ProfileQuestion;
}


const ResearchQuestion: React.FC<ResearchQuestionProps> = ({ question }) => {

  const { libras } = useContext(SettingsContext);

  const content = useMemo(() => {
    if(question){
      if(libras && question?.texto_libras?.url){
        return <Video source={question?.texto_libras?.url || 'http://techslides.com/demos/sample-videos/small.mp4'}/>;
      } return <h1>{question.text}</h1>
    } return null;
  },[libras, question]);


  return (
    <div className={globalStyles.content}>
      {content}
    </div>
  );
}

export default ResearchQuestion;


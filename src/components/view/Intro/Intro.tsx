import React, { useContext, useState, useMemo } from 'react';
import SettingsContext from 'context/settingsContext';

import Video from '../Video/Video';
import Circle from '../Circle/Circle';

import globalStyles from 'globals.module.scss'

type IntroProps = {
  title: string,
  question?: string;
  videos?: string[] | null;
  endedVideos?: () => void | undefined;
}

const Intro: React.FC<IntroProps> = ({ title, question, videos, endedVideos }) => {
  const { libras } = useContext(SettingsContext);
  const [currentVideo, setCurrentVideo] = useState<number>(0);

  function nextVideo(){
    if(endedVideos){
      if(videos && videos?.length - 1 > currentVideo){
        setCurrentVideo(current => current + 1);
      } else {
        endedVideos();
      }
    }
  }

  const currentVideoSource = useMemo(() => {
    if(videos && videos[currentVideo]){
      return videos[currentVideo];
    } return '';
  }, [currentVideo, videos]);

  console.log('source', currentVideoSource);

  return (
    <div className={globalStyles.content}>
      <Circle>
        {libras ? (
          <Video source={currentVideoSource} onEnded={nextVideo}/>
        ) : (
          <div>
            <p>{title}</p>
            <h1>{question}</h1>
          </div>
        )}
      </Circle>
    </div>
  );
}

export default Intro;
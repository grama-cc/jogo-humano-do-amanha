import React, { useContext, useState, useMemo } from 'react';
import SettingsContext from 'context/settingsContext';
import Video from '../Video/Video';

import globalStyles from 'globals.module.scss'

type IntroProps = {
  titles: string[];
  videos?: string[] | null;
  endedVideos?: () => void | undefined;
}

const Intro: React.FC<IntroProps> = ({ titles, videos, endedVideos }) => {
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
      {libras ? (
        <Video source={currentVideoSource} onEnded={nextVideo}/>
      ) : (
        <p>{titles.map(item => (
          <li key={item}>{item}</li>
        ))}</p>
      )}
    </div>
  );
}

export default Intro;
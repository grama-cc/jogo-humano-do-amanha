import React, { useContext, useState, useMemo } from 'react';
import SettingsContext from 'context/settingsContext';

import Video from '../Video/Video';
import Circle from '../Circle/Circle';

import Shadow from 'assets/images/main-shadow.png';

import globalStyles from 'globals.module.scss';
import styles from './Intro.module.scss';

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

  return (
    <div className={globalStyles.content}>
      <Circle>
        {libras ? (
          <Video source={currentVideoSource} onEnded={nextVideo}/>
        ) : (
          <div className={styles.wrapper}>
            <p className={styles.title}>{title}</p>
            <h1 className={styles.question}>{question}</h1>
            <img className={styles.shadow} src={Shadow} alt="Jogo do amanhã" />
          </div>
        )}
      </Circle>
    </div>
  );
};

export default Intro;
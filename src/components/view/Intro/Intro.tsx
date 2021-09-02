import React, { useContext, useState, useMemo } from 'react';
import SettingsContext from 'context/settingsContext';

import Video from '../Video/Video';
import Circle from '../Circle/Circle';

import Shadow from 'assets/images/main-shadow.png';

import globalStyles from 'globals.module.scss';
import styles from './Intro.module.scss';

type IntroProps = {
  title?: string,
  question?: string;
  videos?: string[] | null;
  endedVideos?: () => void | undefined;
  welcome?: string[];
  showWelcomeMessage?: boolean;
}

const Intro: React.FC<IntroProps> = ({ title, question, videos, endedVideos, welcome, showWelcomeMessage }) => {

  const { libras, step } = useContext(SettingsContext);
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
            {title && <p className={styles.title}>{title}</p>}
            {question && <h1 className={styles.question}>{question}</h1>}
            {step === 'home' && <img className={styles.shadow} src={Shadow} alt="Jogo do amanhã" />}
            {step === 'countdown' && (
              <>
                {welcome?.map((item) => (
                  <p
                    key={item} 
                    className={styles.welcome}
                  >
                  {item}
                  </p>
                ))}
              </>
            )}
          </div>
        )}
      </Circle>
    </div>
  );
};

export default Intro;
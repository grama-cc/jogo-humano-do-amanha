import React, { useContext, useState, useMemo, useEffect } from 'react';
import SettingsContext from 'context/settingsContext';

import Video from '../Video/Video';
import Circle from '../Circle/Circle';

import Shadow from 'assets/images/main-shadow.png';

import styles from './Intro.module.scss';

type IntroProps = {
  title?: string,
  question?: string;
  videos?: string[] | null;
  endedVideos?: () => void | undefined;
  welcome?: string[];
  showWelcomeMessage?: boolean;
}

const Intro: React.FC<IntroProps> = ({ title, question, videos, endedVideos, welcome }) => {

  const { libras, step, settransitionStep, transitionStep } = useContext(SettingsContext);
  const [currentVideo, setCurrentVideo] = useState<number>(0);

  useEffect(() => {
    if (step !== 'home') {
      settransitionStep(false);
    }
  }, [step, settransitionStep])

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
    <div className={`${styles.wrapper} ${step === 'home' ? styles.home : ''}`}>
      <Circle>
        {libras ? (
          <Video source={currentVideoSource} onEnded={nextVideo}/>
        ) : (
          <div className={styles.textWrapper}>
            {title && <p className={`${styles.title} ${transitionStep && styles.transition}`}>{title}</p>}
            {question && <h1 className={`${styles.question} ${transitionStep && styles.transition}`}>{question}</h1>}
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
            {step === 'preresult' && (
              <div className={styles.animatedShadow}></div>
            )}
          </div>
        )}
      </Circle>
    </div>
  );
};

export default Intro;
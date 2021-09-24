import React, { useContext, useState, useMemo, useEffect } from 'react';
import SettingsContext from 'context/settingsContext';

import Video from '../Video/Video';
import Circle from '../Circle/Circle';

import Shadow from 'assets/images/03_aliesilhu.svg';

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
    <div className={`
      ${styles.wrapper} ${step === 'home' ? styles.home : styles.other}
      ${libras ? styles.libras : ''}
    `}>
      <Circle>
        {(libras) && <div className={`${styles.librasWrapper} ${step === 'home' && styles.homeLibras}`}>
          <Video source={currentVideoSource} onEnded={endedVideos ? nextVideo : undefined}/>
        </div>}
        <div className={`${styles.textWrapper} ${step === 'home' && styles.homeBorder} ${(step === 'home' && libras) && styles.homeLibras}`}>
          {title && <p className={`${styles.title} ${transitionStep && styles.transition}`}>{title}</p>}
          {question && <h1 className={`${styles.question} ${transitionStep && styles.transition}`}>{question}</h1>}
          {step === 'home' && (
            <div className={styles.homeQuestion}>
              <img className={styles.shadow} src={Shadow} alt="Jogo do amanhã" />
            </div>
          )}
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
      </Circle>
    </div>
  );
};

export default Intro;
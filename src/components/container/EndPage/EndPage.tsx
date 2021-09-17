import React, { useContext, useEffect, useCallback, useRef } from 'react';

import SettingsContext from 'context/settingsContext';

import Intro from 'components/view/Intro/Intro';
import IntroSidebar from 'components/view/IntroSidebar/IntroSidebar';

import globalStyles from 'globals.module.scss';
import Menu from '../Menu/Menu';

const playAudio = require('assets/audios/jogar.mp3');


const EndPage: React.FC = () => {
  const { step, setStep } = useContext(SettingsContext);

  const playRef = useRef<HTMLAudioElement>(new Audio(playAudio.default));

  useEffect(() => {
    if(playRef.current){
      playRef.current.load();
    }
  }, []);

  const goToResult = useCallback(() => {
    setStep('result');
  }, [setStep])

  const goToHome = useCallback(() => {
    setStep('home');
  }, [setStep])

  const changeToResult = useCallback(() => {
    playRef.current.currentTime = .2;
    playRef.current.play();
    setTimeout(() => {
      playRef.current.pause();
      playRef.current.currentTime = .2;
      playRef.current.load();
    }, 2000);

    setTimeout(goToResult, 2500);
  }, [goToResult]);

  const changeToHome = useCallback(() => {
    playRef.current.currentTime = .2;
    playRef.current.play();
    setTimeout(() => {
      playRef.current.pause();
      playRef.current.currentTime = .2;
      playRef.current.load();
    }, 2000);

    setTimeout(goToHome, 2500);
  }, [goToHome]);

  return (
    <>
      {(step === 'end') && (
        <main className={`${globalStyles.container} ${globalStyles.colorfulBackground}`}>
          <Menu prevStep={'result'} blackIcon={true} />
          <Intro
            question={'Até logo!'}
          />
          <IntroSidebar
            text={'Não se esqueça de compartilhar o resultado com os seus amigos'}
            endCtaLabelResult={'Ver seu resultado novamente'}
            endCtaActionResult={changeToResult}
            endCtaLabelHome={'Voltar ao início'}
            endCtaActionHome={changeToHome}
          />
          {/* <LibrasToggle blackIcon={true} /> */}
        </main>
      )}
    </>
  );
}

export default EndPage;
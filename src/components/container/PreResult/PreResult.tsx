import React, { useContext,useRef, useCallback, useEffect, useState } from 'react';

import SettingsContext from 'context/settingsContext';

import Intro from 'components/view/Intro/Intro';
import IntroSidebar from 'components/view/IntroSidebar/IntroSidebar';
import LibrasToggle from '../LibrasToggle/LibrasToggle';
import Sound from 'react-sound';

import globalStyles from 'globals.module.scss';

const preResultAudio = require('assets/audios/transicaoFinal.mp3');
const discoverAudio = require('assets/audios/descobrir.mp3');


const PreResult: React.FC = () => {
  const { step, setStep, transitionStep, settransitionStep } = useContext(SettingsContext);
  const [, setInitialMessage] = useState<boolean>(true);

  const discoverAudioRef = useRef<HTMLAudioElement>(new Audio(discoverAudio.default));

  useEffect(() => {
    if(discoverAudioRef.current){
      discoverAudioRef.current.load();
    }
  }, []);

  const changeContent = () => {
    setInitialMessage(false);
  }

  setTimeout(changeContent, 5000);
  
  const goToResult = useCallback(() => {
    setStep('result');
  }, [setStep])

  const changeStep = useCallback(async () => {
    discoverAudioRef.current.currentTime = .2;
    try{
      await discoverAudioRef.current.play();
    }catch(err){
      console.error(err);
    }
    settransitionStep(true);
    setTimeout(goToResult, 2500);
  }, [goToResult, settransitionStep, discoverAudioRef]);
 
  return (
    <>
      {step === 'preresult' && (
        
        <main className={`${globalStyles.container} ${transitionStep ? globalStyles.transition : globalStyles.colorfulBackground}`}>
          <Intro />
          <IntroSidebar
            aboutText={''}
            text={'Já temos o seu perfil! Saiba que tipo de humano do amanhã você será!'}
            ctaLabel={'Descobrir'}
            ctaAction={changeStep}
          />
          <LibrasToggle />
          <Sound url={preResultAudio.default} autoLoad loop playStatus="PLAYING"/>
        </main>      

      )}
    </>
  );
}

export default PreResult;
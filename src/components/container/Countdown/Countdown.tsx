import React, { useContext, useState, useEffect, useRef, useCallback} from 'react';
import { Welcome, GetScreenSaver } from 'api'
import { WelcomeContent, ScreenSaverContent } from 'types/types'

import SettingsContext from 'context/settingsContext';

import Intro from 'components/view/Intro/Intro';
import Options from 'components/view/Options/Options';
//import LibrasToggle from '../LibrasToggle/LibrasToggle';
import Menu from '../Menu/Menu';

import globalStyles from 'globals.module.scss';
import styles from './Countdown.module.scss';

const countAudio = require('assets/audios/contagem.mp3');

const initialMessageTime = 5000;
const countDownTime = 1500;

const Countdown: React.FC = () => {
  const { step, setStep, libras, setLoading } = useContext(SettingsContext);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countAudioRef = useRef<HTMLAudioElement>(new Audio(countAudio.default));

  const [welcome, setWelcome] = useState<WelcomeContent | null>(null);
	const [, setIsError] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(3);
  const [screenSaver, setScreenSaver] = useState<ScreenSaverContent>();
  const [showWelcomeMessage, setShowWelcomeMessage] = useState<boolean>(true);

  useEffect(() => {
    if(countAudioRef.current){
      countAudioRef.current.load();
    }
  }, []);

  const changeStep = useCallback(() => {
    setStep('quiz')
  }, [setStep]);

  const resetState = useCallback(() => {
    if(timerRef.current){
      clearTimeout(timerRef.current);
    }
    setShowWelcomeMessage(true);
    setCounter(3);
  }, []);

  const startTimer = useCallback((value = 3) => {
    if(value > -1){
      timerRef.current = setTimeout(() => {
        setCounter(value - 1);
        startTimer(value - 1);
      }, countDownTime);
    } else {
      changeStep();
    }
  }, [changeStep]);

  useEffect(() => {
		Welcome.getWelcome()
			.then((data) => {
				setWelcome(data);
      }).catch((err) => {
				setIsError(true);
			});

      GetScreenSaver.getScreenSaver()
      .then((data) => {
        setScreenSaver(data);
      })
      .catch((err) => {
        setIsError(true);
      })
	}, []);

  useEffect(() => {
    if(step === 'countdown'){
      countAudioRef.current.currentTime = 0;
      try{
        countAudioRef.current.play();
      }catch(err){
        console.error(err);
      }
      
      resetState();
      timerRef.current = setTimeout(() => {
        setShowWelcomeMessage(false);
        setLoading(true);
        startTimer();
      }, initialMessageTime);
/*       if(!libras){
      } else if(timerRef.current){
        clearTimeout(timerRef.current);
      } */
    } else {
      if(timerRef.current){
        countAudioRef.current.pause();
        countAudioRef.current.currentTime = 0;
        countAudioRef.current.load();
        resetState();
      }
    }
  }, [step, libras, startTimer, resetState, setLoading]);

  const screenSaverMessage = [`${screenSaver?.init_screen_saver.wellcome.title}`, `${screenSaver?.init_screen_saver.wellcome.subtitle}`];

  return (
    <>
      {(step === 'countdown') && (
        <main className={`${globalStyles.container} ${styles.countdownWrapper}`}>
          <Menu text="0" prevStep={'home'} />
          <Intro
            welcome={showWelcomeMessage ? screenSaverMessage : [counter.toString()]}
            /* videos={welcome ? [
              welcome?.pagina_inicial_libras_video.url,
              welcome?.pagina_carregando_contador_libras_video.url
            ] : null} */
            //videos={[]}
            //endedVideos={changeStep}
            showWelcomeMessage={showWelcomeMessage}
          />

          <div className={styles.sidebar}>
            <Options
              onSelect={() => {}}
              options={[
                {label: 'Sim', value: 'SIM'},
                {label: 'Talvez', value: 'TALVEZ'},
                {label: 'Não', value: 'NAO'}
              ]}
            />
          </div>
         
          {/* <LibrasToggle /> */}
        </main>
      )}
    </>
  );
}

export default Countdown;
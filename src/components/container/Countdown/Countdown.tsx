import React, { useContext, useState, useEffect, useRef, useCallback} from 'react';
import { Welcome } from 'api'
import { WelcomeContent} from 'types/types'

import SettingsContext from 'context/settingsContext';

import Intro from 'components/view/Intro/Intro';
import LibrasToggle from '../LibrasToggle/LibrasToggle';

import styles from 'globals.module.scss';
import Menu from '../Menu/Menu';

const MOCK = [
  "Bem-vindo!",
  "Responda as sete perguntas usando:"
]

const initialMessageTime = 5000;
const countDownTime = 1500;

const Countdown: React.FC = () => {
  const { step, setStep, libras } = useContext(SettingsContext);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [welcome, setWelcome] = useState<WelcomeContent | null>(null);
	const [isError, setIsError] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(3);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState<boolean>(true);

  const changeStep = useCallback(() => {
    setStep('quiz')
  }, [setStep]);

  const resetState = useCallback(() => {
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
        const mockedData = {...data};
        mockedData['pagina_carregando_contador_libras_video']['url'] = 'http://techslides.com/demos/sample-videos/small.mp4'
				setWelcome(mockedData);
      }).catch((err) => {
				setIsError(true);
			});
	}, []);

  useEffect(() => {
    if(step === 'countdown'){
      if(!libras){
        resetState();
        timerRef.current = setTimeout(() => {
          setShowWelcomeMessage(false);
          startTimer();
        }, initialMessageTime);
      } else if(timerRef.current){
        clearTimeout(timerRef.current);
      }
    }
  }, [step, libras, startTimer, resetState]);

  

  return (
    <>
      {(step === 'countdown') && (
        <main className={styles.container}>
          <Menu text="0" prevStep={'home'} />
          <Intro
            titles={showWelcomeMessage ? MOCK: [counter.toString()]}
            videos={welcome ? [
              welcome?.pagina_inicial_libras_video.url,
              welcome?.pagina_carregando_contador_libras_video.url
            ] : null} 
            endedVideos={changeStep}/>
          <button onClick={changeStep}>Jogar</button>
          <LibrasToggle />
        </main>
      )}
    </>
  );
}

export default Countdown;
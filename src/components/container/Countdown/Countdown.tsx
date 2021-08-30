import React, { useContext, useState, useEffect } from 'react';
import { Welcome } from 'api'
import { WelcomeContent } from 'types/types'

import SettingsContext from 'context/settingsContext';

import Intro from 'components/view/Intro/Intro';
import LibrasToggle from '../LibrasToggle/LibrasToggle';

import styles from 'globals.module.scss';
import Menu from '../Menu/Menu';

const MOCK = [
  "Bem-vindo!",
  "Responda as sete perguntas usando:"
]

const Countdown: React.FC = () => {
  const { step, setStep } = useContext(SettingsContext);

  const [welcome, setWelcome] = useState<WelcomeContent>();
	const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
		Welcome.getWelcome()
			.then((data) => {
				setWelcome(data);
			})
			.catch((err) => {
				setIsError(true);
			});
		return () => {};
	}, []);

  const changeStep = () => {
    setStep(step + 1)
  };

  return (
    <>
      {(step === 1) && (
        <main className={styles.container}>
          <Menu text="0" />
          <Intro titles={MOCK} video={welcome?.pagina_carregando_contador_libras_video.url} />
          <button onClick={changeStep}>Jogar</button>
          <LibrasToggle />
        </main>
      )}
    </>
  );
}

export default Countdown;
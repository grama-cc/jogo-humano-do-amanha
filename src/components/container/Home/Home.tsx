import React, { useContext, useState, useEffect } from 'react';
import { Welcome } from 'api'
import { WelcomeContent } from 'types/types'

import SettingsContext from 'context/settingsContext';

import Intro from 'components/view/Intro/Intro';
import IntroSidebar from 'components/view/IntroSidebar/IntroSidebar';
import LibrasToggle from '../LibrasToggle/LibrasToggle';

import styles from 'globals.module.scss';

const MOCK = [
  "Você já parou para pensar que tipo de humano será no futuro?",
  "Você gostaria de viajar para Marte?"
]

const Home: React.FC = () => {
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
    setStep('countdown')
  };

  return (
    <>
      {(step === 'home') && (
        <main className={styles.container}>
          <Intro titles={MOCK} video={welcome?.pagina_bemvindo_libras_video.url} />
          <IntroSidebar
            aboutText="Sobre o jogo do amanhã"
            aboutLink="/"
            text="Responda as próximas sete perguntas e descubra quem você será no mundo do futuro"
            ctaLabel="Jogar"
            ctaAction={changeStep}
          />
          <LibrasToggle />
        </main>
      )}
    </>
  );
}

export default Home;
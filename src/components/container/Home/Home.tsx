import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Welcome, GetAbout, GetScreenSaver } from 'api'
import { WelcomeContent, AboutText, ScreenSaverContent } from 'types/types'

import SettingsContext from 'context/settingsContext';

import Intro from 'components/view/Intro/Intro';
import IntroSidebar from 'components/view/IntroSidebar/IntroSidebar';
import LibrasToggle from '../LibrasToggle/LibrasToggle';

import styles from 'globals.module.scss';
import About from 'components/view/About/About';

const Home: React.FC = () => {
  const { step, setStep, showAboutPopUp } = useContext(SettingsContext);

  const [welcome, setWelcome] = useState<WelcomeContent>();
  const [aboutContent, setAboutContent] = useState<AboutText>();
  const [screenSaver, setScreenSaver] = useState<ScreenSaverContent>();
	const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
		Welcome.getWelcome()
			.then((data) => {
				setWelcome(data);
			})
			.catch((err) => {
				setIsError(true);
			});

      GetAbout.getAbout()
        .then((data) => {
          setAboutContent(data);
        })
        .catch((err) => {
          setIsError(true);
        });

      GetScreenSaver.getScreenSaver()
        .then((data) => {
          setScreenSaver(data);
        })
        .catch((err) => {
          setIsError(true);
        })
		return () => {};
	}, []);

  const changeStep = useCallback(() => {
    setStep('countdown')
  }, [setStep]);

  if (!aboutContent || !screenSaver) return null;

  return (
    <>
      {(step === 'home') && (
        <main className={styles.container}>
          <Intro
            title={screenSaver.init_screen_saver.title}
            question={screenSaver.init_screen_saver.init_question}
            videos={welcome ? [welcome?.pagina_bemvindo_libras_video.url] : null} 
          />
          <IntroSidebar
            aboutText={aboutContent.title}
            text={screenSaver.init_screen_saver.directions}
            ctaLabel={screenSaver.init_screen_saver.init_button}
            ctaAction={changeStep}
          />
          <LibrasToggle />
          {showAboutPopUp && <About text={aboutContent.description} /> }
        </main>
      )}
    </>
  );
}

export default Home;
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Welcome, GetAbout, GetScreenSaver } from 'api'
import { WelcomeContent, AboutText, ScreenSaverContent } from 'types/types'

import SettingsContext from 'context/settingsContext';

import About from 'components/view/About/About';
import Intro from 'components/view/Intro/Intro';
import IntroSidebar from 'components/view/IntroSidebar/IntroSidebar';
import LibrasToggle from '../LibrasToggle/LibrasToggle';

import globalStyles from 'globals.module.scss';

const Home: React.FC = () => {
  const { step, setStep, showAboutPopUp, transitionStep, settransitionStep } = useContext(SettingsContext);

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

  const goToCountdown = useCallback(() => {
    setStep('countdown');
  }, [setStep])

  const changeStep = useCallback(() => {
    settransitionStep(true);
    setTimeout(goToCountdown, 2500);
  }, [goToCountdown, settransitionStep]);

  if (!aboutContent || !screenSaver) return null;

  return (
    <>
      {(step === 'home') && (
        <main className={`${globalStyles.container} ${transitionStep ? globalStyles.transition : globalStyles.colorfulBackground}`}>
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
          <LibrasToggle blackIcon={true} />
          {showAboutPopUp && <About title={aboutContent.title} text={aboutContent.description} /> }
        </main>
      )}
    </>
  );
}

export default Home;
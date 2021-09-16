import React, { useContext, useCallback, useEffect, useState } from 'react';

import SettingsContext from 'context/settingsContext';

import Intro from 'components/view/Intro/Intro';
import IntroSidebar from 'components/view/IntroSidebar/IntroSidebar';
import LibrasToggle from '../LibrasToggle/LibrasToggle';

import globalStyles from 'globals.module.scss';


const PreResult: React.FC = () => {
  const { step, setStep, transitionStep, settransitionStep } = useContext(SettingsContext);
  const [initialMessage, setInitialMessage] = useState<boolean>(true);

  const changeContent = () => {
    setInitialMessage(false);
  }

  setTimeout(changeContent, 5000);
  
  const goToResult = useCallback(() => {
    setStep('result');
  }, [setStep])

  const changeStep = useCallback(() => {
    settransitionStep(true);
    setTimeout(goToResult, 2500);
  }, [goToResult, settransitionStep]);
 
  return (
    <>
      {step === 'preresult' && (

        <main className={`${globalStyles.container} ${transitionStep ? globalStyles.transition : globalStyles.colorfulBackground}`}>
          <Intro />
          <IntroSidebar
            aboutText={''}
            text={'Preparado para saber que tipo de humano do amanhã você é?'}
            ctaLabel={'Descobrir'}
            ctaAction={changeStep}
          />
          <LibrasToggle />
        </main>      

      )}
    </>
  );
}

export default PreResult;
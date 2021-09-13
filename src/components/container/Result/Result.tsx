import React, { useContext, useState, useEffect, useCallback } from 'react';
import { AllHumanTypes, GetHumanType, GetResult } from 'api';

import SettingsContext from 'context/settingsContext';

import Menu from 'components/container/Menu/Menu';
import LibrasToggle from '../LibrasToggle/LibrasToggle';
import ResultAvatar from 'components/view/ResultAvatar/ResultAvatar';
import ResultText from 'components/view/ResultText/ResultText';
import ResultShare from 'components/view/ResultShare/ResultsShare';
import ResultsList from 'components/view/ResultsList/ResultsList';

import styles from './Result.module.scss';

export default function Result() {
  const { step, setStep, userId, allHumanTypes, setAllHumanTypes, resultAvatar, setResultAvatar } = useContext(SettingsContext);
  const [resultOpenness, setResultOpenness] = useState<string>('');
  const [resultCharacter, setResultCharacter] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    AllHumanTypes.getHumanTypes()
    .then((data) => {
      setAllHumanTypes(data);
    })
    .catch((err) => {
      setIsError(true);
    });

    if (userId && step === 'result') {
      GetResult.getResult(userId)
      .then((data) => {
        setResultCharacter(data.point.max_character_label);
        setResultOpenness(data.point.max_openness_label);
      })
      .catch((err) => {
        setIsError(true);
      })
    }

    if ((resultOpenness !== '') && (resultCharacter !== '')) {
      GetHumanType.getHumanType(resultOpenness, resultCharacter)
      .then((avatar) => {
        if(avatar.length){
          setResultAvatar(avatar[0]);
        }
      })
      .catch((err) => {
        setIsError(true);
      });
    }

    
		return () => {};
    
	}, [setAllHumanTypes, setResultAvatar, allHumanTypes]);
  
  const goToResearch = useCallback(() => {
    setStep('research')
  }, [setStep]);

  const goToHome = useCallback(() => {
    setStep('home')
  }, [setStep]);

  if (!resultAvatar) return null;

  return (
    <>
      {step === 'result' && (
        <main className={styles.mainWrapper}>
          <div 
            className={styles.transitionWrapper}
          >
            <Menu prevStep={'research'} topText={'Seu humano do amanhã é:'} />
            <div className={styles.resultContainer}>
              <div className={styles.resultContent}>
              </div>
              <div className={styles.resultSidebar}>
                <ResultText title={resultAvatar.nome} text={''} revealResultMode={true} />
              </div>
            </div>
            <LibrasToggle />
          </div>
          <div 
            className={styles.contentWrapper}
            style={{ background: `${ window.innerWidth < 640 ? `linear-gradient(180deg, ${resultAvatar.backgroundColor} 0%, #000 90%)` : `${resultAvatar.backgroundColor}`}` }}
          >
            <Menu prevStep={'research'} topText={'Seu humano do amanhã é:'} blackIcon={true} />
            <div className={styles.resultContainer}>
              <div className={styles.resultContent}>
                <ResultAvatar avatar={resultAvatar.images[1].url} avatarName={resultAvatar.nome} />
              </div>
              <div className={styles.resultSidebar}>
                <ResultText title={resultAvatar.nome} text={resultAvatar.descricao} />
                <ResultShare resultTitle={resultAvatar.nome} resultDescription={resultAvatar.descricao} color={resultAvatar.backgroundColor} />
                <div className={styles.seeMore}>Role para conhecer os outros <span>humanos do amanhã</span></div>
              </div>
            </div>
            <div className={styles.resultList}>
              <div className={styles.resultContent}>
                {allHumanTypes && <ResultsList results={allHumanTypes} color={resultAvatar.backgroundColor} />}
              </div>

              <div className={styles.resultSidebar}>
                <div>
                  <p className={styles.message}>
                    Nos ajude a melhorar esse jogo respondendo um breve questionário e aproveite para descobrir os outros
                    <span style={{ color: `${resultAvatar.backgroundColor}` }}>
                      humanos do amanhã
                    </span>
                  </p>
                  <button onClick={goToResearch} className={styles.cta}>Ok, vamos lá</button>
                  <button onClick={goToHome} className={styles.endGame}>Encerrar o jogo</button>
                </div>
              </div>
            </div>
            <LibrasToggle blackIcon={true} />
          </div>
        </main>
      )}
    </>
  )
}

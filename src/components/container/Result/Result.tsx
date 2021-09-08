import React, { useContext, useState, useEffect, useCallback } from 'react';
import { AllHumanTypes, GetHumanType } from 'api';

import SettingsContext from 'context/settingsContext';

import Menu from 'components/container/Menu/Menu';
import LibrasToggle from '../LibrasToggle/LibrasToggle';
import ResultAvatar from 'components/view/ResultAvatar/ResultAvatar';
import ResultText from 'components/view/ResultText/ResultText';
import ResultShare from 'components/view/ResultShare/ResultsShare';
import ResultsList from 'components/view/ResultsList/ResultsList';

import styles from './Result.module.scss';

const MOCK_DATA = 
  {
    __v: 0,
    _id: '610d8ac6161e780015ce6152',
    character: 'COLETIVISMO',
    createdAt: '2021-08-06T19:17:26.897Z',
    descricao: 'O mundo lhe parece confuso demais. Você quer mudar isso, mas às vezes desiste para NAO entrar numa briga. O seu sonho de futuro é viver como antigamente. Mas NAO se engane. Sonhar com o mundo ideal é tão importante quanto estar acordado para agir no momento presente.',
    humor: 'FLEUMATICO',
    id: '610d8ac6161e780015ce6152',
    images: [Image],
    locale: 'pt-BR',
    localizations: ['localization'],
    nome: 'NATUREBA SOSSEGADO',
    openness: 'CAUTELOSO',
    perfil: 'FECHADO',
    updatedAt: '2021-08-12T17:59:33.906Z',
  }
;

export default function Result() {
  const { step, setStep, allHumanTypes, setAllHumanTypes, resultAvatar, setResultAvatar, resultsListHuman } = useContext(SettingsContext);
  const [isError, setIsError] = useState<boolean>(false);
  const [currentHuman, setCurrentHuman] = useState<boolean>(false)

  
  useEffect(() => {
    AllHumanTypes.getHumanTypes()
    .then((data) => {
      setAllHumanTypes(data);
    })
    .catch((err) => {
      setIsError(true);
    });
    
    GetHumanType.getHumanType(MOCK_DATA.openness, MOCK_DATA.character)
    .then((avatar) => {
      if(avatar.length){
        setResultAvatar(avatar[0]);
      }
    })
    .catch((err) => {
      setIsError(true);
    });
    
		return () => {};
    
	}, [setAllHumanTypes, setResultAvatar]);
  
  const goToResearch = useCallback(() => {
    setStep('research')
  }, [setStep]);

  const goToHome = useCallback(() => {
    setStep('home')
  }, [setStep]);

  const showHuman = () => {
    setCurrentHuman(true);
  }

  if (!resultAvatar) return null;

  return (
    <>
      {step === 'result' && (
        <main 
          style={{ background: `${ window.innerWidth < 640 ? `linear-gradient(180deg, ${resultAvatar.backgroundColor} 0%, #000 90%)` : `${resultAvatar.backgroundColor}`}` }}
        >
          <Menu prevStep={'research'} text={'Seu humano do amanhã é:'} />
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
            <div className={styles.resultContent} onClick={showHuman}>
              {allHumanTypes && <ResultsList results={allHumanTypes} color={resultAvatar.backgroundColor} />}
            </div>

            <div className={styles.resultSidebar}>
              {currentHuman ? (
                <div>
                  <ResultText title={resultsListHuman.nome} text={resultsListHuman.descricao} />
                </div>
              ) : (
                <div>
                  <p className={styles.message}>Nos ajude a melhorar esse jogo respondendo um breve questionário e 
                  aproveite para descobrir os outros <span style={{ color: `${resultAvatar.backgroundColor}` }}>humanos do amanhã</span></p>
                  <button onClick={goToResearch} className={styles.cta}>Ok, vamos lá</button>
                  <button onClick={goToHome} className={styles.cta}>Talvez depois</button>
                  <button onClick={goToHome} className={styles.endGame}>Encerrar o jogo</button>
                </div>
              )}
            </div>
          </div>
          <LibrasToggle />
        </main>
      )}
    </>
  )
}

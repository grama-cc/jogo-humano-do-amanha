import React, { useContext, useState, useEffect, useCallback } from 'react';
import { AllHumanTypes, GetHumanType } from 'api';

import SettingsContext from 'context/settingsContext';

import Menu from 'components/container/Menu/Menu';
import LibrasToggle from '../LibrasToggle/LibrasToggle';
import ResultAvatar from 'components/view/ResultAvatar/ResultAvatar';
import ResultText from 'components/view/ResultText/ResultText';
import ResultShare from 'components/view/ResultShare/ResultsShare';
import ResultsList from 'components/view/ResultsList/ResultsList';

import styles from 'globals.module.scss';

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

  if (!resultAvatar) return null;

  return (
    <>
      {step === 'result' && (
        <main className={styles.container}>
          <Menu text={"Menu"} prevStep={'research'} />
          <div className={styles.content} style={{ display: 'flex', flexDirection: 'column'}}>
            <ResultAvatar avatar={resultAvatar.images[0]} avatarName={resultAvatar.nome} />
            {allHumanTypes && <ResultsList results={allHumanTypes} />}
          </div>
          <div className={styles.sidebar}>
            <ResultText title={resultAvatar.nome} text={resultAvatar.descricao} />
            <ResultShare resultTitle={resultAvatar.nome} resultDescription={resultAvatar.descricao} />
            <p>Conheça os outros humanos do amanhã</p>
            {resultsListHuman ? (
              <>
                <ResultText title={resultsListHuman.nome} text={resultsListHuman.descricao} />
                <button onClick={goToResearch}>Nos ajude a melhorar o jogo do amanhã</button>
              </>
            ) : (
              <p>Clique para conhecer os demais humanos do futuro</p>
            )}
          </div>
          <LibrasToggle />
        </main>
      )}
    </>
  )
}

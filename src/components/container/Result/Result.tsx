import React, { useContext, useState, useEffect } from 'react';
import { AllHumanTypes, GetHumanType } from 'api';

import SettingsContext from 'context/settingsContext';

import Menu from 'components/container/Menu/Menu';
import LibrasToggle from '../LibrasToggle/LibrasToggle';
import ResultAvatar from 'components/view/ResultAvatar/ResultAvatar';
import ResultText from 'components/view/ResultText/ResultText';
import ResultShare from 'components/view/ResultShare/ResultsShare';
import ResultsList from 'components/view/ResultsList/ResultsList';

import styles from 'globals.module.scss';

const MOCK_DATA = {
  character: 'COLETIVISMO',
  openness: 'CAUTELOSO',
}

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
        setResultAvatar(avatar);
      })
      .catch((err) => {
        setIsError(true);
      });

		return () => {};

	}, [setAllHumanTypes, setResultAvatar]);

  const goToResearch = () => {
    setStep('research');
  };

  return (
    <>
      {step === 'result' && (
        <main className={styles.container}>
          <Menu text={"Menu"} prevStep={'research'} />
          <div className={styles.content} style={{ display: 'flex', flexDirection: 'column'}}>
            <ResultAvatar avatar={resultAvatar[0].images[0]} avatarName={resultAvatar[0].nome} />
            {allHumanTypes && <ResultsList results={allHumanTypes} />}
          </div>
          <div className={styles.sidebar}>
            <ResultText title={resultAvatar[0].nome} text={resultAvatar[0].descricao} />
            <ResultShare link="/" />
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

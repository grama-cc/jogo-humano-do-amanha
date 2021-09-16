import React, { useContext, useState, useEffect } from 'react';
import { AllHumanTypes } from 'api';

import SettingsContext from 'context/settingsContext';

import Menu from 'components/container/Menu/Menu';
import LibrasToggle from '../LibrasToggle/LibrasToggle';
import AllHumansList from 'components/view/AllHumansList/AllHumansList';

import styles from './AllHumans.module.scss';
import ResultAvatar from 'components/view/ResultAvatar/ResultAvatar';
import Video from 'components/view/Video/Video';


export default function Result() {
  const { step, allHumanTypes, setAllHumanTypes, resultsListHuman, libras } = useContext(SettingsContext);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    AllHumanTypes.getHumanTypes()
    .then((data) => {
      setAllHumanTypes(data);
    })
    .catch((err) => {
      setIsError(true);
    });
    
		return () => {};
    
	}, [setAllHumanTypes]);

  if (!allHumanTypes) return null;

  return (
    <>
      {step === 'allhumans' && (
        <main className={styles.contentWrapper}>
          <Menu prevStep={'research'} topText={'Conheça os outros humanos do amanhã:'} blackIcon={true} />
          <div className={styles.resultList}>
            <div className={styles.resultContent}>
              {resultsListHuman.nome !== '' && (
                <>
                  {libras && !!resultsListHuman?.libras_description?.url &&
                    <div className={styles.librasWrapper}>
                      {console.log(resultsListHuman)}
                      <Video source={resultsListHuman.libras_description.url}/>
                    </div>
                  }
                  <ResultAvatar avatar={resultsListHuman.images[1].url} avatarName={resultsListHuman.nome} />
                </>
              )}
              {allHumanTypes && <AllHumansList results={allHumanTypes} />}
            </div>

            <div className={styles.resultSidebar}>
              {resultsListHuman.nome !== '' ? (
                <>
                  <p className={styles.title}>{resultsListHuman.nome}</p>
                  {libras && !!resultsListHuman?.libras_description?.url &&
                    <div className={styles.librasWrapperMobile}>
                      {console.log(resultsListHuman)}
                      <Video source={resultsListHuman.libras_description.url}/>
                    </div>
                  }
                  <p className={styles.text}>{resultsListHuman.descricao}</p>
                  <p className={styles.cta}>
                    Role para conhecer os 
                    <span>
                      humanos do amanhã
                    </span>
                  </p> 
                </>
              ) : (
                <>
                  <p className={styles.title}>Os humanos do amanhã</p>
                  <p className={styles.text}>Cada personagem é inspirado na Teoria Humoral do grego Hipócrates – em que a vida seria regulada por “humores” predominantes, resultando em diferentes temperamentos – e em tendências de comportamento sobre inovações de um futuro próximo.</p>
                  <p className={styles.cta}>
                    Clique para conhecer os 
                    <span>
                      humanos do amanhã
                    </span>
                  </p> 
                </>
              )}
            </div>
          </div>
          <LibrasToggle blackIcon={true} />
        </main>
      )}
    </>
  )
}

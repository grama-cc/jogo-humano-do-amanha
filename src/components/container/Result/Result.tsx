import React, { useContext, useState, useEffect, useCallback } from 'react';
import { GetHumanType, GetResult } from 'api';

import SettingsContext from 'context/settingsContext';

import Menu from 'components/container/Menu/Menu';
import LibrasToggle from '../LibrasToggle/LibrasToggle';
import ResultAvatar from 'components/view/ResultAvatar/ResultAvatar';
import ResultText from 'components/view/ResultText/ResultText';
import ResultShare from 'components/view/ResultShare/ResultsShare';
import ResultsList from 'components/view/ResultsList/ResultsList';

import styles from './Result.module.scss';
import Video from 'components/view/Video/Video';
import humanAudios from 'assets/audios/humans/allHumans';

export default function Result() {
  const { step, setStep, userId, allHumanTypes, setAllHumanTypes, resultAvatar, setResultAvatar, libras } = useContext(SettingsContext);
  const [resultOpenness, setResultOpenness] = useState<string>('');
  const [resultCharacter, setResultCharacter] = useState<string>('');
  const [, setIsError] = useState<boolean>(false);
  const [avatarReady, setAvatarReady] = useState<boolean>(false);
  const [allReady, setAllReady] = useState<boolean>(false);

  useEffect(() => {
    if(step === 'result'){
      if (!resultOpenness && !resultCharacter && userId) {
        GetResult.getResult(userId)
        .then((data) => {
          setResultCharacter(data.point.max_character_label);
          setResultOpenness(data.point.max_openness_label);
        })
        .catch((err) => {
          setIsError(true);
        })
      }
  
      if (resultOpenness && resultCharacter && !resultAvatar) {
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
    }
  
	}, [setAllHumanTypes, setResultAvatar, userId, step, resultOpenness, resultCharacter, resultAvatar]);


  useEffect(() => {
    function humanAudioPlay(){
      if(step === 'result' && avatarReady && resultAvatar){
        const humanAudio = humanAudios.find(h => h.name === resultAvatar.nome);
        const audio = new Audio(humanAudio?.audio.default);
        audio.oncanplaythrough = async () => {
          try{
            await audio.play();
          }catch(err){
            console.error(err);
          }
          
        };
        audio.onplay = () => {
          setAllReady(true);
        }
      } else {
        setAllReady(false);
        setAvatarReady(false);
      }
    }
    humanAudioPlay();
  }, [avatarReady, resultAvatar, step]);
  
  const goToResearch = useCallback(() => {
    setStep('research')
  }, [setStep]);

  const goToEnd = useCallback(() => {
    setStep('end')
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
                <ResultText
                  title={resultAvatar.nome} text={''}
                  revealResultMode={true}
                />
              </div>
            </div>
            <LibrasToggle />
          </div>
          <div 
            className={`${styles.contentWrapper} ${allReady ? styles.reveal : ''}`}
            style={{ background: `${ window.innerWidth < 770 ? `linear-gradient(180deg, ${resultAvatar.backgroundColor} 0%, #000 90%)` : `${resultAvatar.backgroundColor}`}` }}
          >
            <Menu prevStep={'research'} topText={'Seu humano do amanhã é:'} blackIcon={true} />
            <div className={styles.resultContainer}>
              <div className={styles.resultContent}>
                <ResultAvatar
                  avatar={resultAvatar.images[1].url}
                  avatarName={resultAvatar.nome}
                  ready={() => setAvatarReady(true)}
                />
                {libras && !!resultAvatar?.libras_description?.url &&
                  <div className={styles.librasWrapper}>
                    <Video source={resultAvatar.libras_description.url}/>
                  </div>}
              </div>
              <div className={styles.resultSidebar}>
                <ResultText title={resultAvatar.nome}
                  text={resultAvatar.descricao}
                  video={resultAvatar.libras_description.url}/>
                <ResultShare
                  resultTitle={resultAvatar.nome}
                  resultDescription={resultAvatar.descricao}
                  color={resultAvatar.backgroundColor}
                />
                <div className={styles.seeMore}>Que tal conhecer os outros <span>humanos do amanhã</span>?</div>
              </div>
            </div>
            <div className={styles.resultList}>
              <div className={styles.resultContent}>
                {allHumanTypes && <ResultsList results={allHumanTypes} color={resultAvatar.backgroundColor} />}
              </div>

              <div className={styles.resultSidebar}>
                <div className={styles.researchInvite}>
                  <p className={styles.message}>
                    Nos ajude a melhorar esse jogo respondendo um breve questionário e aproveite para descobrir os outros
                    <span style={{ color: `${resultAvatar.backgroundColor}` }}>
                      humanos do amanhã
                    </span>
                  </p>
                  <button onClick={goToResearch} className={styles.cta}>Ok, vamos lá</button>
                  <button onClick={goToEnd} className={styles.endGame}>Encerrar o jogo</button>
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

import React, { useContext, useEffect, useRef } from 'react';
import SettingsContext from 'context/settingsContext';
import { Step } from 'types/types';

import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";

import {ReactComponent as GoBackWhite} from 'assets/icons/arrow-white.svg';

import facebook from 'assets/icons/Facebook.svg';
import twitter from 'assets/icons/Twitter.svg';
import whatsapp from 'assets/icons/whatsapp.svg';

import globalStyles from 'globals.module.scss';
import styles from './Menu.module.scss';

const buttonsAudio = require('assets/audios/botoes.mp3');

const backAudio = require('assets/audios/voltar.mp3');

type MenuProps = {
  text?: string,
  prevStep: Step,
  prevAction?: (() => void) | null
  blackIcon?: boolean,
  topText?: string,
}

const Menu: React.FC<MenuProps> = ({ text, prevStep, prevAction = null, blackIcon, topText }) => {
  const { setStep, setLoading, resultAvatar } = useContext(SettingsContext);

  const backAudioRef = useRef<HTMLAudioElement>(new Audio(backAudio.default));
  const buttonsAudioRef = useRef<HTMLAudioElement>(new Audio(buttonsAudio.default));

  useEffect(() => {
    if(backAudioRef.current){
      backAudioRef.current.load();
    }
  }, []);

  const goBack = () => {
    setLoading(false);
    backAudioRef.current.currentTime = 0.6;
    backAudioRef.current.play();
    if(prevAction){
      prevAction();
    } else {
      setStep(prevStep);
    }
  };
  
  const playAudio = () => {
    buttonsAudioRef.current.currentTime = 0.3;
    buttonsAudioRef.current.play();
  }

  return (
    <nav className={`${globalStyles.menu}`}>
      <button onClick={goBack}>
        <GoBackWhite
          title="Voltar"
          className={`${globalStyles.goback} ${styles.back} ${blackIcon ? styles.black : ''}`}
        />
      </button>
      {text ? (
        <p className={`${globalStyles.text} ${styles.counter} ${blackIcon ? styles.black : ''}`}>{text}</p>
      ) : (
        <div className={globalStyles.socialWrapper}>
          {(window.innerWidth > 738 && resultAvatar) && (
            <>
              <button className={globalStyles.singleIcon}>
                <FacebookShareButton
                  url={`${window.location.href}`}
                  quote={`'Descobri que #HumanodoAmanhã eu serei no futuro! Acesse o novo jogo do Museu do Amanhã e veja qual é o seu perfil em: jogohumano.museudoamanha.org.br'`}
                  hashtag={'#HumanodoAmanhã'}
                  onClick={playAudio}
                >
                  <img src={facebook} alt="Facebook" className={globalStyles.social} />
                </FacebookShareButton>
              </button>
              <button className={globalStyles.singleIcon}>
                <WhatsappShareButton
                  url={`${window.location.href}`}
                  title={`Descobri que #HumanodoAmanhã eu serei no futuro! Acesse o novo jogo do Museu do Amanhã e veja qual é o seu perfil em: jogohumano.museudoamanha.org.br`}
                  onClick={playAudio}
                >
                  <img src={whatsapp} alt="WhatsApp" className={globalStyles.social} />
                </WhatsappShareButton>
              </button>
              <button className={globalStyles.singleIcon}>
                <TwitterShareButton
                  title={`Descobri que #HumanodoAmanhã eu serei no futuro! Acesse o novo jogo do Museu do Amanhã e veja qual é o seu perfil em: jogohumano.museudoamanha.org.br`}
                  url={`${window.location.href}`}
                  hashtags={['#HumanodoAmanhã']}
                  onClick={playAudio}
                >
                  <img src={twitter} alt="Twitter" className={globalStyles.social} />
                </TwitterShareButton>
              </button>
            </>
          )}
        </div>
      )}
      {topText && <p className={globalStyles.topText}>{topText}</p>}
    </nav>
  );
}

export default Menu;
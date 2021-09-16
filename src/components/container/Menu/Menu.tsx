import React, { useContext,useEffect, useRef } from 'react';
import SettingsContext from 'context/settingsContext';
import { Step } from 'types/types';

import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";

import GoBackWhite from 'assets/icons/arrow-white.svg';
import GoBackBlack from 'assets/icons/arrow-black.svg';
import facebook from 'assets/icons/Facebook.svg';
import twitter from 'assets/icons/Twitter.svg';
import whatsapp from 'assets/icons/whatsapp.svg';

import globalStyles from 'globals.module.scss';

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
        <img src={blackIcon ? GoBackBlack : GoBackWhite} alt="Voltar" className={globalStyles.goback} />
      </button>
      {text ? (
        <p style={{ color: `${blackIcon ? '#0d0d0d' : '#E9E9E9'}` }} className={globalStyles.text}>{text}</p>
      ) : (
        <div className={globalStyles.socialWrapper}>
          {(window.innerWidth > 738 && resultAvatar) && (
            <>
              <button className={globalStyles.singleIcon}>
                <FacebookShareButton
                  url={`${window.location.href}`}
                  quote={`Meu humano do amanhã é ${resultAvatar.nome}! ${resultAvatar.descricao}`}
                  hashtag={'#humanodofuturo'}
                  onClick={playAudio}
                >
                  <img src={facebook} alt="Facebook" className={globalStyles.social} />
                </FacebookShareButton>
              </button>
              <button className={globalStyles.singleIcon}>
                <WhatsappShareButton
                  url={`${window.location.href}`}
                  title={`Meu humano do amanhã é ${resultAvatar.nome}`}
                  onClick={playAudio}
                >
                  <img src={whatsapp} alt="WhatsApp" className={globalStyles.social} />
                </WhatsappShareButton>
              </button>
              <button className={globalStyles.singleIcon}>
                <TwitterShareButton
                  title={`Meu humano do amanhã é ${resultAvatar.nome}!`}
                  url={`${window.location.href}`}
                  hashtags={['#humanodofuturo']}
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
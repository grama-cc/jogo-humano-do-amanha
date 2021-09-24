import React, { /* useState */ } from 'react';

import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";

import facebook from 'assets/icons/Facebook.svg';
import twitter from 'assets/icons/Twitter.svg';
import whatsapp from 'assets/icons/whatsapp.svg';

import styles from './ResultsShare.module.scss';

type ResultShareProps = {
  resultTitle: string,
  resultDescription: string,
  color: string,
}

const ResultShare: React.FC<ResultShareProps> = ({ resultTitle, resultDescription, color }) => {
  // const [shareButtons, setShareButtons] = useState<boolean>(false);

  // const showButtons = () => {
  //   setShareButtons(true)
  // }

  return (
    <>
      {window.innerWidth < 770 ? (
        <div className={styles.share}>
          <p className={styles.text}>Compartilhe</p>
          <div className={styles.icons}>
              <div style={{ backgroundColor: `${color}` }} className={styles.singleIcon}>
                <FacebookShareButton
                  url={`${window.location.href}`}
                  quote={`Descobri que #HumanodoAmanhã eu serei no futuro! Acesse o novo jogo do Museu do Amanhã e veja qual é o seu perfil em: `}
                  hashtag={'#HumanodoAmanhã'}
                >
                  <img src={facebook} alt="Facebook" />
                </FacebookShareButton>
              </div>
              <div style={{ backgroundColor: `${color}` }} className={styles.singleIcon}>
                <WhatsappShareButton
                  url={`${window.location.href}`}
                  title={`Descobri que #HumanodoAmanhã eu serei no futuro! Acesse o novo jogo do Museu do Amanhã e veja qual é o seu perfil em: `}
                >
                  <img src={whatsapp} alt="WhatsApp" />
                </WhatsappShareButton>
              </div>
              <div style={{ backgroundColor: `${color}` }} className={styles.singleIcon}>
                <TwitterShareButton
                  title={`Descobri que #HumanodoAmanhã eu serei no futuro! Acesse o novo jogo do Museu do Amanhã e veja qual é o seu perfil em: `}
                  url={`${window.location.href}`}
                  hashtags={['#HumanodoAmanhã']}
                >
                  <img src={twitter} alt="Twitter" />
                </TwitterShareButton>
              </div>
          </div>
        </div>
      ) : (
        <div className={styles.share}></div>
      )}
    </>
  )
}

export default ResultShare;
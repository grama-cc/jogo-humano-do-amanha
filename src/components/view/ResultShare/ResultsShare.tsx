import React, { /* useState */ } from 'react';

import { FacebookShareButton, TwitterShareButton } from "react-share";

import facebook from 'assets/icons/Facebook.svg';
import twitter from 'assets/icons/Twitter.svg';

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
      {window.innerWidth < 640 ? (
        <div className={styles.share}>
          <p className={styles.text}>Compartilhe</p>
          <div className={styles.icons}>
              <div style={{ backgroundColor: `${color}` }} className={styles.singleIcon}>
                <FacebookShareButton
                  url={'https://develop.d2r4xr1ll165o7.amplifyapp.com/'}
                  quote={`Meu humano do amanhã é ${resultTitle}! ${resultDescription}`}
                  hashtag={'#humanodofuturo'}
                >
                  <img src={facebook} alt="Facebook" />
                </FacebookShareButton>
              </div>
              <div style={{ backgroundColor: `${color}` }} className={styles.singleIcon}>
                <TwitterShareButton
                  title={`Meu humano do amanhã é ${resultTitle}!`}
                  url={'https://develop.d2r4xr1ll165o7.amplifyapp.com/'}
                  hashtags={['#humanodofuturo']}
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
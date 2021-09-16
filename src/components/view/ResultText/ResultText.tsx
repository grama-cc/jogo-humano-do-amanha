import SettingsContext from 'context/settingsContext';
import React, { useContext } from 'react';
import Video from '../Video/Video';

import styles from './ResultText.module.scss';

type ResultTextProps = {
  title: string;
  text: string;
  revealResultMode?: boolean; 
  video?: string;
}

const ResultText: React.FC<ResultTextProps> = ({ title, text, revealResultMode, video }) => {
  const { libras } = useContext(SettingsContext);

  return (
    <>
      <h1 className={`${styles.title} ${revealResultMode && styles.revealTitle}`}><span>{title}</span></h1>
      {libras && !!video &&
        <div className={styles.librasWrapperMobile}>
          <Video source={video}/>
        </div>}
      <p className={`${styles.text} ${revealResultMode && styles.revealText}`}>{text}</p>
    </>
  );
}

export default ResultText;
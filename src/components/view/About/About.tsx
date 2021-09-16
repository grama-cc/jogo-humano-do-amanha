import React, { useContext } from 'react';
import SettingsContext from 'context/settingsContext';

import styles from './About.module.scss';

type AboutProps = {
  text: string;
  title: string,
};

const About: React.FC<AboutProps> = ({ text, title }) => {
  const { setShowAboutPopUp } = useContext(SettingsContext);

  const closePopUp = () => {
    setShowAboutPopUp(false);
  };

  return (
    <div className={styles.aboutWrapper}>
      <div className={styles.aboutBox}>
        <div className={styles.header}>
          <p className={styles.title}>{title}</p>
          <button className={styles.close} onClick={closePopUp}>Fechar</button>
        </div>
        <p className={styles.text}>
          {text}
        </p>
      </div>
    </div>
  );
}

export default About;
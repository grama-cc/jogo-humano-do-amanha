import React, { useContext } from 'react';
import SettingsContext from 'context/settingsContext';

import styles from './About.module.scss';

type AboutProps = {
  text: string;
};

const About: React.FC<AboutProps> = ({ text }) => {
  const { setShowAboutPopUp } = useContext(SettingsContext);

  const closePopUp = () => {
    setShowAboutPopUp(false);
  };

  return (
    <div className={styles.aboutWrapper}>
      <div className={styles.aboutBox}>
        {text}
        <button onClick={closePopUp}>Fechar</button>
      </div>
    </div>
  );
}

export default About;
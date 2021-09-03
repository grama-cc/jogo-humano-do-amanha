import React, { useContext } from 'react';
import SettingsContext from 'context/settingsContext';

import styles from './Circle.module.scss';

const Circle: React.FC = ({ children }) => {
  const { step, loading } = useContext(SettingsContext);

  return (
    <>
    {loading ? (
      <div className={styles.loaderWrapper}>
        <div className={styles.loader}>Carregando...</div>
        <p className={styles.loaderInner}>{children}</p>
      </div>
    ) : (
      <div 
        className={`${styles.circleWrapper} ${step === 'home' ? styles.blackBorder : styles.whiteBorder}`}
      >
        {children}
      </div>
    )}
    </>
  );
}

export default Circle;
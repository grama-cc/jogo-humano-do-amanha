import React from 'react';

import styles from './Circle.module.scss';

const Circle: React.FC = ({ children }) => {
  return (
    <div className={`${styles.circleWrapper} ${styles.blackBorder}`}>
      {children}
    </div>
  );
}

export default Circle;
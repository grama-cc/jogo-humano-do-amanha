import React, { useContext } from 'react';
import SettingsContext from 'context/settingsContext';
import Video from '../Video/Video';

import globalStyles from 'globals.module.scss'

type IntroProps = {
  titles: string[];
  video?: string | undefined;
}

const Intro: React.FC<IntroProps> = ({ titles, video }) => {
  const { libras } = useContext(SettingsContext);
  return (
    <div className={globalStyles.content}>
      {libras ? (
        <Video source={video} />
      ) : (
        <p>{titles.map(item => (
          <li key={item}>{item}</li>
        ))}</p>
      )}
    </div>
  );
}

export default Intro;
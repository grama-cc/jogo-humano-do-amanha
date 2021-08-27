import React, { useContext } from 'react';
import { WelcomeContent } from 'types/types';
import SettingsContext from 'context/settingsContext';
import Video from '../Video/Video';

type IntroProps = {
  titles: string[];
  video?: string | undefined;
}

const Intro: React.FC<IntroProps> = ({ titles, video }) => {
  const { libras } = useContext(SettingsContext);
  return (
    <>
      {titles.map((item, index) => (
        <h1 key={item} id={`${index}`}>
          {item}
        </h1>
      ))}
      {libras && (
        <Video source={video} />
      )}
    </>
  );
}

export default Intro;
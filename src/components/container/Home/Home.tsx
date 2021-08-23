import React, { useContext } from 'react';
import SettingsContext from 'context/settingsContext';

const Home: React.FC = () => {

  const settingsContext = useContext(SettingsContext);

  console.log(settingsContext);

  return <div />;
}

export default Home;
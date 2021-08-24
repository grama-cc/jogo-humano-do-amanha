import React, { useContext } from 'react';
import SettingsContext from 'context/settingsContext';
import Intro from 'components/view/Intro/Intro';
import IntroSidebar from 'components/view/IntroSidebar/IntroSidebar';

const MOCK = [
  "Você já parou para pensar que tipo de humano será no futuro?",
  "Você gostaria de viajar para Marte?"
]

const Home: React.FC = () => {

  const settingsContext = useContext(SettingsContext);

  console.log(settingsContext);

  return (
    <>
      <Intro titles={MOCK} />
      <IntroSidebar aboutText="Sobre o jogo do amanhã" aboutLink="/" text="Jogo" ctaLabel="Jogar" />
    </>
  );
}

export default Home;
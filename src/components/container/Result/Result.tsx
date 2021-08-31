import React, { useContext, useState, useEffect } from 'react';
import { AllHumanTypes } from 'api';

import SettingsContext from 'context/settingsContext';

import Menu from 'components/container/Menu/Menu';
import LibrasToggle from '../LibrasToggle/LibrasToggle';
import ResultAvatar from 'components/view/ResultAvatar/ResultAvatar';
import ResultText from 'components/view/ResultText/ResultText';
import ResultShare from 'components/view/ResultShare/ResultsShare';
import ResultsList from 'components/view/ResultsList/ResultsList';

import image from '../../../assets/test.png';

import styles from 'globals.module.scss';

const MOCK_DATA = [
  {
    __v: 0,
    _id: '610d8ac6161e780015ce6152',
    character: 'COLETIVISMO',
    createdAt: '2021-08-06T19:17:26.897Z',
    descricao: 'O mundo lhe parece confuso demais. Você quer mudar isso, mas às vezes desiste para não entrar numa briga. O seu sonho de futuro é viver como antigamente. Mas não se engane. Sonhar com o mundo ideal é tão importante quanto estar acordado para agir no momento presente.',
    humor: 'FLEUMATICO',
    id: '610d8ac6161e780015ce6152',
    images: [image],
    locale: 'pt-BR',
    localizations: ['localization'],
    nome: 'NATUREBA SOSSEGADO',
    openness: 'CAUTELOSO',
    perfil: 'FECHADO',
    updatedAt: '2021-08-12T17:59:33.906Z',
  }
]

export default function Result() {
  const { step } = useContext(SettingsContext);
  const [allHumans, setAllHumans] = useState<any>();
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
		AllHumanTypes.getHumanTypes()
			.then((data) => {
				setAllHumans(data);
			})
			.catch((err) => {
				setIsError(true);
			});
		return () => {};
	}, []);

  return (
    <>
    {step === 'result' && (
      <main className={styles.container}>
        <Menu text={"Menu"} prevStep={'research'} />
        <div className={styles.content}>
          <ResultAvatar avatar={image} avatarName={'Resultado'} />
          <ResultsList results={MOCK_DATA} />
        </div>
        <div className={styles.sidebar}>
          <ResultText title="Título" text="Texto" />
          <ResultShare link="/" />
        </div>
        <LibrasToggle />
      </main>
    )}
    </>
  )
}

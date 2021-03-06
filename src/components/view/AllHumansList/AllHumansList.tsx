import React, { useContext } from 'react';
import { HumanType } from '../../../types/types';
import SettingsContext from '../../../context/settingsContext';

import styles from './AllHumansList.module.scss';

type AllHumansListProps = {
  results: HumanType[];
}

const AllHumansList: React.FC<AllHumansListProps> = ({ results }) => {
  const { setResultsListHuman } = useContext(SettingsContext);

  const chooseHuman = (human: HumanType) => {
    setResultsListHuman(human);
  }

  return (
    <ul className={styles.listWrapper}>
      <p className={styles.text}>Nos ajude a melhorar esse jogo respondendo um breve questionário e aproveite para descobrir os outros <span>Humanos do Amanhã</span>.</p>
      <div className={styles.items}>
        {results.map((item) => (
          <li key={item.id}>
            <button onClick={() => chooseHuman(item)}>
              {item.images ? (
                <div className={styles.imagesWrapper}>
                  <img src={item.images[2].url} alt={item.nome} className={styles.shadow} style={{ width: '100px' }}/>
                  <img src={item.images[0].url} alt={item.nome} className={styles.imageBg} style={{ width: '100px' }} />
                </div>
              ) : (
                <p className={styles.name}>{item.nome}</p>
              )}
            </button>
          </li>
        ))}
      </div>
    </ul>
  );
}

export default AllHumansList;
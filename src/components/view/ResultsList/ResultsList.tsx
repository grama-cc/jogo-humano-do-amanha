import React from 'react';
import { HumanType } from '../../../types/types';

import styles from './ResultsList.module.scss';

type ResultListProps = {
  results: HumanType[];
  color: string;
}

const ResultsList: React.FC<ResultListProps> = ({ results, color }) => {
  return (
    <ul className={styles.listWrapper} style={{ backgroundColor: `${color}`}}>
      <p className={styles.text}>Nos ajude a melhorar esse jogo respondendo um breve questionário e aproveite para descobrir os outros <span>Humanos do Amanhã</span>.</p>
      <div className={styles.items}>
        {results.map((item) => (
          <li key={item.id}>
            <button>
              {item.images ? (
                <div className={styles.imagesWrapper}>
                  <img src={item.images[2].url} alt={item.nome} className={styles.shadow} />
                  <img src={item.images[0].url} alt={item.nome} className={styles.imageBg} />
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

export default ResultsList;
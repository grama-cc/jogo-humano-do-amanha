import React, { useContext } from 'react';
import { HumanType } from '../../../types/types';
import SettingsContext from 'context/settingsContext';


type ResultListProps = {
  results: HumanType[];
}

const ResultsList: React.FC<ResultListProps> = ({ results }) => {
  const { setResultsListHuman } = useContext(SettingsContext);

  const chooseHuman = (human: HumanType) => {
    setResultsListHuman(human);
  }

  return (
    <ul>
      {results.map((item, index) => (
        <li key={item.id}>
          <button onClick={() => chooseHuman(item)}>
            {item.images[index] ? (
              <img src={item.images[index]} alt={item.nome} style={{ width: '180px', height: '200px'}} />
            ) : (
              <p>{item.nome}</p>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ResultsList;
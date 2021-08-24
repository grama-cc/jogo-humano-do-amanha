import React from 'react';
import { Result } from '../../../types/types'

type ResultListProps = {
  results: Result[];
}

const ResultsList: React.FC<ResultListProps> = ({ results }) => {
  return (
    <ul>
      {results.map((item) => (
        <li key={item.id}>
          <img src={item.avatar} alt={item.name} />
        </li>
      ))}
    </ul>
  );
}

export default ResultsList;
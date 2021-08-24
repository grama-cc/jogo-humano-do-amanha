import React, { useContext } from 'react';
import SettingsContext from 'context/settingsContext';

const LibrasToggle: React.FC = () => {
  const { libras, setLibras } = useContext(SettingsContext);

  const toggleLibras = () => {
    setLibras(!libras)
  }

  return (
      <button onClick={toggleLibras} data-testid="libras-toggle">{libras ? 'Texto' : 'Libras' }</button>
  );
}

export default LibrasToggle;
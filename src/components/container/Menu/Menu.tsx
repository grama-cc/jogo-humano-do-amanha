import React, { /* useContext */ } from 'react';
// import SettingsContext from 'context/settingsContext';
import LibrasToggle from '../LibrasToggle/LibrasToggle';

type MenuProps = {
  goBack?: () => void,
  text: string,
}

const Menu: React.FC<MenuProps> = ({ goBack, text }) => {
  return (
    <nav>
      <button onClick={goBack}>Voltar</button>
      <p>{text}</p>
      <LibrasToggle />
    </nav>
  );
}

export default Menu;
import React, { useContext } from 'react';
import SettingsContext from 'context/settingsContext';

type MenuProps = {
  goBack?: () => void,
  text: string,
}

const Menu: React.FC<MenuProps> = ({ goBack, text }) => {
  const { libras, setLibras } = useContext(SettingsContext);

  const toggleLibras = () => {
    setLibras(!libras)
  }

  return (
    <nav>
      <button onClick={goBack}>Voltar</button>
      <p>{text}</p>
      <button onClick={toggleLibras} data-testid="libras-toggle">{libras ? 'Texto' : 'Libras' }</button>
    </nav>
  );
}

export default Menu;
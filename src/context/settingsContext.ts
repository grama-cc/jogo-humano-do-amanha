
import { createContext } from 'react';

type settingsType = {
  language: string,
  setLanguage: (value: string) => void, 
  libras: boolean,
  setLibras: (value: boolean) => void, 
}

export const defaultSettings: settingsType = {
  language: 'pt-br',
  setLanguage: () => {},
  libras: false,
  setLibras: () => {},
};

const SettingsContext = createContext(defaultSettings);


export default SettingsContext;

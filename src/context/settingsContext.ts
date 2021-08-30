
import { createContext } from 'react';

type settingsType = {
  language: string,
  setLanguage: (value: string) => void, 
  libras: boolean,
  setLibras: (value: boolean) => void,
  step: number,
  setStep: (value: number) => void,
}

export const defaultSettings: settingsType = {
  language: 'pt-br',
  setLanguage: () => {},
  libras: false,
  setLibras: () => {},
  step: 0,
  setStep: () => {},
};

const SettingsContext = createContext(defaultSettings);


export default SettingsContext;

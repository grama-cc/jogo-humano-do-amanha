import { createContext } from 'react';

type settingsType = {
  language: string,
  libras: boolean
}

export const defaultSettings: settingsType = {
  language: 'pt-br',
  libras: false
};

const SettingsContext = createContext(defaultSettings);

export default SettingsContext;

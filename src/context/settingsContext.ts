import { createContext } from 'react';
import { Step, HumanType, HumanId } from 'types/types';

type settingsType = {
  language: string,
  setLanguage: (value: string) => void, 
  libras: boolean,
  setLibras: (value: boolean) => void,
  step: Step,
  setStep: (value: Step) => void,
  allHumanTypes: HumanType[] | undefined[],
  setAllHumanTypes: (value: HumanType[] | undefined[]) => void,
  humanId: HumanId | string,
  setHumanId: (value: HumanId | string) => void,
}

export const defaultSettings: settingsType = {
  language: 'pt-br',
  setLanguage: () => {},
  libras: false,
  setLibras: () => {},
  step: 'home',
  setStep: () => {},
  allHumanTypes: [],
  setAllHumanTypes: () => {},
  humanId: '',
  setHumanId: () => {},
};

const SettingsContext = createContext(defaultSettings);


export default SettingsContext;

import { createContext } from 'react';
import { Step, HumanType, HumanId } from 'types/types';

export const defaultHuman = {
  __v: 0,
  _id: '',
  character: '',
  createdAt: '',
  descricao: '',
  humor: '',
  id: '',
  images: [''],
  locale: '',
  localizations: [''],
  nome: '',
  openness: '',
  perfil: '',
  updatedAt: '',
}

type settingsType = {
  language: string,
  setLanguage: (value: string) => void, 
  libras: boolean,
  setLibras: (value: boolean) => void,
  step: Step,
  setStep: (value: Step) => void,
  allHumanTypes: HumanType[],
  setAllHumanTypes: (value: HumanType[]) => void,
  humanId: HumanId | string,
  setHumanId: (value: HumanId | string) => void,
  showAboutPopUp: boolean,
  setShowAboutPopUp: (value: boolean) => void,
  resultAvatar: HumanType[],
  setResultAvatar: (value: HumanType[]) => void,
  resultsListHuman: HumanType,
  setResultsListHuman: (value: HumanType) => void,
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
  showAboutPopUp: false,
  setShowAboutPopUp: () => {},
  resultAvatar: [],
  setResultAvatar: () => {},
  resultsListHuman: defaultHuman,
  setResultsListHuman: () => {},
};

const SettingsContext = createContext(defaultSettings);


export default SettingsContext;

import { createContext } from 'react';
import { Step, HumanType, HumanId } from 'types/types';

export const defaultHuman = {
  backgroundColor: '',
  __v: 0,
  _id: '',
  character: '',
  createdAt: '',
  descricao: '',
  humor: '',
  id: '',
  images: [{
    alternativeText: '',
    caption: '',
    createdAt: '',
    ext: '',
    formats: {},
    hash: '',
    height: 0,
    id: '',
    mime: '',
    name: '',
    related: [''],
    size: 0,
    updatedAt: '',
    url: '',
    width: 0,
    __v: 0,
    _id: '',
  }],
  locale: '',
  localizations: [''],
  nome: '',
  openness: '',
  perfil: '',
  updatedAt: '',
  libras_description: {
    url: ''
  }
}

type settingsType = {
  language: string,
  setLanguage: (value: string) => void, 
  libras: boolean,
  setLibras: (value: boolean) => void,
  step: Step,
  setStep: (value: Step) => void,
  loading: boolean,
  setLoading: (value: boolean) => void,
  transitionStep: boolean,
  settransitionStep: (value: boolean) => void,
  allHumanTypes: HumanType[],
  setAllHumanTypes: (value: HumanType[]) => void,
  humanId: HumanId | string,
  setHumanId: (value: HumanId | string) => void,
  showAboutPopUp: boolean,
  setShowAboutPopUp: (value: boolean) => void,
  userId: string | null,
  setUserId: (value: string) => void,
  resultAvatar: HumanType | null,
  setResultAvatar: (value: HumanType) => void,
  resultsListHuman: HumanType,
  setResultsListHuman: (value: HumanType) => void,
  needIOSPermission: boolean,
  setNeedIOSSoundPermission: (value: boolean) => void,
  iosSoundPermission: boolean,
  setIosSoundPermission: (value: boolean) => void,
}

export const defaultSettings: settingsType = {
  language: 'pt-br',
  setLanguage: () => {},
  libras: false,
  setLibras: () => {},
  step: 'home',
  setStep: () => {},
  loading: false,
  setLoading: () => {},
  transitionStep: false,
  settransitionStep: () => {},
  allHumanTypes: [],
  setAllHumanTypes: () => {},
  humanId: '',
  setHumanId: () => {},
  showAboutPopUp: false,
  setShowAboutPopUp: () => {},
  userId: null,
  setUserId: () => {},
  resultAvatar: defaultHuman,
  setResultAvatar: () => {},
  resultsListHuman: defaultHuman,
  setResultsListHuman: () => {},
  needIOSPermission: false,
  setNeedIOSSoundPermission: () => {},
  iosSoundPermission: false,
  setIosSoundPermission: () => {},
};

const SettingsContext = createContext(defaultSettings);


export default SettingsContext;

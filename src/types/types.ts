// Steps
export type Step = 'home' | 'countdown' | 'quiz' | 'research' | 'preresult' | 'result' | 'allhumans'

// Libras
export type LibrasVideo = {
  alternativeText: string,
  caption: string,
  createdAt: string,
  ext: string,
  hash: string,
  id: string,
  mime: string,
  name: string,
  provider: string,
  related: string[],
  size: number,
  updatedAt: string,
  url: string,
  width?: number | string,
  __v: number,
  _id: string,
}

// Welcome
export type WelcomeContent = {
  createdAt: string,
  id: string,
  pagina_bemvindo_libras_video: LibrasVideo,
  pagina_carregando_contador_libras_video: LibrasVideo,
  pagina_inicial_libras_video: LibrasVideo,
  pagina_jogar_libras_video: LibrasVideo[],
  published_at: string,
  updatedAt: string,
  __v: number,
  _id: string,
}

// Screen Saver
type CountdownContent = {
  _id: string,
  title: string,
  option_yes: string,
  subtitle: string,
  option_maybe: string,
  option_no: string,
  __v: number,
  id: string
}

type InitScreenSaver = {
  _id: string,
  title: string,
  init_question: string,
  init_button: string,
  directions: string,
  wellcome: CountdownContent
  __v: number,
  id: string,
}

export type ScreenSaverContent = {
  _id: string,
  published_at: string,
  init_screen_saver: InitScreenSaver,
  createdAt: string,
  updatedAt: string,
  __v: number,
  id: string,
}

// About
export type AboutText = {
  createdAt: string,
  description: string,
  id: string,
  published_at: string,
  title: string,
  updatedAt: string,
  __v: number,
  _id: string,
}

// Quiz
export type Option = {
  value: 'SIM' | 'NAO' | 'TALVEZ',
  label: 'Sim' | 'Não' | 'Talvez'
}


export type QuestionType = {
  id: number;
  texto: string;
  resposta: string;
  alternativa: string;
  libras: string;
  text: string;
  texto_libras?:{
    url: string
  },
}

export type AvatarImage = {
  alternativeText: string;
  caption: string;
  createdAt: string;
  ext: string;
  formats: Object;
  hash: string;
  height: number;
  id: string;
  mime: string;
  name: string;
  related: string[];
  size: number;
  updatedAt: string;
  url: string;
  width: number;
  __v: number;
  _id: string;
}

export type HumanType = {
  backgroundColor: string,
  __v: number,
  _id: string,
  character: string,
  createdAt: string,
  descricao: string,
  humor?: string,
  id: string,
  images: AvatarImage[],
  locale: string,
  localizations: string[],
  nome: string,
  openness: string,
  perfil?: string,
  updatedAt: string,
}

export type Result = HumanType[]

export type HumanId = {
  tipo_de_humano: string,
}

export type Answer = {
  resposta: string,
  _id: string,
  pergunta: number,
  alternativa: string,
  __v: number,
  id: string,
}

export type AnswersList = {
  localizations: string[],
  _id: string,
  locale: string,
  usuario_anonimo: string,
  respostas: Answer[],
  createdAt: string,
  updatedAt: string,
  __v: number,
  tipo_de_humano: HumanType,
  id: string,
}

//Research

export type ProfileOption = {
  id: string,
  order: number,
  text: string,
  value: string,
  __v: number,
  __id: string,
}

export type ProfileQuestion = {
  api_field: string,
  id: string,
  options: ProfileOption[],
  order: number,
  required: boolean,
  text: string,
  texto_libras?:{
    url: string
  },
  libras: string,
  __v: number,
  _id: string,
  answer: string,
  answerText: string,
  searchable?: boolean,
  resposta: string,
  texto: string
}

export type ProfileAnswer = {
  genero: string,
  outro_genero?: string,
	onde_mora: string,
	avaliacao_jogo:  number,
	melhoria: string,
	dispositivo?: string,
	resultado_identificacao: string,
	jogo_sensibilizou: string,
	recomendar: number,
	faixa_etaria: string,
	personalizado: string,
	avaliacao_comentario: string,
	personalizado_text: string,
  personalizado_options?: string,
	dispositivo_text?: string,
	melhoria_text?: string,
	reflexao_texto?: string,
	locale?: "pt-BR",
	resposta: string,
}


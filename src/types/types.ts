// Libras
export type LibrasVideo = {
  alternativeText: string,
  caption: string,
  createdAt: string,
  ext: string,
  hash: string,
  height?: number | string,
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

// Quiz
export type Option = "yes" | "no" | "maybe"

export type QuestionType = {
  id: number;
  title: string;
  options: Option[];
  answer?: Option;
}

export type Character = {
  __v: number,
  _id: string,
  character: string,
  createdAt: string,
  descricao: string,
  humor?: string,
  id: string,
  images: string[],
  locale: string,
  localizations: string[],
  nome: string,
  openness: string,
  perfil?: string,
  updatedAt: string,
}

export type Result = Character[]

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
  tipo_de_humano: Character,
  id: string,
}


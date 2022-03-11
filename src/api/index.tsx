import axios, { AxiosResponse } from 'axios';

import { WelcomeContent, AboutText, HumanId, AnswersList, HumanType, ScreenSaverContent, ProfileAnswer } from 'types/types';

const instance = axios.create({
	baseURL: 'https://jogo-humano-do-amanha-api.herokuapp.com/',
	timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string) => instance.get(url).then(responseBody),
	post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
	put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
};

export const GetScreenSaver = {
	getScreenSaver: (): Promise<ScreenSaverContent> => requests.get('screen-saver'),
};

export const Welcome = {
	getWelcome: (): Promise<WelcomeContent> => requests.get('bemvindo'),
};

export const GetAbout = {
	getAbout: (): Promise<AboutText> => requests.get('about'),
};

export const GetHumanType = {
	getHumanType: (openness: string, character: string): Promise<HumanType[]> => requests.get(`tipo-de-humanos/?openness=${openness}&character=${character}`),
};

export const QuizQuestions = {
	getQuestion: (
		pergunta:number,
		resposta: string|null = null,
		id: string|null = null,
		alternativa: string|null = null
	) => requests.get(`/quizz/?pergunta=${pergunta}&resposta=${resposta}&id=${id}&alternativa=${alternativa}`),
};

export const Profile = {
	getQuestion: () => requests.get(`/profile-question/`),
	postAnswers: (profileAnswer: ProfileAnswer) => requests.post(`/perfils/`, profileAnswer)
};

export const GetResult = {
	getResult: (id: string): Promise<any> => requests.get(`result/?id=${id}`),
};

export const AllHumanTypes = {
	getHumanTypes: (): Promise<HumanType[]> => requests.get('tipo-de-humanos'),
};

export const Answers = {
	putAnswers: (id: string, data: HumanId): Promise<AnswersList> => requests.put(`${id}`, data),
};

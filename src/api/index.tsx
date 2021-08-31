import axios, { AxiosResponse } from 'axios';
import { WelcomeContent, Result, HumanId, AnswersList, HumanType } from 'types/types';

const instance = axios.create({
	baseURL: 'http://jogo-humano-do-amanha-api.herokuapp.com/',
	timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string) => instance.get(url).then(responseBody),
	post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
	put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
};

export const Welcome = {
	getWelcome: (): Promise<WelcomeContent> => requests.get('bemvindo'),
};

export const GetHumanType = {
	getHumanType: (openness: string, character: string): Promise<HumanType[]> => requests.get(`tipo-de-humanos/?openness=${openness}&character=${character}`),
};

export const AllHumanTypes = {
	getHumanTypes: (): Promise<HumanType[]> => requests.get('tipo-de-humanos'),
};

export const Answers = {
	putAnswers: (id: string, data: HumanId): Promise<AnswersList> => requests.put(`${id}`, data),
};

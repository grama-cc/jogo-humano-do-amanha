import axios, { AxiosResponse } from 'axios';
import { WelcomeContent, Result, HumanId, AnswersList } from 'types/types';

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

export const HumanType = {
	getHumanType: (openness: string, character: string): Promise<Result> => requests.get(`?openness=${openness}&character=${character}`),
};

export const Answers = {
	putAnswers: (id: string, data: HumanId): Promise<AnswersList> => requests.put(`${id}`, data),
};
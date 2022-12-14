import { ICommonNewsResponse } from './news.model';

export type GetNewsCallback<T> = (data: T) => void;
export type CommonNewsCallback = (data: ICommonNewsResponse) => void;

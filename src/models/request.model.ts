import { IRequestOptions } from './options.model';

export interface IRequest {
    endpoint: string;
    options: IRequestOptions;
}

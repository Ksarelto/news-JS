import { IGetNewsCallback } from '../models/callback.model';
import { IAllNewsResponse, ISourcesNewsResponse } from '../models/news.model';
import { IRequestOptions } from '../models/options.model';
import { IRequest } from '../models/request.model';

class Loader {
    constructor(private baseLink: string, private options: IRequestOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: IRequest,
        callback: (data: any) => void = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: IRequestOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(
        method: string,
        endpoint: string,
        callback: IGetNewsCallback<IAllNewsResponse | ISourcesNewsResponse>,
        options: IRequestOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
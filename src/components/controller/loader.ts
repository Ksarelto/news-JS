import { ErrorMessage } from 'utils/messages';
import { RequestMethod } from 'enums/request-methods.enum';
import { ICommonNewsResponse } from 'models/news.model';
import { IRequestOptions } from 'models/options.model';
import { IRequest } from 'models/request.model';

enum HttpStatus {
    UNAUTHORISED = 401,
    NOTFOUND = 404,
}

class Loader {
    constructor(private baseLink: string, private options: IRequestOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint = '', options = {} }: Partial<IRequest>,
        callback: (data: ICommonNewsResponse) => void = (): void => {
            console.error(ErrorMessage.NO_CALLBACK);
        }
    ): void {
        this.load(RequestMethod.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === HttpStatus.UNAUTHORISED || res.status === HttpStatus.NOTFOUND)
                console.log(ErrorMessage.SERVER_ERROR(res.status, res.statusText));
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
        callback: (data: ICommonNewsResponse) => void,
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

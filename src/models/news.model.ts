import { IFullArticleResponse, ISourceArticleResponse } from './article.model';

export interface IAllNewsResponse {
    status: string;
    articles: IFullArticleResponse[];
    totalResults: number;
}

export interface ISourcesNewsResponse {
    status: string;
    sources: ISourceArticleResponse[];
}

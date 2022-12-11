import { IAllNewsResponse, ISourcesNewsResponse } from 'models/news.model';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private readonly news: News;

    private readonly sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: IAllNewsResponse): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: ISourcesNewsResponse): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;

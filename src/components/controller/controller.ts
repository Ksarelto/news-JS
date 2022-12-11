import { UrlMap } from '../../enums/urlMap.enum';
import { IGetNewsCallback } from '../../models/callback.model';
import { IAllNewsResponse, ISourcesNewsResponse } from '../../models/news.model';
import AppLoader from './appLoader';

const SOURCE_ITEM_CLASS_NAME = 'source__item';

enum SourceAttribute {
    DATASOURCE = 'data-source',
    DATASOURCE_ID = 'data-source-id',
}

class AppController extends AppLoader {
    public getSources(callback: IGetNewsCallback<ISourcesNewsResponse>): void {
        super.getResp(
            {
                endpoint: UrlMap.SOURCES,
            },
            callback
        );
    }

    public getNews(e: Event, callback: IGetNewsCallback<IAllNewsResponse>): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLDivElement;

        while (target !== newsContainer) {
            if (target.classList.contains(SOURCE_ITEM_CLASS_NAME)) {
                const sourceId = target.getAttribute(SourceAttribute.DATASOURCE_ID) || '';

                if (newsContainer.getAttribute(SourceAttribute.DATASOURCE) !== sourceId) {
                    newsContainer.setAttribute(SourceAttribute.DATASOURCE, sourceId);
                    super.getResp(
                        {
                            endpoint: UrlMap.EVERY,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }

            if (target.parentNode) {
                target = target.parentNode as HTMLElement;
            }
        }
    }
}

export default AppController;

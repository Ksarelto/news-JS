import { GetNewsCallback } from 'models/callback.model';
import { IAllNewsResponse, ISourcesNewsResponse } from 'models/news.model';
import { newsApiMap } from 'utils/apiMap';
import AppLoader from './appLoader';

const SOURCE_ITEM_CLASS_NAME = 'source__item';

enum SourceAttribute {
    DATA_SOURCE = 'data-source',
    DATA_SOURCE_ID = 'data-source-id',
}

class AppController extends AppLoader {
    public getSources(callback: GetNewsCallback<ISourcesNewsResponse>): void {
        super.getResp(
            {
                endpoint: newsApiMap.endpoints.sources,
            },
            callback
        );
    }

    public getNews(e: Event, callback: GetNewsCallback<IAllNewsResponse>): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLDivElement;

        while (target !== newsContainer) {
            if (target.classList.contains(SOURCE_ITEM_CLASS_NAME)) {
                const sourceId = target.getAttribute(SourceAttribute.DATA_SOURCE_ID) || '';

                if (newsContainer.getAttribute(SourceAttribute.DATA_SOURCE) !== sourceId) {
                    newsContainer.setAttribute(SourceAttribute.DATA_SOURCE, sourceId);
                    super.getResp(
                        {
                            endpoint: newsApiMap.endpoints.every,
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

import { getHtmlElement } from 'utils/getElements';
import { IFullArticleResponse } from 'models/article.model';
import './news.css';

const NEWS_ITEM_TEMPLATE_ID = '#newsItemTemp';
const NEWS_ITEM_ALTERNATIVE_CLASS_NAME = 'alt';
const PHOTO_PLACEHOLDER_URL = 'img/news_placeholder.jpg';

enum ArticleValuesClassNames {
    NEWS = '.news',
    ITEM = '.news__item',
    PHOTO = '.news__meta-photo',
    AUTHOR = '.news__meta-author',
    DATE = '.news__meta-date',
    TITLE = '.news__description-title',
    SOURCE = '.news__description-source',
    CONTENT = '.news__description-content',
    LINK = '.news__read-more a',
}

class News {
    draw(data: IFullArticleResponse[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector(NEWS_ITEM_TEMPLATE_ID) as HTMLTemplateElement;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLDivElement;

            if (idx % 2) {
                newsClone.querySelector(ArticleValuesClassNames.ITEM)?.classList.add(NEWS_ITEM_ALTERNATIVE_CLASS_NAME);
            }

            getHtmlElement(newsClone, ArticleValuesClassNames.PHOTO).style.backgroundImage = `url(${
                item.urlToImage || PHOTO_PLACEHOLDER_URL
            })`;

            getHtmlElement(newsClone, ArticleValuesClassNames.AUTHOR).textContent = item.author || item.source.name;
            getHtmlElement(newsClone, ArticleValuesClassNames.DATE).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            getHtmlElement(newsClone, ArticleValuesClassNames.TITLE).textContent = item.title;
            getHtmlElement(newsClone, ArticleValuesClassNames.SOURCE).textContent = item.source.name;
            getHtmlElement(newsClone, ArticleValuesClassNames.CONTENT).textContent = item.description;
            getHtmlElement(newsClone, ArticleValuesClassNames.LINK).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsBlock = document.querySelector(ArticleValuesClassNames.NEWS) as HTMLDivElement;

        if (newsBlock) {
            newsBlock.innerHTML = '';
            newsBlock.appendChild(fragment);
        }
    }
}

export default News;

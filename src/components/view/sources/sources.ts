import { getHtmlElement } from '../../../utils/shared';
import { ISourceArticleResponse } from './../../models/article.model';
import './sources.css';

const SOURE_ITEM_TEMPLATE_ID = '#sourceItemTemp';
const SOURCE_ITEM_ID_ATTR = 'data-source-id';

enum SourceValuesClassNames {
    SOURCES = '.sources',
    NAME = '.source__item-name',
    ITEM = '.source__item',
}

class Sources {
    draw(data: ISourceArticleResponse[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector(SOURE_ITEM_TEMPLATE_ID) as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLDivElement;

            getHtmlElement(sourceClone, SourceValuesClassNames.NAME).textContent = item.name;
            getHtmlElement(sourceClone, SourceValuesClassNames.ITEM).setAttribute(SOURCE_ITEM_ID_ATTR, item.id);

            fragment.append(sourceClone);
        });

        document.querySelector(SourceValuesClassNames.SOURCES)?.append(fragment);
    }
}

export default Sources;

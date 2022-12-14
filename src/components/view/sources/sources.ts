import { getHtmlElement } from 'utils/getElements';
import { ISourceArticleResponse } from 'models/article.model';
import './sources.css';

const SOURCE_ITEM_TEMPLATE_ID = '#sourceItemTemp';
const SOURCE_ITEM_DATA_ATTR = 'data-source-id';

enum SourceValuesClassNames {
    SOURCES = '.sources',
    NAME = '.source__item-name',
    ITEM = '.source__item',
}

class Sources {
    draw(data: ISourceArticleResponse[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector(SOURCE_ITEM_TEMPLATE_ID) as HTMLTemplateElement;

        data.forEach(({ name, id }) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLDivElement;

            getHtmlElement(sourceClone, SourceValuesClassNames.NAME).textContent = name;
            getHtmlElement(sourceClone, SourceValuesClassNames.ITEM).setAttribute(SOURCE_ITEM_DATA_ATTR, id);

            fragment.append(sourceClone);
        });

        document.querySelector(SourceValuesClassNames.SOURCES)?.append(fragment);
    }
}

export default Sources;

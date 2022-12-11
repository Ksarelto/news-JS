import AppController from '../controller/controller';
import { IAllNewsResponse, ISourcesNewsResponse } from 'models/news.model';
import { AppView } from '../view/appView';

const SOURCE_BLOCK_CLASS_NAME = '.sources';

class App {
    private controller: AppController;

    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourceBlock = document?.querySelector(SOURCE_BLOCK_CLASS_NAME);

        if (sourceBlock) {
            sourceBlock.addEventListener('click', (e: Event): void =>
                this.controller.getNews(e, (data: IAllNewsResponse) => this.view.drawNews(data))
            );

            this.controller.getSources((data: ISourcesNewsResponse) => this.view.drawSources(data));
        }
    }
}

export default App;

import { UrlMap } from '../enums/urlMap.enum';
import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super(UrlMap.BASE_URL, {
            apiKey: 'e60b5635d25644f9bd31ee59009be1ac',
        });
    }
}

export default AppLoader;

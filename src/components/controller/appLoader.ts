import { ENV_VAR } from 'utils/environment';
import { UrlMap } from 'enums/urlMap.enum';
import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super(UrlMap.BASE_URL, {
            apiKey: ENV_VAR.API_KEY || '',
        });
    }
}

export default AppLoader;

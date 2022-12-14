import { ENV_VAR } from 'utils/environment';
import Loader from './loader';
import { newsApiMap } from '../../utils/apiMap';

class AppLoader extends Loader {
    constructor() {
        super(newsApiMap.baseUrl, {
            apiKey: ENV_VAR.API_KEY || '',
        });
    }
}

export default AppLoader;

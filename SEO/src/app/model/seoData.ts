
import{ SeoCatList } from './seoCatList';
import{ SeoWebsiteList } from './seoWebsiteList';
import{SeoHeader} from './seoHeader';
import { Tasks } from './tasks';

export interface SeoData {
    ProductHeader:Tasks,
    product:SeoHeader,
    WebsiteUrlList:Array<SeoWebsiteList>,
    CategoryList:Array<SeoCatList>,   
}
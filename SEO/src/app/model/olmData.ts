import { Tasks } from "./tasks";
import { OlmHeader } from "./olmHeader";
import { OlmCatList } from "./olmCatList";
import { OlmLanguageDetails } from "./olmLanguageDetails";
import { OlmPaymentDetails } from "./olmPaymentDetails";

export interface OlmData {
    ProductHeader:Tasks,
    YextLocationData:OlmHeader,
    YextCategoryList:Array<OlmCatList>,
    YextLanguageDetails:Array<OlmLanguageDetails>,   
    YextPaymentDetails:Array<OlmPaymentDetails>,
}
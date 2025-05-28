export class sms_model{
    id:number;
    nameModel:string;
    status:number;
}
export class content_sms_model{
    id:number;
    content_model:string;
    sms_model_id:string;
    langId:number;
}
import {shipping_address} from './shipping_address';
import {payment_addres} from './payment_addres';
export interface General{
    language:number,
    currency:number,
    email:String,
    phone:String,
    company_address:String,
    shipping_address:shipping_address[],
    payment_address:payment_addres[]
}
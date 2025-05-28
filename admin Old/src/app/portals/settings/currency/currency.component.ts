import { Component, OnInit } from '@angular/core';
import {currency} from '../../../core/models/currency';
import {CurrencyService} from '../../../core/services/currency/currency.service';
import { Subscription } from 'rxjs';
import { TransService } from 'src/app/core/services/translation/trans.service';
import { Language } from 'src/app/core/models/Language';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language/language.service';
import { currencyName } from 'src/app/core/models/currencyName';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  Trans:Subscription;
  trans:any;

  Currency:Subscription;
  currency:currency[];

  currencyName:currencyName[];
  
  Language:Language[];
  
  formCurrency: FormGroup;
  submitted = false;
  error = '';
  loading = false;
  titleForm:String="ADD CURRENCY";
  typeForm:Number=0;
  currencyId:number=-1;


  formCurrencyName: FormGroup;
  submittedName = false;
  errorName = '';
  loadingName = false;
  titleFormName:String="Add currency";
  typeFormName:Number=0;
  

  listArray:any=[{"symbol":"$","name":"US Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"USD","name_plural":"US dollars"},{"symbol":"CA$","name":"Canadian Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"CAD","name_plural":"Canadian dollars"},{"symbol":"€","name":"Euro","symbol_native":"€","decimal_digits":2,"rounding":0,"code":"EUR","name_plural":"euros"},{"symbol":"AED","name":"United Arab Emirates Dirham","symbol_native":"د.إ.‏","decimal_digits":2,"rounding":0,"code":"AED","name_plural":"UAE dirhams"},{"symbol":"Af","name":"Afghan Afghani","symbol_native":"؋","decimal_digits":0,"rounding":0,"code":"AFN","name_plural":"Afghan Afghanis"},{"symbol":"ALL","name":"Albanian Lek","symbol_native":"Lek","decimal_digits":0,"rounding":0,"code":"ALL","name_plural":"Albanian lekë"},{"symbol":"AMD","name":"Armenian Dram","symbol_native":"դր.","decimal_digits":0,"rounding":0,"code":"AMD","name_plural":"Armenian drams"},{"symbol":"AR$","name":"Argentine Peso","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"ARS","name_plural":"Argentine pesos"},{"symbol":"AU$","name":"Australian Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"AUD","name_plural":"Australian dollars"},{"symbol":"man.","name":"Azerbaijani Manat","symbol_native":"ман.","decimal_digits":2,"rounding":0,"code":"AZN","name_plural":"Azerbaijani manats"},{"symbol":"KM","name":"Bosnia-Herzegovina Convertible Mark","symbol_native":"KM","decimal_digits":2,"rounding":0,"code":"BAM","name_plural":"Bosnia-Herzegovina convertible marks"},{"symbol":"Tk","name":"Bangladeshi Taka","symbol_native":"৳","decimal_digits":2,"rounding":0,"code":"BDT","name_plural":"Bangladeshi takas"},{"symbol":"BGN","name":"Bulgarian Lev","symbol_native":"лв.","decimal_digits":2,"rounding":0,"code":"BGN","name_plural":"Bulgarian leva"},{"symbol":"BD","name":"Bahraini Dinar","symbol_native":"د.ب.‏","decimal_digits":3,"rounding":0,"code":"BHD","name_plural":"Bahraini dinars"},{"symbol":"FBu","name":"Burundian Franc","symbol_native":"FBu","decimal_digits":0,"rounding":0,"code":"BIF","name_plural":"Burundian francs"},{"symbol":"BN$","name":"Brunei Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"BND","name_plural":"Brunei dollars"},{"symbol":"Bs","name":"Bolivian Boliviano","symbol_native":"Bs","decimal_digits":2,"rounding":0,"code":"BOB","name_plural":"Bolivian bolivianos"},{"symbol":"R$","name":"Brazilian Real","symbol_native":"R$","decimal_digits":2,"rounding":0,"code":"BRL","name_plural":"Brazilian reals"},{"symbol":"BWP","name":"Botswanan Pula","symbol_native":"P","decimal_digits":2,"rounding":0,"code":"BWP","name_plural":"Botswanan pulas"},{"symbol":"Br","name":"Belarusian Ruble","symbol_native":"руб.","decimal_digits":2,"rounding":0,"code":"BYN","name_plural":"Belarusian rubles"},{"symbol":"BZ$","name":"Belize Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"BZD","name_plural":"Belize dollars"},{"symbol":"CDF","name":"Congolese Franc","symbol_native":"FrCD","decimal_digits":2,"rounding":0,"code":"CDF","name_plural":"Congolese francs"},{"symbol":"CHF","name":"Swiss Franc","symbol_native":"CHF","decimal_digits":2,"rounding":0.05,"code":"CHF","name_plural":"Swiss francs"},{"symbol":"CL$","name":"Chilean Peso","symbol_native":"$","decimal_digits":0,"rounding":0,"code":"CLP","name_plural":"Chilean pesos"},{"symbol":"CN¥","name":"Chinese Yuan","symbol_native":"CN¥","decimal_digits":2,"rounding":0,"code":"CNY","name_plural":"Chinese yuan"},{"symbol":"CO$","name":"Colombian Peso","symbol_native":"$","decimal_digits":0,"rounding":0,"code":"COP","name_plural":"Colombian pesos"},{"symbol":"₡","name":"Costa Rican Colón","symbol_native":"₡","decimal_digits":0,"rounding":0,"code":"CRC","name_plural":"Costa Rican colóns"},{"symbol":"CV$","name":"Cape Verdean Escudo","symbol_native":"CV$","decimal_digits":2,"rounding":0,"code":"CVE","name_plural":"Cape Verdean escudos"},{"symbol":"Kč","name":"Czech Republic Koruna","symbol_native":"Kč","decimal_digits":2,"rounding":0,"code":"CZK","name_plural":"Czech Republic korunas"},{"symbol":"Fdj","name":"Djiboutian Franc","symbol_native":"Fdj","decimal_digits":0,"rounding":0,"code":"DJF","name_plural":"Djiboutian francs"},{"symbol":"Dkr","name":"Danish Krone","symbol_native":"kr","decimal_digits":2,"rounding":0,"code":"DKK","name_plural":"Danish kroner"},{"symbol":"RD$","name":"Dominican Peso","symbol_native":"RD$","decimal_digits":2,"rounding":0,"code":"DOP","name_plural":"Dominican pesos"},{"symbol":"DA","name":"Algerian Dinar","symbol_native":"د.ج.‏","decimal_digits":2,"rounding":0,"code":"DZD","name_plural":"Algerian dinars"},{"symbol":"Ekr","name":"Estonian Kroon","symbol_native":"kr","decimal_digits":2,"rounding":0,"code":"EEK","name_plural":"Estonian kroons"},{"symbol":"EGP","name":"Egyptian Pound","symbol_native":"ج.م.‏","decimal_digits":2,"rounding":0,"code":"EGP","name_plural":"Egyptian pounds"},{"symbol":"Nfk","name":"Eritrean Nakfa","symbol_native":"Nfk","decimal_digits":2,"rounding":0,"code":"ERN","name_plural":"Eritrean nakfas"},{"symbol":"Br","name":"Ethiopian Birr","symbol_native":"Br","decimal_digits":2,"rounding":0,"code":"ETB","name_plural":"Ethiopian birrs"},{"symbol":"£","name":"British Pound Sterling","symbol_native":"£","decimal_digits":2,"rounding":0,"code":"GBP","name_plural":"British pounds sterling"},{"symbol":"GEL","name":"Georgian Lari","symbol_native":"GEL","decimal_digits":2,"rounding":0,"code":"GEL","name_plural":"Georgian laris"},{"symbol":"GH₵","name":"Ghanaian Cedi","symbol_native":"GH₵","decimal_digits":2,"rounding":0,"code":"GHS","name_plural":"Ghanaian cedis"},{"symbol":"FG","name":"Guinean Franc","symbol_native":"FG","decimal_digits":0,"rounding":0,"code":"GNF","name_plural":"Guinean francs"},{"symbol":"GTQ","name":"Guatemalan Quetzal","symbol_native":"Q","decimal_digits":2,"rounding":0,"code":"GTQ","name_plural":"Guatemalan quetzals"},{"symbol":"HK$","name":"Hong Kong Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"HKD","name_plural":"Hong Kong dollars"},{"symbol":"HNL","name":"Honduran Lempira","symbol_native":"L","decimal_digits":2,"rounding":0,"code":"HNL","name_plural":"Honduran lempiras"},{"symbol":"kn","name":"Croatian Kuna","symbol_native":"kn","decimal_digits":2,"rounding":0,"code":"HRK","name_plural":"Croatian kunas"},{"symbol":"Ft","name":"Hungarian Forint","symbol_native":"Ft","decimal_digits":0,"rounding":0,"code":"HUF","name_plural":"Hungarian forints"},{"symbol":"Rp","name":"Indonesian Rupiah","symbol_native":"Rp","decimal_digits":0,"rounding":0,"code":"IDR","name_plural":"Indonesian rupiahs"},{"symbol":"₪","name":"Israeli New Sheqel","symbol_native":"₪","decimal_digits":2,"rounding":0,"code":"ILS","name_plural":"Israeli new sheqels"},{"symbol":"Rs","name":"Indian Rupee","symbol_native":"টকা","decimal_digits":2,"rounding":0,"code":"INR","name_plural":"Indian rupees"},{"symbol":"IQD","name":"Iraqi Dinar","symbol_native":"د.ع.‏","decimal_digits":0,"rounding":0,"code":"IQD","name_plural":"Iraqi dinars"},{"symbol":"IRR","name":"Iranian Rial","symbol_native":"﷼","decimal_digits":0,"rounding":0,"code":"IRR","name_plural":"Iranian rials"},{"symbol":"Ikr","name":"Icelandic Króna","symbol_native":"kr","decimal_digits":0,"rounding":0,"code":"ISK","name_plural":"Icelandic krónur"},{"symbol":"J$","name":"Jamaican Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"JMD","name_plural":"Jamaican dollars"},{"symbol":"JD","name":"Jordanian Dinar","symbol_native":"د.أ.‏","decimal_digits":3,"rounding":0,"code":"JOD","name_plural":"Jordanian dinars"},{"symbol":"¥","name":"Japanese Yen","symbol_native":"￥","decimal_digits":0,"rounding":0,"code":"JPY","name_plural":"Japanese yen"},{"symbol":"Ksh","name":"Kenyan Shilling","symbol_native":"Ksh","decimal_digits":2,"rounding":0,"code":"KES","name_plural":"Kenyan shillings"},{"symbol":"KHR","name":"Cambodian Riel","symbol_native":"៛","decimal_digits":2,"rounding":0,"code":"KHR","name_plural":"Cambodian riels"},{"symbol":"CF","name":"Comorian Franc","symbol_native":"FC","decimal_digits":0,"rounding":0,"code":"KMF","name_plural":"Comorian francs"},{"symbol":"₩","name":"South Korean Won","symbol_native":"₩","decimal_digits":0,"rounding":0,"code":"KRW","name_plural":"South Korean won"},{"symbol":"KD","name":"Kuwaiti Dinar","symbol_native":"د.ك.‏","decimal_digits":3,"rounding":0,"code":"KWD","name_plural":"Kuwaiti dinars"},{"symbol":"KZT","name":"Kazakhstani Tenge","symbol_native":"тңг.","decimal_digits":2,"rounding":0,"code":"KZT","name_plural":"Kazakhstani tenges"},{"symbol":"LB£","name":"Lebanese Pound","symbol_native":"ل.ل.‏","decimal_digits":0,"rounding":0,"code":"LBP","name_plural":"Lebanese pounds"},{"symbol":"SLRs","name":"Sri Lankan Rupee","symbol_native":"SL Re","decimal_digits":2,"rounding":0,"code":"LKR","name_plural":"Sri Lankan rupees"},{"symbol":"Lt","name":"Lithuanian Litas","symbol_native":"Lt","decimal_digits":2,"rounding":0,"code":"LTL","name_plural":"Lithuanian litai"},{"symbol":"Ls","name":"Latvian Lats","symbol_native":"Ls","decimal_digits":2,"rounding":0,"code":"LVL","name_plural":"Latvian lati"},{"symbol":"LD","name":"Libyan Dinar","symbol_native":"د.ل.‏","decimal_digits":3,"rounding":0,"code":"LYD","name_plural":"Libyan dinars"},{"symbol":"MAD","name":"Moroccan Dirham","symbol_native":"د.م.‏","decimal_digits":2,"rounding":0,"code":"MAD","name_plural":"Moroccan dirhams"},{"symbol":"MDL","name":"Moldovan Leu","symbol_native":"MDL","decimal_digits":2,"rounding":0,"code":"MDL","name_plural":"Moldovan lei"},{"symbol":"MGA","name":"Malagasy Ariary","symbol_native":"MGA","decimal_digits":0,"rounding":0,"code":"MGA","name_plural":"Malagasy Ariaries"},{"symbol":"MKD","name":"Macedonian Denar","symbol_native":"MKD","decimal_digits":2,"rounding":0,"code":"MKD","name_plural":"Macedonian denari"},{"symbol":"MMK","name":"Myanma Kyat","symbol_native":"K","decimal_digits":0,"rounding":0,"code":"MMK","name_plural":"Myanma kyats"},
  {"symbol":"MOP$","name":"Macanese Pataca","symbol_native":"MOP$","decimal_digits":2,"rounding":0,"code":"MOP","name_plural":"Macanese patacas"},{"symbol":"MURs","name":"Mauritian Rupee","symbol_native":"MURs","decimal_digits":0,"rounding":0,"code":"MUR","name_plural":"Mauritian rupees"},{"symbol":"MX$","name":"Mexican Peso","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"MXN","name_plural":"Mexican pesos"},{"symbol":"RM","name":"Malaysian Ringgit","symbol_native":"RM","decimal_digits":2,"rounding":0,"code":"MYR","name_plural":"Malaysian ringgits"},{"symbol":"MTn","name":"Mozambican Metical","symbol_native":"MTn","decimal_digits":2,"rounding":0,"code":"MZN","name_plural":"Mozambican meticals"},{"symbol":"N$","name":"Namibian Dollar","symbol_native":"N$","decimal_digits":2,"rounding":0,"code":"NAD","name_plural":"Namibian dollars"},{"symbol":"₦","name":"Nigerian Naira","symbol_native":"₦","decimal_digits":2,"rounding":0,"code":"NGN","name_plural":"Nigerian nairas"},{"symbol":"C$","name":"Nicaraguan Córdoba","symbol_native":"C$","decimal_digits":2,"rounding":0,"code":"NIO","name_plural":"Nicaraguan córdobas"},{"symbol":"Nkr","name":"Norwegian Krone","symbol_native":"kr","decimal_digits":2,"rounding":0,"code":"NOK","name_plural":"Norwegian kroner"},{"symbol":"NPRs","name":"Nepalese Rupee","symbol_native":"नेरू","decimal_digits":2,"rounding":0,"code":"NPR","name_plural":"Nepalese rupees"},{"symbol":"NZ$","name":"New Zealand Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"NZD","name_plural":"New Zealand dollars"},{"symbol":"OMR","name":"Omani Rial","symbol_native":"ر.ع.‏","decimal_digits":3,"rounding":0,"code":"OMR","name_plural":"Omani rials"},{"symbol":"B/.","name":"Panamanian Balboa","symbol_native":"B/.","decimal_digits":2,"rounding":0,"code":"PAB","name_plural":"Panamanian balboas"},{"symbol":"S/.","name":"Peruvian Nuevo Sol","symbol_native":"S/.","decimal_digits":2,"rounding":0,"code":"PEN","name_plural":"Peruvian nuevos soles"},{"symbol":"₱","name":"Philippine Peso","symbol_native":"₱","decimal_digits":2,"rounding":0,"code":"PHP","name_plural":"Philippine pesos"},{"symbol":"PKRs","name":"Pakistani Rupee","symbol_native":"₨","decimal_digits":0,"rounding":0,"code":"PKR","name_plural":"Pakistani rupees"},{"symbol":"zł","name":"Polish Zloty","symbol_native":"zł","decimal_digits":2,"rounding":0,"code":"PLN","name_plural":"Polish zlotys"},{"symbol":"₲","name":"Paraguayan Guarani","symbol_native":"₲","decimal_digits":0,"rounding":0,"code":"PYG","name_plural":"Paraguayan guaranis"},{"symbol":"QR","name":"Qatari Rial","symbol_native":"ر.ق.‏","decimal_digits":2,"rounding":0,"code":"QAR","name_plural":"Qatari rials"},{"symbol":"RON","name":"Romanian Leu","symbol_native":"RON","decimal_digits":2,"rounding":0,"code":"RON","name_plural":"Romanian lei"},{"symbol":"din.","name":"Serbian Dinar","symbol_native":"дин.","decimal_digits":0,"rounding":0,"code":"RSD","name_plural":"Serbian dinars"},{"symbol":"RUB","name":"Russian Ruble","symbol_native":"₽.","decimal_digits":2,"rounding":0,"code":"RUB","name_plural":"Russian rubles"},{"symbol":"RWF","name":"Rwandan Franc","symbol_native":"FR","decimal_digits":0,"rounding":0,"code":"RWF","name_plural":"Rwandan francs"},{"symbol":"SR","name":"Saudi Riyal","symbol_native":"ر.س.‏","decimal_digits":2,"rounding":0,"code":"SAR","name_plural":"Saudi riyals"},{"symbol":"SDG","name":"Sudanese Pound","symbol_native":"SDG","decimal_digits":2,"rounding":0,"code":"SDG","name_plural":"Sudanese pounds"},{"symbol":"Skr","name":"Swedish Krona","symbol_native":"kr","decimal_digits":2,"rounding":0,"code":"SEK","name_plural":"Swedish kronor"},{"symbol":"S$","name":"Singapore Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"SGD","name_plural":"Singapore dollars"},{"symbol":"Ssh","name":"Somali Shilling","symbol_native":"Ssh","decimal_digits":0,"rounding":0,"code":"SOS","name_plural":"Somali shillings"},{"symbol":"SY£","name":"Syrian Pound","symbol_native":"ل.س.‏","decimal_digits":0,"rounding":0,"code":"SYP","name_plural":"Syrian pounds"},{"symbol":"฿","name":"Thai Baht","symbol_native":"฿","decimal_digits":2,"rounding":0,"code":"THB","name_plural":"Thai baht"},{"symbol":"DT","name":"Tunisian Dinar","symbol_native":"د.ت.‏","decimal_digits":3,"rounding":0,"code":"TND","name_plural":"Tunisian dinars"},{"symbol":"T$","name":"Tongan Paʻanga","symbol_native":"T$","decimal_digits":2,"rounding":0,"code":"TOP","name_plural":"Tongan paʻanga"},{"symbol":"TL","name":"Turkish Lira","symbol_native":"TL","decimal_digits":2,"rounding":0,"code":"TRY","name_plural":"Turkish Lira"},{"symbol":"TT$","name":"Trinidad and Tobago Dollar","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"TTD","name_plural":"Trinidad and Tobago dollars"},{"symbol":"NT$","name":"New Taiwan Dollar","symbol_native":"NT$","decimal_digits":2,"rounding":0,"code":"TWD","name_plural":"New Taiwan dollars"},{"symbol":"TSh","name":"Tanzanian Shilling","symbol_native":"TSh","decimal_digits":0,"rounding":0,"code":"TZS","name_plural":"Tanzanian shillings"},{"symbol":"₴","name":"Ukrainian Hryvnia","symbol_native":"₴","decimal_digits":2,"rounding":0,"code":"UAH","name_plural":"Ukrainian hryvnias"},{"symbol":"USh","name":"Ugandan Shilling","symbol_native":"USh","decimal_digits":0,"rounding":0,"code":"UGX","name_plural":"Ugandan shillings"},{"symbol":"$U","name":"Uruguayan Peso","symbol_native":"$","decimal_digits":2,"rounding":0,"code":"UYU","name_plural":"Uruguayan pesos"},{"symbol":"UZS","name":"Uzbekistan Som","symbol_native":"UZS","decimal_digits":0,"rounding":0,"code":"UZS","name_plural":"Uzbekistan som"},{"symbol":"Bs.F.","name":"Venezuelan Bolívar","symbol_native":"Bs.F.","decimal_digits":2,"rounding":0,"code":"VEF","name_plural":"Venezuelan bolívars"},{"symbol":"₫","name":"Vietnamese Dong","symbol_native":"₫","decimal_digits":0,"rounding":0,"code":"VND","name_plural":"Vietnamese dong"},{"symbol":"FCFA","name":"CFA Franc BEAC","symbol_native":"FCFA","decimal_digits":0,"rounding":0,"code":"XAF","name_plural":"CFA francs BEAC"},{"symbol":"CFA","name":"CFA Franc BCEAO","symbol_native":"CFA","decimal_digits":0,"rounding":0,"code":"XOF","name_plural":"CFA francs BCEAO"},{"symbol":"YR","name":"Yemeni Rial","symbol_native":"ر.ي.‏","decimal_digits":0,"rounding":0,"code":"YER","name_plural":"Yemeni rials"},{"symbol":"R","name":"South African Rand","symbol_native":"R","decimal_digits":2,"rounding":0,"code":"ZAR","name_plural":"South African rand"},{"symbol":"ZK","name":"Zambian Kwacha","symbol_native":"ZK","decimal_digits":0,"rounding":0,"code":"ZMK","name_plural":"Zambian kwachas"},{"symbol":"ZWL$","name":"Zimbabwean Dollar","symbol_native":"ZWL$","decimal_digits":0,"rounding":0,"code":"ZWL","name_plural":"Zimbabwean Dollar"}]
  constructor(private transs:TransService,
     private CurrencyService:CurrencyService,
     private formBuilder:FormBuilder,
     private modalService: NgbModal,
     private toastr:ToastrService,
     private lang:LanguageService) { 
  }
  get f() { return this.formCurrency.controls; }
  get fn() { return this.formCurrencyName.controls; }
  ngOnInit() {
    this.Trans=this.transs.trans.subscribe(res=>{
      this.trans=res.key;
      this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' },{ label: "SETTINGS", path: '/', active: true }, { label: "CURRENCIES", path: '/', active: true }];
    });

    this.Currency=this.CurrencyService.set().subscribe(res=>{
      this.currency=res;
    });
    this.CurrencyService.getAll();
    //Form validators 
    this.formCurrency = this.formBuilder.group({
      currencyCode: ['', Validators.required],
      symbol: ['', Validators.required]
    });
    this.formCurrency.addControl('id',new FormControl(""));


    //Form validators 
    this.formCurrencyName = this.formBuilder.group({
      currencyName: ['', Validators.required],
      langId: ['', Validators.required]
    });
    this.formCurrencyName.addControl('id',new FormControl(""));
    this.formCurrencyName.addControl('currencyId',new FormControl(""));
  }


  changeCurrunce($event){
    this.formCurrency.get("symbol").setValue(this.listArray.find(x=>x.code==$event).symbol);
  }
  getLang(){
    this.lang.getAllLanguageAndClassfier().subscribe(res=>{
      this.Language=res;
    });
  }

  getCodeLang(id:number){
   return this.Language.find(x=>x.id==id).langCode;
  }
  ngOnDestroy() {
    this.Trans.unsubscribe();
    this.Currency.unsubscribe();
  }

  status(status:number)
  {
    if(status==0)
    {
      return false;
    }
    else
    {
      return true;
    }
  }
  ChangeStatus(event,id:number){
    if(event)
    {
      return this.CurrencyService.deactivate_or_activate(id,1);
    }
    else
    {
      return this.CurrencyService.deactivate_or_activate(id,0);
    }
  }
  updateCurrency(){
   this.CurrencyService.updateCurrency().subscribe(res=>{
    this.CurrencyService.getAll();
   });
  }
  onChangeStatus($event,id:number){
    this.ChangeStatus($event,id).subscribe(res=>{

      if($event)
      {
        this.toastr.success("The currency has been activated", "successfull" ,{
          timeOut :  3000
        });
      }
      else
      {
        this.toastr.warning("The currency has been deactivated", "warning" ,{
          timeOut :  3000
        });
      }
    },err=>{
      if(err=2010)
      {
        this.toastr.warning(this.trans.currency.YouMustHaveAtLeastOneName, "warning" ,{
          timeOut :  3000
        });
        this.CurrencyService.getAll();
      }
      else
      {
        this.toastr.error(this.trans.currency.UnknownError, "error" ,{
          timeOut :  3000
        });
      }
    })
  }

  putValueForm(id:number)
  {
    this.formCurrency.get('id').setValue(this.currency.find(x=>x.id==id).id);
    this.formCurrency.get('currencyCode').setValue(this.currency.find(x=>x.id==id).currencyCode);
    this.formCurrency.get('symbol').setValue(this.currency.find(x=>x.id==id).symbol);
  }
  disableForm(){
    this.formCurrency.disable({onlySelf:true});
  }
  enableForm(){
    this.formCurrency.enable({onlySelf:true});
  }
  add(content){
    this.enableForm();
    this.formCurrency.reset();
    this.typeForm=0;
    this.titleForm="ADD CURRENCY";
    this.modalService.open(content ,{ backdrop: 'static' });
  }

  edit(id:number)
  {
    this.getLang();
    this.currencyId=id;
    this.getAllName();
  }
  delete(content,id:number){
    this.formCurrency.reset();
    this.putValueForm(id);
    this.disableForm();
    this.typeForm=2;
    this.titleForm="DELETE CURRENCY";
    this.modalService.open(content ,{ backdrop: 'static' });
  }
  submit(param:[]){
    if(this.typeForm==0)
    {
      return this.CurrencyService.create(param);
    }
    else
    {
      return this.CurrencyService.delete(this.formCurrency.get('id').value);
    }
  }
  onSubmit(){
    this.submitted = true;
    if (this.formCurrency.invalid) {
      return;
    }
    this.loading = true;
    this.submit(this.formCurrency.value).subscribe(res=>{
      if(res.message==2000) //2000 it means this number is added successfully
      {
        this.toastr.success(this.trans.currency.addSuccessfull, "successfull" ,{
          timeOut :  3000
        });
      }
      else if(res.message==2002) //2002 it means this number is deleted successfully
      {
        this.toastr.success(this.trans.currency.deletedSuccessfully, "Deleted" ,{
          timeOut :  3000
        });
      }
      this.modalService.dismissAll();
      this.CurrencyService.getAll();
      this.loading = false;
      this.submitted =false;
    },err=>{;
     if(err==1001) //2002 it means this number is deleted successfully
      {
        this.toastr.error(this.trans.currency.SimilarRecordsCannotbeAdded, "error" ,{
          timeOut :  3000
        });
      }
      else if(err==2008)
      {
        this.toastr.error(this.trans.currency.TheCodeIsInvalid, "error" ,{
          timeOut :  3000
        });
      }
      else{
        this.toastr.error(this.trans.currency.UnknownError, "error" ,{
          timeOut :  3000
        });
      }
      this.loading = false;
    });
  }
  onChange(event){
    this.formCurrency.get('currencyCode').setValue(this.formCurrency.get('currencyCode').value.toUpperCase())
  }

  //Name

  putValueFormName(id:number)
  {
    this.formCurrencyName.get('id').setValue(this.currencyName.find(x=>x.id==id).id);
    this.formCurrencyName.get('currencyName').setValue(this.currencyName.find(x=>x.id==id).currencyName);
    this.formCurrencyName.get('currencyId').setValue(this.currencyName.find(x=>x.id==id).currencyId);
    this.formCurrencyName.get('langId').setValue(this.currencyName.find(x=>x.id==id).langId);
  }
  disableFormName(){
    this.formCurrencyName.disable({onlySelf:true});
  }
  enableFormName(){
    this.formCurrencyName.enable({onlySelf:true});
  }
  addName(content){
    if(this.currencyId != -1)
    {
      this.enableFormName();
      this.getLang();
      this.formCurrencyName.reset();
      this.typeFormName=0;
      this.titleFormName="ADD LANGUAGE";
      this.modalService.open(content ,{ backdrop: 'static' });
      this.formCurrencyName.get('currencyId').setValue(this.currencyId);
    }

  }
  getAllName()
  {
    this.CurrencyService.getAllName(this.currencyId).subscribe(res=>{
        this.currencyName=res;
    })
  }
  deleteName(content,id:number){

    this.formCurrencyName.reset();
    this.putValueFormName(id);
    this.disableFormName();
    this.typeFormName=2;
    this.titleFormName="DELETE LANGUAGE";
    this.modalService.open(content ,{ backdrop: 'static' });
  }
  submitName(param:[]){
    if(this.typeFormName==0)
    {
      return this.CurrencyService.createName(param);
    }
    else
    {
      return this.CurrencyService.deleteName(this.formCurrencyName.get('id').value);
    }
  }
  onSubmitName(){
    this.submittedName = true;
    if (this.formCurrencyName.invalid) {
      return;
    }
    this.loadingName = true;
    this.submitName(this.formCurrencyName.value).subscribe(res=>{
      if(res.message==2000) //2000 it means this number is added successfully
      {
        this.toastr.success(this.trans.currencyName.addSuccessfull, "successfull" ,{
          timeOut :  3000
        });
      }
      else if(res.message==2002) //2002 it means this number is deleted successfully
      {
        this.toastr.success(this.trans.currencyName.deletedSuccessfully, "Deleted" ,{
          timeOut :  3000
        });
      }
      this.modalService.dismissAll();
      this.getAllName();
      this.loadingName = false;
      this.submittedName =false;
    },err=>{;
     if(err==1001) //2002 it means this number is deleted successfully
      {
        this.toastr.error(this.trans.currency.SimilarRecordsCannotbeAdded, "error" ,{
          timeOut :  3000
        });
      }
      else if(err==2008)
      {
        this.toastr.error(this.trans.currency.TheCodeIsInvalid, "error" ,{
          timeOut :  3000
        });
      }
      else{
        this.toastr.error(this.trans.currency.UnknownError, "error" ,{
          timeOut :  3000
        });
      }
      this.loading = false;
    });
  }
  onChangeName(event){
    this.formCurrencyName.get('currencyCode').setValue(this.formCurrency.get('currencyCode').value.toUpperCase())
  }
}

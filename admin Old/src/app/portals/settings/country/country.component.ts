
import { Component, OnInit } from '@angular/core';
import {country} from '../../../core/models/country';
import {CountryService} from '../../../core/services/country/country.service';
import { Subscription } from 'rxjs';
import { TransService } from 'src/app/core/services/translation/trans.service';
import { Language } from 'src/app/core/models/Language';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language/language.service';
import { countryName } from 'src/app/core/models/countryName';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {


  Trans:Subscription;
  trans:any;
  breadCrumbItems: Array<{}>;
  Country:Subscription;
  country:country[];

  countryName:countryName[];
  
  Language:Language[];
  
  formCountry: FormGroup;
  submitted = false;
  error = '';
  loading = false;
  titleForm:String="ADD COUNTRY";
  typeForm:Number=0;
  countryId:number=-1;


  formCountryName: FormGroup;
  submittedName = false;
  errorName = '';
  loadingName = false;
  titleFormName:String="ADD countryName";
  typeFormName:Number=0;
  countryArray=[ 
    {nameCountry: 'Afghanistan', code: 'AF'}, 
    {nameCountry: 'Åland Islands', code: 'AX'}, 
    {nameCountry: 'Albania', code: 'AL'}, 
    {nameCountry: 'Algeria', code: 'DZ'}, 
    {nameCountry: 'American Samoa', code: 'AS'}, 
    {nameCountry: 'AndorrA', code: 'AD'}, 
    {nameCountry: 'Angola', code: 'AO'}, 
    {nameCountry: 'Anguilla', code: 'AI'}, 
    {nameCountry: 'Antarctica', code: 'AQ'}, 
    {nameCountry: 'Antigua and Barbuda', code: 'AG'}, 
    {nameCountry: 'Argentina', code: 'AR'}, 
    {nameCountry: 'Armenia', code: 'AM'}, 
    {nameCountry: 'Aruba', code: 'AW'}, 
    {nameCountry: 'Australia', code: 'AU'}, 
    {nameCountry: 'Austria', code: 'AT'}, 
    {nameCountry: 'Azerbaijan', code: 'AZ'}, 
    {nameCountry: 'Bahamas', code: 'BS'}, 
    {nameCountry: 'Bahrain', code: 'BH'}, 
    {nameCountry: 'Bangladesh', code: 'BD'}, 
    {nameCountry: 'Barbados', code: 'BB'}, 
    {nameCountry: 'Belarus', code: 'BY'}, 
    {nameCountry: 'Belgium', code: 'BE'}, 
    {nameCountry: 'Belize', code: 'BZ'}, 
    {nameCountry: 'Benin', code: 'BJ'}, 
    {nameCountry: 'Bermuda', code: 'BM'}, 
    {nameCountry: 'Bhutan', code: 'BT'}, 
    {nameCountry: 'Bolivia', code: 'BO'}, 
    {nameCountry: 'Bosnia and Herzegovina', code: 'BA'}, 
    {nameCountry: 'Botswana', code: 'BW'}, 
    {nameCountry: 'Bouvet Island', code: 'BV'}, 
    {nameCountry: 'Brazil', code: 'BR'}, 
    {nameCountry: 'British Indian Ocean Territory', code: 'IO'}, 
    {nameCountry: 'Brunei Darussalam', code: 'BN'}, 
    {nameCountry: 'Bulgaria', code: 'BG'}, 
    {nameCountry: 'Burkina Faso', code: 'BF'}, 
    {nameCountry: 'Burundi', code: 'BI'}, 
    {nameCountry: 'Cambodia', code: 'KH'}, 
    {nameCountry: 'Cameroon', code: 'CM'}, 
    {nameCountry: 'Canada', code: 'CA'}, 
    {nameCountry: 'Cape Verde', code: 'CV'}, 
    {nameCountry: 'Cayman Islands', code: 'KY'}, 
    {nameCountry: 'Central African Republic', code: 'CF'}, 
    {nameCountry: 'Chad', code: 'TD'}, 
    {nameCountry: 'Chile', code: 'CL'}, 
    {nameCountry: 'China', code: 'CN'}, 
    {nameCountry: 'Christmas Island', code: 'CX'}, 
    {nameCountry: 'Cocos (Keeling) Islands', code: 'CC'}, 
    {nameCountry: 'Colombia', code: 'CO'}, 
    {nameCountry: 'Comoros', code: 'KM'}, 
    {nameCountry: 'Congo', code: 'CG'}, 
    {nameCountry: 'Congo, The Democratic Republic of the', code: 'CD'}, 
    {nameCountry: 'Cook Islands', code: 'CK'}, 
    {nameCountry: 'Costa Rica', code: 'CR'}, 
    {nameCountry: 'Cote D\'Ivoire', code: 'CI'}, 
    {nameCountry: 'Croatia', code: 'HR'}, 
    {nameCountry: 'Cuba', code: 'CU'}, 
    {nameCountry: 'Cyprus', code: 'CY'}, 
    {nameCountry: 'Czech Republic', code: 'CZ'}, 
    {nameCountry: 'Denmark', code: 'DK'}, 
    {nameCountry: 'Djibouti', code: 'DJ'}, 
    {nameCountry: 'Dominica', code: 'DM'}, 
    {nameCountry: 'Dominican Republic', code: 'DO'}, 
    {nameCountry: 'Ecuador', code: 'EC'}, 
    {nameCountry: 'Egypt', code: 'EG'}, 
    {nameCountry: 'El Salvador', code: 'SV'}, 
    {nameCountry: 'Equatorial Guinea', code: 'GQ'}, 
    {nameCountry: 'Eritrea', code: 'ER'}, 
    {nameCountry: 'Estonia', code: 'EE'}, 
    {nameCountry: 'Ethiopia', code: 'ET'}, 
    {nameCountry: 'Falkland Islands (Malvinas)', code: 'FK'}, 
    {nameCountry: 'Faroe Islands', code: 'FO'}, 
    {nameCountry: 'Fiji', code: 'FJ'}, 
    {nameCountry: 'Finland', code: 'FI'}, 
    {nameCountry: 'France', code: 'FR'}, 
    {nameCountry: 'French Guiana', code: 'GF'}, 
    {nameCountry: 'French Polynesia', code: 'PF'}, 
    {nameCountry: 'French Southern Territories', code: 'TF'}, 
    {nameCountry: 'Gabon', code: 'GA'}, 
    {nameCountry: 'Gambia', code: 'GM'}, 
    {nameCountry: 'Georgia', code: 'GE'}, 
    {nameCountry: 'Germany', code: 'DE'}, 
    {nameCountry: 'Ghana', code: 'GH'}, 
    {nameCountry: 'Gibraltar', code: 'GI'}, 
    {nameCountry: 'Greece', code: 'GR'}, 
    {nameCountry: 'Greenland', code: 'GL'}, 
    {nameCountry: 'Grenada', code: 'GD'}, 
    {nameCountry: 'Guadeloupe', code: 'GP'}, 
    {nameCountry: 'Guam', code: 'GU'}, 
    {nameCountry: 'Guatemala', code: 'GT'}, 
    {nameCountry: 'Guernsey', code: 'GG'}, 
    {nameCountry: 'Guinea', code: 'GN'}, 
    {nameCountry: 'Guinea-Bissau', code: 'GW'}, 
    {nameCountry: 'Guyana', code: 'GY'}, 
    {nameCountry: 'Haiti', code: 'HT'}, 
    {nameCountry: 'Heard Island and Mcdonald Islands', code: 'HM'}, 
    {nameCountry: 'Holy See (Vatican City State)', code: 'VA'}, 
    {nameCountry: 'Honduras', code: 'HN'}, 
    {nameCountry: 'Hong Kong', code: 'HK'}, 
    {nameCountry: 'Hungary', code: 'HU'}, 
    {nameCountry: 'Iceland', code: 'IS'}, 
    {nameCountry: 'India', code: 'IN'}, 
    {nameCountry: 'Indonesia', code: 'ID'}, 
    {nameCountry: 'Iran, Islamic Republic Of', code: 'IR'}, 
    {nameCountry: 'Iraq', code: 'IQ'}, 
    {nameCountry: 'Ireland', code: 'IE'}, 
    {nameCountry: 'Isle of Man', code: 'IM'}, 
    {nameCountry: 'Israel', code: 'IL'}, 
    {nameCountry: 'Italy', code: 'IT'}, 
    {nameCountry: 'Jamaica', code: 'JM'}, 
    {nameCountry: 'Japan', code: 'JP'}, 
    {nameCountry: 'Jersey', code: 'JE'}, 
    {nameCountry: 'Jordan', code: 'JO'}, 
    {nameCountry: 'Kazakhstan', code: 'KZ'}, 
    {nameCountry: 'Kenya', code: 'KE'}, 
    {nameCountry: 'Kiribati', code: 'KI'}, 
    {nameCountry: 'Korea, Democratic People\'S Republic of', code: 'KP'}, 
    {nameCountry: 'Korea, Republic of', code: 'KR'}, 
    {nameCountry: 'Kuwait', code: 'KW'}, 
    {nameCountry: 'Kyrgyzstan', code: 'KG'}, 
    {nameCountry: 'Lao People\'S Democratic Republic', code: 'LA'}, 
    {nameCountry: 'Latvia', code: 'LV'}, 
    {nameCountry: 'Lebanon', code: 'LB'}, 
    {nameCountry: 'Lesotho', code: 'LS'}, 
    {nameCountry: 'Liberia', code: 'LR'}, 
    {nameCountry: 'Libyan Arab Jamahiriya', code: 'LY'}, 
    {nameCountry: 'Liechtenstein', code: 'LI'}, 
    {nameCountry: 'Lithuania', code: 'LT'}, 
    {nameCountry: 'Luxembourg', code: 'LU'}, 
    {nameCountry: 'Macao', code: 'MO'}, 
    {nameCountry: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'}, 
    {nameCountry: 'Madagascar', code: 'MG'}, 
    {nameCountry: 'Malawi', code: 'MW'}, 
    {nameCountry: 'Malaysia', code: 'MY'}, 
    {nameCountry: 'Maldives', code: 'MV'}, 
    {nameCountry: 'Mali', code: 'ML'}, 
    {nameCountry: 'Malta', code: 'MT'}, 
    {nameCountry: 'Marshall Islands', code: 'MH'}, 
    {nameCountry: 'Martinique', code: 'MQ'}, 
    {nameCountry: 'Mauritania', code: 'MR'}, 
    {nameCountry: 'Mauritius', code: 'MU'}, 
    {nameCountry: 'Mayotte', code: 'YT'}, 
    {nameCountry: 'Mexico', code: 'MX'}, 
    {nameCountry: 'Micronesia, Federated States of', code: 'FM'}, 
    {nameCountry: 'Moldova, Republic of', code: 'MD'}, 
    {nameCountry: 'Monaco', code: 'MC'}, 
    {nameCountry: 'Mongolia', code: 'MN'}, 
    {nameCountry: 'Montserrat', code: 'MS'}, 
    {nameCountry: 'Morocco', code: 'MA'}, 
    {nameCountry: 'Mozambique', code: 'MZ'}, 
    {nameCountry: 'Myanmar', code: 'MM'}, 
    {nameCountry: 'Namibia', code: 'NA'}, 
    {nameCountry: 'Nauru', code: 'NR'}, 
    {nameCountry: 'Nepal', code: 'NP'}, 
    {nameCountry: 'Netherlands', code: 'NL'}, 
    {nameCountry: 'Netherlands Antilles', code: 'AN'}, 
    {nameCountry: 'New Caledonia', code: 'NC'}, 
    {nameCountry: 'New Zealand', code: 'NZ'}, 
    {nameCountry: 'Nicaragua', code: 'NI'}, 
    {nameCountry: 'Niger', code: 'NE'}, 
    {nameCountry: 'Nigeria', code: 'NG'}, 
    {nameCountry: 'Niue', code: 'NU'}, 
    {nameCountry: 'Norfolk Island', code: 'NF'}, 
    {nameCountry: 'Northern Mariana Islands', code: 'MP'}, 
    {nameCountry: 'Norway', code: 'NO'}, 
    {nameCountry: 'Oman', code: 'OM'}, 
    {nameCountry: 'Pakistan', code: 'PK'}, 
    {nameCountry: 'Palau', code: 'PW'}, 
    {nameCountry: 'Palestinian Territory, Occupied', code: 'PS'}, 
    {nameCountry: 'Panama', code: 'PA'}, 
    {nameCountry: 'Papua New Guinea', code: 'PG'}, 
    {nameCountry: 'Paraguay', code: 'PY'}, 
    {nameCountry: 'Peru', code: 'PE'}, 
    {nameCountry: 'Philippines', code: 'PH'}, 
    {nameCountry: 'Pitcairn', code: 'PN'}, 
    {nameCountry: 'Poland', code: 'PL'}, 
    {nameCountry: 'Portugal', code: 'PT'}, 
    {nameCountry: 'Puerto Rico', code: 'PR'}, 
    {nameCountry: 'Qatar', code: 'QA'}, 
    {nameCountry: 'Reunion', code: 'RE'}, 
    {nameCountry: 'Romania', code: 'RO'}, 
    {nameCountry: 'Russian Federation', code: 'RU'}, 
    {nameCountry: 'RWANDA', code: 'RW'}, 
    {nameCountry: 'Saint Helena', code: 'SH'}, 
    {nameCountry: 'Saint Kitts and Nevis', code: 'KN'}, 
    {nameCountry: 'Saint Lucia', code: 'LC'}, 
    {nameCountry: 'Saint Pierre and Miquelon', code: 'PM'}, 
    {nameCountry: 'Saint Vincent and the Grenadines', code: 'VC'}, 
    {nameCountry: 'Samoa', code: 'WS'}, 
    {nameCountry: 'San Marino', code: 'SM'}, 
    {nameCountry: 'Sao Tome and Principe', code: 'ST'}, 
    {nameCountry: 'Saudi Arabia', code: 'SA'}, 
    {nameCountry: 'Senegal', code: 'SN'}, 
    {nameCountry: 'Serbia and Montenegro', code: 'CS'}, 
    {nameCountry: 'Seychelles', code: 'SC'}, 
    {nameCountry: 'Sierra Leone', code: 'SL'}, 
    {nameCountry: 'Singapore', code: 'SG'}, 
    {nameCountry: 'Slovakia', code: 'SK'}, 
    {nameCountry: 'Slovenia', code: 'SI'}, 
    {nameCountry: 'Solomon Islands', code: 'SB'}, 
    {nameCountry: 'Somalia', code: 'SO'}, 
    {nameCountry: 'South Africa', code: 'ZA'}, 
    {nameCountry: 'South Georgia and the South Sandwich Islands', code: 'GS'}, 
    {nameCountry: 'Spain', code: 'ES'}, 
    {nameCountry: 'Sri Lanka', code: 'LK'}, 
    {nameCountry: 'Sudan', code: 'SD'}, 
    {nameCountry: 'Suriname', code: 'SR'}, 
    {nameCountry: 'Svalbard and Jan Mayen', code: 'SJ'}, 
    {nameCountry: 'Swaziland', code: 'SZ'}, 
    {nameCountry: 'Sweden', code: 'SE'}, 
    {nameCountry: 'Switzerland', code: 'CH'}, 
    {nameCountry: 'Syrian Arab Republic', code: 'SY'}, 
    {nameCountry: 'Taiwan, Province of China', code: 'TW'}, 
    {nameCountry: 'Tajikistan', code: 'TJ'}, 
    {nameCountry: 'Tanzania, United Republic of', code: 'TZ'}, 
    {nameCountry: 'Thailand', code: 'TH'}, 
    {nameCountry: 'Timor-Leste', code: 'TL'}, 
    {nameCountry: 'Togo', code: 'TG'}, 
    {nameCountry: 'Tokelau', code: 'TK'}, 
    {nameCountry: 'Tonga', code: 'TO'}, 
    {nameCountry: 'Trinidad and Tobago', code: 'TT'}, 
    {nameCountry: 'Tunisia', code: 'TN'}, 
    {nameCountry: 'Turkey', code: 'TR'}, 
    {nameCountry: 'Turkmenistan', code: 'TM'}, 
    {nameCountry: 'Turks and Caicos Islands', code: 'TC'}, 
    {nameCountry: 'Tuvalu', code: 'TV'}, 
    {nameCountry: 'Uganda', code: 'UG'}, 
    {nameCountry: 'Ukraine', code: 'UA'}, 
    {nameCountry: 'United Arab Emirates', code: 'AE'}, 
    {nameCountry: 'United Kingdom', code: 'GB'}, 
    {nameCountry: 'United States', code: 'US'}, 
    {nameCountry: 'United States Minor Outlying Islands', code: 'UM'}, 
    {nameCountry: 'Uruguay', code: 'UY'}, 
    {nameCountry: 'Uzbekistan', code: 'UZ'}, 
    {nameCountry: 'Vanuatu', code: 'VU'}, 
    {nameCountry: 'Venezuela', code: 'VE'}, 
    {nameCountry: 'Viet Nam', code: 'VN'}, 
    {nameCountry: 'Virgin Islands, British', code: 'VG'}, 
    {nameCountry: 'Virgin Islands, U.S.', code: 'VI'}, 
    {nameCountry: 'Wallis and Futuna', code: 'WF'}, 
    {nameCountry: 'Western Sahara', code: 'EH'}, 
    {nameCountry: 'Yemen', code: 'YE'}, 
    {nameCountry: 'Zambia', code: 'ZM'}, 
    {nameCountry: 'Zimbabwe', code: 'ZW'} 
  ];

  constructor(private transs:TransService,
     private CountryService:CountryService,
     private formBuilder:FormBuilder,
     private modalService: NgbModal,
     private toastr:ToastrService,
     private lang:LanguageService) { 
    

      for(var i=0;i<this.countryArray.length;i++)
      {
        this.countryArray[i].code= this.countryArray[i].code.toLowerCase();
      }
  }
  get f() { return this.formCountry.controls; }
  get fn() { return this.formCountryName.controls; }
  ngOnInit() {
    this.Trans=this.transs.trans.subscribe(res=>{
      this.trans=res.key;
      this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' },{ label: "SETTINGS", path: '/', active: true }, { label: "COUNTRIES", path: '/', active: true }];
    });

    this.Country=this.CountryService.set().subscribe(res=>{
      this.country=res;
    });
    this.CountryService.getAll();
    //Form validators 
    this.formCountry = this.formBuilder.group({
       code: ['', Validators.required]
    });
    this.formCountry.addControl('id',new FormControl(""));


    //Form validators 
    this.formCountryName = this.formBuilder.group({
      countryName: ['', Validators.required],
      langId: ['', Validators.required]
    });
    this.formCountryName.addControl('id',new FormControl(""));
    this.formCountryName.addControl('countryId',new FormControl(""));
  }


  getLang(){
    this.lang.getAllLanguageAndClassfier().subscribe(res=>{
      this.Language=res;
    });
  }

  getCodeLang(id:number){
    if(this.Language.find(x=>x.id==id)==undefined)
    {
      return this.trans.countryName.thislanguageitisstop;
    }
    else{
      return this.Language.find(x=>x.id==id).langCode;
    }
  
  }
  ngOnDestroy() {
    this.Trans.unsubscribe();
    this.Country.unsubscribe();
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
      return this.CountryService.deactivate_or_activate(id,1);
    }
    else
    {
      return this.CountryService.deactivate_or_activate(id,0);
    }
  }
  onChangeStatus($event,id:number){
    this.ChangeStatus($event,id).subscribe(res=>{
      if($event)
      {
        this.toastr.success("Country has been activated", "successfull" ,{
          timeOut :  3000
        });
      }
      else
      {
        this.toastr.warning("Country has been disabled", "warning" ,{
          timeOut :  3000
        });
      }
    },err=>{
      if(err=2010)
      {
        this.toastr.warning(this.trans.country.YouMustHaveAtLeastOneName, "warning" ,{
          timeOut :  3000
        });
        this.CountryService.getAll();
      }
      else
      {
        this.toastr.error(this.trans.country.UnknownError, "error" ,{
          timeOut :  3000
        });
      }
    })
  }

  putValueForm(id:number)
  {
    this.formCountry.get('id').setValue(this.country.find(x=>x.id==id).id);
    this.formCountry.get('code').setValue(this.country.find(x=>x.id==id).code);
  }
  disableForm(){
    this.formCountry.disable({onlySelf:true});
  }
  enableForm(){
    this.formCountry.enable({onlySelf:true});
  }
  add(content){
    this.enableForm();
    this.formCountry.reset();
    this.typeForm=0;
    this.titleForm="ADD COUNTRY";
    this.modalService.open(content ,{ backdrop: 'static' });
  }

  edit(id:number)
  {
    this.getLang();
    this.countryId=id;
    this.getAllName();
  }
  delete(content,id:number){
    this.formCountry.reset();
    this.putValueForm(id);
    this.disableForm();
    this.typeForm=2;
    this.titleForm=this.trans.country.TitleForm_delete;
    this.modalService.open(content ,{ backdrop: 'static' });
  }
  submit(param:[]){
    if(this.typeForm==0)
    {
      return this.CountryService.create(param);
    }
    else
    {
      return this.CountryService.delete(this.formCountry.get('id').value);
    }
  }
  onSubmit(){
    this.submitted = true;
    if (this.formCountry.invalid) {
      return;
    }
    this.loading = true;
    this.submit(this.formCountry.value).subscribe(res=>{
      if(res.message==2000) //2000 it means this number is added successfully
      {
        this.toastr.success(this.trans.country.addSuccessfull, "successfull" ,{
          timeOut :  3000
        });
      }
      else if(res.message==2002) //2002 it means this number is deleted successfully
      {
        this.toastr.success(this.trans.country.deletedSuccessfully, "Deleted" ,{
          timeOut :  3000
        });
      }
      this.modalService.dismissAll();
      this.CountryService.getAll();
      this.loading = false;
      this.submitted =false;
    },err=>{;
     if(err==1001) //2002 it means this number is deleted successfully
      {
        this.toastr.error(this.trans.country.SimilarRecordsCannotbeAdded, "error" ,{
          timeOut :  3000
        });
      }
      else if(err==2008)
      {
        this.toastr.error(this.trans.country.TheCodeIsInvalid, "error" ,{
          timeOut :  3000
        });
      }
      else{
        this.toastr.error(this.trans.country.UnknownError, "error" ,{
          timeOut :  3000
        });
      }
      this.loading = false;
    });
  }
  onChange(event){
  

   // this.formCountry.get('code').setValue(this.formCountry.get('code').value.toLowerCase())
  }

  //Name

  putValueFormName(id:number)
  {
    this.formCountryName.get('id').setValue(this.countryName.find(x=>x.id==id).id);
    this.formCountryName.get('countryName').setValue(this.countryName.find(x=>x.id==id).countryName);
    this.formCountryName.get('countryId').setValue(this.countryName.find(x=>x.id==id).countryId);
    this.formCountryName.get('langId').setValue(this.countryName.find(x=>x.id==id).langId);
  }
  disableFormName(){
    this.formCountryName.disable({onlySelf:true});
  }
  enableFormName(){
    this.formCountryName.enable({onlySelf:true});
  }
  addName(content){
    if(this.countryId != -1)
    {
      this.enableFormName();
      this.getLang();
      this.formCountryName.reset();
      this.typeFormName=0;
      this.titleFormName="ADD LANGUAGE";
      this.modalService.open(content ,{ backdrop: 'static' });
      this.formCountryName.get('countryId').setValue(this.countryId);
    }

  }
  getAllName()
  {
    this.CountryService.getAllName(this.countryId).subscribe(res=>{
        this.countryName=res;
    })
  }
  deleteName(content,id:number){

    this.formCountryName.reset();
    this.putValueFormName(id);
    this.disableFormName();
    this.typeFormName=2;
    this.titleFormName=this.trans.country.TitleForm_delete;
    this.modalService.open(content ,{ backdrop: 'static' });
  }
  submitName(param:[]){
    if(this.typeFormName==0)
    {
      return this.CountryService.createName(param);
    }
    else
    {
      return this.CountryService.deleteName(this.formCountryName.get('id').value);
    }
  }
  onSubmitName(){
    this.submittedName = true;
    if (this.formCountryName.invalid) {
      return;
    }
    this.loadingName = true;
    this.submitName(this.formCountryName.value).subscribe(res=>{
      if(res.message==2000) //2000 it means this number is added successfully
      {
        this.toastr.success(this.trans.countryName.addSuccessfull, "successfull" ,{
          timeOut :  3000
        });
      }
      else if(res.message==2002) //2002 it means this number is deleted successfully
      {
        this.toastr.success(this.trans.countryName.deletedSuccessfully, "Deleted" ,{
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
        this.toastr.error(this.trans.country.SimilarRecordsCannotbeAdded, "error" ,{
          timeOut :  3000
        });
      }
      else if(err==2008)
      {
        this.toastr.error(this.trans.country.TheCodeIsInvalid, "error" ,{
          timeOut :  3000
        });
      }
      else{
        this.toastr.error(this.trans.country.UnknownError, "error" ,{
          timeOut :  3000
        });
      }
      this.loading = false;
    });
  }
  onChangeName(event){
    this.formCountryName.get('countryId').setValue(this.formCountry.get('countryId').value.toUpperCase());
  }

}

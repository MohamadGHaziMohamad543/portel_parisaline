import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { city } from 'src/app/core/models/city';
import { country } from 'src/app/core/models/country';
import { CityService } from 'src/app/core/services/city/city.service';
import { CountryService } from 'src/app/core/services/country/country.service';
import { environment } from 'src/environments/environment.prod';
import {CurrencyService} from '../../../core/services/currency/currency.service';
@Component({
  selector: 'app-pricestrategy',
  templateUrl: './pricestrategy.component.html',
  styleUrls: ['./pricestrategy.component.scss']
})
export class PricestrategyComponent implements OnInit {


  breadCrumbItems: Array<{}>;
  constructor(private http:HttpClient,
    private modelServices:NgbModal,
    private formBuilder:FormBuilder,
    private tost:ToastrService,
    private CountryService:CountryService,
    private CityService:CityService,
    private currancyS:CurrencyService,
    ) { 
         //set Validators formMembership
         this.formPricestrategy = this.formBuilder.group({
          nameStrategy: ['', Validators.required],
          titleStrategy: ['', Validators.required],
          countryId: ['', this.selectValidete],
          cityId: ['', this.selectValidete],
          doctorId: ['', this.selectValidete],
          form: ['', this.ssnValidator],
          to: ['', this.ssnValidator],
          type: ['', this.ssnValidator],
          Price: ['', this.ssnValidator],
          currencyId: ['', Validators.required],
        });
        this.breadCrumbItems = [{ label: 'SETTINGS', path: '/' }, { label: 'Pricestrategy', path: '/', active: true }];

  }

  imageUrl=environment.url;
  onChangeType(){
    if(this.formPricestrategy.get("type").value && this.formPricestrategy.get("type").value==1)
    {
      this.formPricestrategy.get("doctorId").disable({onlySelf:true});
      this.formPricestrategy.get("countryId").enable({onlySelf:true});
      this.formPricestrategy.get("cityId").enable({onlySelf:true});
      this.formPricestrategy.get("doctorId").setValue(-1);
    }
    else  if(this.formPricestrategy.get("type").value && this.formPricestrategy.get("type").value==2)
    {
      this.formPricestrategy.get("doctorId").enable({onlySelf:true});
      this.formPricestrategy.get("countryId").disable({onlySelf:true});
      this.formPricestrategy.get("cityId").disable({onlySelf:true});
      this.formPricestrategy.get("countryId").setValue(-1);
      this.formPricestrategy.get("cityId").setValue(-1);
    }
  }

  selectValidete(control: FormControl): {[key: string]: any}{
    if(control.value==null || control.value =='')
    {
      return {ssn: true};
    }
    else
    {
      return null;
    }
  }
  ssnValidator(control: FormControl): {[key: string]: any} {
    if((parseFloat(control.value) || control.value==0))
    {
      return null;
    }
    else
    {
      return {ssn: true};
    }
  }

  currency:any[];
  currencModel:number=1;
  ngOnInit() {
 
      this.formPricestrategy.addControl('id', new FormControl(-1));
      this.formPricestrategy.addControl('currencyCode', new FormControl(-1));
      this.currancyS.getAllAndName().subscribe(res=>{
        this.currency=res;
      });
      this.getCountry();
      this.getDoctors();
      this.getAll();
  }


  onChange(){
    if(this.formPricestrategy.get("countryId").value != undefined && this.formPricestrategy.get('countryId').value != "")
    {
      this.getCity(this.formPricestrategy.get("countryId").value);
     
    }
  }


  Pricestrategy:any[]=[];
  
  formPricestrategy: FormGroup;
  getAll(){
    this.http.post<any>(environment.url+"/pricestrategy/getAll",{}).subscribe(res=>{
      this.Pricestrategy=res.data;
    });
  }

  country:country[];
  city:city[];
  getCountry(){
    this.CountryService.getAllAndName().subscribe(res=>{
      res.push({"id":-1,"countryName":"All","code":"qqq"});
      this.country=res;
    });
  }

  getCity(countryId:number,cityId=-1){
    if(countryId==-1)
    {
      this.city=(<any>[{"id":-1,"cityName":"ALL"}]);
    }
    else{
      this.CityService.getAllAndNameById(countryId).subscribe(res=>{
        res.push({"id":-1,"cityName":"ALL"});
        this.city=res;
        this.formPricestrategy.get('cityId').setValue(cityId);
      });
    }
  }

  doctors:any[]=[];
  getDoctors(){
    this.http.post<any[]>(environment.url+"/doctor/getAll",{}).subscribe(res=>{
      res.push({nameDoctor:'ALL',id:-1,logo:'https://cdn-icons-png.flaticon.com/128/5277/5277635.png'});
      this.doctors=res;
    })
  }
  error = '';
  get f() { return this.formPricestrategy.controls; }
  titleForm:string="";
  submitted:boolean=false;
  idStatic:number=0;
  showPricestrategyModel(model,idStatic=null){
    this.submitted=false;
    if(idStatic)
    {
      this.formPricestrategy.reset();
      this.titleForm="Edit Price Strategy"
      this.idStatic=idStatic;
      let mem= this.Pricestrategy.find(x=>x.id==idStatic);
      console.log(mem);
      
      this.formPricestrategy.get("nameStrategy").setValue(mem.nameStrategy);
      this.formPricestrategy.get("titleStrategy").setValue(mem.titleStrategy);
      this.formPricestrategy.get("countryId").setValue(mem.countryId);
      this.getCity(mem.countryId,mem.cityId);
      this.formPricestrategy.get("cityId").setValue(mem.cityId);
      this.formPricestrategy.get("doctorId").setValue(mem.doctorId);
      this.formPricestrategy.get("form").setValue(mem.form);
      this.formPricestrategy.get("to").setValue(mem.to);
      this.formPricestrategy.get("type").setValue(mem.type);
      this.formPricestrategy.get("id").setValue(mem.id);
      this.formPricestrategy.get("Price").setValue(mem.Price);
      this.formPricestrategy.get("currencyId").setValue(mem.currencyId);
      this.onChangeType();
    }
    else{
      this.titleForm="Add Price Strategy"
      this.idStatic=-1;
      this.formPricestrategy.reset();
      this.formPricestrategy.get("type").setValue(1);
      this.formPricestrategy.get("doctorId").disable({onlySelf:true});
      this.formPricestrategy.get("doctorId").setValue(-1);
      this.onChangeType();
    }
    this.modelServices.open(model,{ backdrop: 'static' });
  }

  create(){
    this.submitted=true;
    if(!this.formPricestrategy.valid)
    {
      return;
    }
    this.formPricestrategy.get("currencyCode").setValue(this.currency.find(x=>x.id==this.formPricestrategy.get("currencyId").value).symbol);
    this.http.post<any>(environment.url+'/pricestrategy/create',this.formPricestrategy.getRawValue()).subscribe(res=>{
      if(res.message==2000)
      {
        this.getAll();
        this.modelServices.dismissAll();
        this.tost.success("Record added successfully","successful");
        
      }
    });
  }
  Update(){
    this.submitted=true;
    if(!this.formPricestrategy.valid)
    {
      return;
    }
    this.formPricestrategy.get("currencyCode").setValue(this.currency.find(x=>x.id==this.formPricestrategy.get("currencyId").value).symbol);
    this.http.post<any>(environment.url+'/pricestrategy/update',this.formPricestrategy.value).subscribe(res=>{
      if(res.message==2001)
      {
        this.tost.success("The record has been updated successfully","successful");
        this.getAll();
        this.modelServices.dismissAll();
      }
    });
  }

  Save(){
    if(this.idStatic==-1)
    {
      this.create();
    }
    else{
      this.Update();
    }
  }

  

}

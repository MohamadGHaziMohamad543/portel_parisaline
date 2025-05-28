import { Component, OnInit } from '@angular/core';
import {city} from '../../../core/models/city';
import {CityService} from '../../../core/services/city/city.service';
import { Subscription } from 'rxjs';
import { TransService } from 'src/app/core/services/translation/trans.service';
import { Language } from 'src/app/core/models/Language';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language/language.service';
import { cityName } from 'src/app/core/models/cityName';
import { CountryService } from 'src/app/core/services/country/country.service';
import  { country } from '../../../core/models/country';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  Trans:Subscription;
  trans:any;

  City:Subscription;
  city:city[];

  cityName:cityName[];
  
  Language:Language[];
  country:any[];

  formCity: FormGroup;
  submitted = false;
  error = '';
  loading = false;
  titleForm:String="ADD CITIES";
  typeForm:Number=0;
  cityId:number=-1;


  formCityName: FormGroup;
  submittedName = false;
  errorName = '';
  loadingName = false;
  titleFormName:String="Add cityName";
  typeFormName:Number=0;
  
  constructor(private transs:TransService,
     private CityService:CityService,
     private formBuilder:FormBuilder,
     private modalService: NgbModal,
     private toastr:ToastrService,
     private lang:LanguageService,
     private CountryService:CountryService) { 
    
  }
  get f() { return this.formCity.controls; }
  get fn() { return this.formCityName.controls; }
  ngOnInit() {
  //CITIES
    this.getCountry();
    this.Trans=this.transs.trans.subscribe(res=>{
      this.trans=res.key;
      this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' },{ label: "SETTINGS", path: '/', active: true }, { label: "CITIES", path: '/', active: true }];
    });

    this.City=this.CityService.set().subscribe(res=>{
      this.city=res;
    });
    this.CityService.getAll();
    //Form validators 
    this.formCity = this.formBuilder.group({
      countryId: ['', Validators.required],
       cityName: ['', Validators.required]
    });
    this.formCity.addControl('id',new FormControl(""));


    //Form validators 
    this.formCityName = this.formBuilder.group({
      cityName: ['', Validators.required],
      langId: ['', Validators.required]
    });
    this.formCityName.addControl('id',new FormControl(""));
    this.formCityName.addControl('cityId',new FormControl(""));
  }


  getLang(){
    this.lang.getAllLanguageAndClassfier().subscribe(res=>{
      this.Language=res;
    });
  }

  getCodeLang(id:number){
    if(this.Language.find(x=>x.id==id)==undefined)
    {
      return this.trans.cityName.thislanguageitisstop;
    }
    else{
      return this.Language.find(x=>x.id==id).langCode;
    }
  
  }
  getCountry(){
    this.CountryService.getAllAndName().subscribe(res=>{
      this.country=res;
    });
  }
  getCodeCountry(id:number){
    if(this.country != undefined)
    {
      if(this.country.find(x=>x.id==id) != undefined)
      {
        return this.country.find(x=>x.id==id).code;
      }
      else
      {
        return "";
      }
    }
    else{
      return "";
    }

  }
  getCNameCountry(id:number){
    if(this.country != undefined)
    {
      if(this.country.find(x=>x.id==id) != undefined)
      {
        return this.country.find(x=>x.id==id). countryName;
      }
      else
      {
        return "stop";
      }
    }
  }

  ngOnDestroy() {
    this.Trans.unsubscribe();
    this.City.unsubscribe();
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
      return this.CityService.deactivate_or_activate(id,1);
    }
    else
    {
      return this.CityService.deactivate_or_activate(id,0);
    }
  }
  onChangeStatus($event,id:number){
    this.ChangeStatus($event,id).subscribe(res=>{
      if($event)
      {
        this.toastr.success(this.trans.city.TheCityHasBeenActivated, "successfull" ,{
          timeOut :  3000
        });
      }
      else
      {
        this.toastr.warning(this.trans.city.CityHasBeenDeactivated, "warning" ,{
          timeOut :  3000
        });
      }
    },err=>{
      if(err=2010)
      {
        this.toastr.warning(this.trans.city.YouMustHaveAtLeastOneName, "warning" ,{
          timeOut :  3000
        });
        this.CityService.getAll();
      }
      else
      {
        this.toastr.error(this.trans.city.UnknownError, "error" ,{
          timeOut :  3000
        });
      }
    })
  }

  putValueForm(id:number)
  {
    this.formCity.get('id').setValue(this.city.find(x=>x.id==id).id);
    this.formCity.get('cityName').setValue(this.city.find(x=>x.id==id).cityName);
  }
  disableForm(){
    this.formCity.disable({onlySelf:true});
  }
  enableForm(){
    this.formCity.enable({onlySelf:true});
  }
  add(content){
    this.getCountry();
    this.enableForm();
    this.formCity.reset();
    this.typeForm=0;
    this.titleForm="ADD CITY";
    this.modalService.open(content ,{ backdrop: 'static' });
  }

  edit(id:number)
  {
    this.getLang();
    this.cityId=id;
    this.titleForm="EDIT CITY";
    this.getAllName();
  }
  delete(content,id:number){
    this.formCity.reset();
    this.putValueForm(id);
    this.disableForm();
    this.typeForm=2;
    this.titleForm="DELETE CITY";
    this.modalService.open(content ,{ backdrop: 'static' });
  }
  submit(param:[]){
    if(this.typeForm==0)
    {
      return this.CityService.create(param);
    }
    else
    {
      return this.CityService.delete(this.formCity.get('id').value);
    }
  }
  onSubmit(){
    this.submitted = true;
    if (this.formCity.invalid) {
      return;
    }
    this.loading = true;
    this.submit(this.formCity.value).subscribe(res=>{
      if(res.message==2000) //2000 it means this number is added successfully
      {
        this.toastr.success(this.trans.city.addSuccessfull, "successfull" ,{
          timeOut :  3000
        });
      }
      else if(res.message==2002) //2002 it means this number is deleted successfully
      {
        this.toastr.success(this.trans.city.deletedSuccessfully, "Deleted" ,{
          timeOut :  3000
        });
      }
      this.modalService.dismissAll();
      this.CityService.getAll();
      this.loading = false;
      this.submitted =false;
    },err=>{;
     if(err==1001) //2002 it means this number is deleted successfully
      {
        this.toastr.error("Record has been successfully added", "error" ,{
          timeOut :  3000
        });
      }
      else if(err==2008)
      {
        this.toastr.error(this.trans.city.TheCodeIsInvalid, "error" ,{
          timeOut :  3000
        });
      }
      else{
        this.toastr.error(this.trans.city.UnknownError, "error" ,{
          timeOut :  3000
        });
      }
      this.loading = false;
    });
  }
  onChange(event){
  
   // this.formCity.get('code').setValue(this.formCity.get('code').value.toLowerCase())
  }

  //Name

  putValueFormName(id:number)
  {
    this.formCityName.get('id').setValue(this.cityName.find(x=>x.id==id).id);
    this.formCityName.get('cityName').setValue(this.cityName.find(x=>x.id==id).cityName);
    this.formCityName.get('cityId').setValue(this.cityName.find(x=>x.id==id).cityId);
    this.formCityName.get('langId').setValue(this.cityName.find(x=>x.id==id).langId);
  }
  disableFormName(){
    this.formCityName.disable({onlySelf:true});
  }
  enableFormName(){
    this.formCityName.enable({onlySelf:true});
  }
  addName(content){
    if(this.cityId != -1)
    {
      this.enableFormName();
      this.getLang();
      this.formCityName.reset();
      this.typeFormName=0;
      this.titleFormName="ADD LANGUAGE"
      this.modalService.open(content ,{ backdrop: 'static' });
      this.formCityName.get('cityId').setValue(this.cityId);
    }

  }
  getAllName()
  {
    this.CityService.getAllName(this.cityId).subscribe(res=>{
        this.cityName=res;
    })
  }
  deleteName(content,id:number){

    this.formCityName.reset();
    this.putValueFormName(id);
    this.disableFormName();
    this.typeFormName=2;
    this.titleFormName="DELETE LANGUAGE"
    this.modalService.open(content ,{ backdrop: 'static' });
  }
  submitName(param:[]){
    if(this.typeFormName==0)
    {
      return this.CityService.createName(param);
    }
    else
    {
      return this.CityService.deleteName(this.formCityName.get('id').value);
    }
  }
  onSubmitName(){
    this.submittedName = true;
    if (this.formCityName.invalid) {
      return;
    }
    this.loadingName = true;
    this.submitName(this.formCityName.value).subscribe(res=>{
      if(res.message==2000) //2000 it means this number is added successfully
      {
        this.toastr.success(this.trans.cityName.addSuccessfull, "successfull" ,{
          timeOut :  3000
        });
      }
      else if(res.message==2002) //2002 it means this number is deleted successfully
      {
        this.toastr.success(this.trans.cityName.deletedSuccessfully, "Deleted" ,{
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
        this.toastr.error(this.trans.city.SimilarRecordsCannotbeAdded, "error" ,{
          timeOut :  3000
        });
      }
      else if(err==2008)
      {
        this.toastr.error(this.trans.city.TheCodeIsInvalid, "error" ,{
          timeOut :  3000
        });
      }
      else{
        this.toastr.error(this.trans.city.UnknownError, "error" ,{
          timeOut :  3000
        });
      }
      this.loading = false;
    });
  }
  onChangeName(event){
    this.formCityName.get('cityId').setValue(this.formCity.get('cityId').value.toUpperCase());
  }

}

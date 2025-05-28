import { Component, OnInit } from '@angular/core';
import {DentalCenterService} from '../../core/services/dentalCenter/dental-center.service';
import {dentalCenter} from '../../core/models/dentalCenters';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TransService } from 'src/app/core/services/translation/trans.service';
import { currency } from 'src/app/core/models/currency';
import { country } from 'src/app/core/models/country';
import { city } from 'src/app/core/models/city';
import { shippingCompany } from 'src/app/core/models/shippingCompany';
import { Imagebase64Service } from 'src/app/core/services/other/imagebase64.service';
import { CurrencyService } from 'src/app/core/services/currency/currency.service';
import { CountryService } from 'src/app/core/services/country/country.service';
import { CityService } from 'src/app/core/services/city/city.service';
import { EncryptService } from 'src/app/core/services/encrypt/encrypt.service';
import { ShippingCompanyService } from 'src/app/core/services/shippingCompany/shipping-company.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { environment } from 'src/environments/environment.prod';
import { MediatorService } from 'src/app/core/services/mediator/mediator.service';
import { LaboratorysService } from 'src/app/core/services/laboratorys/laboratorys.service';
@Component({
  selector: 'app-dental-center',
  templateUrl: './dental-center.component.html',
  styleUrls: ['./dental-center.component.scss']
})
export class DentalCenterComponent implements OnInit {

  
  url:string;
  imageChangedEvent: any = '';
  croppedImage:any="";

  Currency:currency[];
  Country:country[];
  city:city[];
  mediator:any[]=[];
  laboratorys:any[]=[];
  shippingCompany:shippingCompany[];
  pricingStrategy:any[]=[];

  formDentelCenter: FormGroup;
  submitted = false;
  errors = '';
  loading = false;
  titleForm:String="Add a Dental Center";
  typeForm:Number=0;
  dcId:number=-1;

  Trans:Subscription;
  dentalCenter:any[];
  trans:any;
  breadCrumbItems: Array<{}>;
  constructor(
    private DC:DentalCenterService,
    private modalService:NgbModal,
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private transs:TransService,
    private base64:Imagebase64Service,
    private CurrencyService:CurrencyService,
    private CountryService:CountryService ,
    private CityService:CityService ,
    private EncryptService:EncryptService,
    private shippingComapanyS:ShippingCompanyService,
    private dentecenterServer:DentalCenterService,
    private mediatorService:MediatorService,
    private laboratorysService:LaboratorysService) { 
      this.url=environment.url;
    }

    get fn() { return this.formDentelCenter.controls; }
  ngOnInit() {
    this.Trans=this.transs.trans.subscribe(res=>{
      this.trans=res.key;
      this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' }, { label:"DENTAL CENTERS", path: '/', active: true }];
    });
    
    this.formDentelCenter = this.formBuilder.group({
      dentalCenterName: ['', Validators.required],
      address: ['', Validators.required],
      currencyId: ['', Validators.required],
      countryId: ['', Validators.required],
      cityId: ['', Validators.required],
      mediatorId: ['', Validators.required],
      laboratorysId: ['', Validators.required],
      shippingCompanyId: ['', Validators.required],
      nameOfAdministrator: ['', Validators.required],
    });

    this.formDentelCenter.addControl('id',new FormControl(""));
    this.formDentelCenter.addControl('imagebase64', new FormControl("this.croppedImage"));
    this. getCurrency();
    this.getCountry();
    this.getMediator()
    this.getlaboratorys()
    this.getAll();
    this.getShippingCompany();
    this.pricingStrategy.push({id:1,namePricingStrategy:"pricing 1"});
  }


  
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  onFileSelect(event) : void {
    //check type image 
    let name:string=event.target.files[0].name;
    if(name.split('.')[name.split('.').length-1].toUpperCase()=='PNG'||
       name.split('.')[name.split('.').length-1].toUpperCase()=='JPG' ||
       name.split('.')[name.split('.').length-1].toUpperCase()=='JPEG' ||
       name.split('.')[name.split('.').length-1].toUpperCase()=='TIF')
      {
         this.base64.convertImageToBase64(event.target.files[0]).subscribe(res=>{
          this.imageChangedEvent=res;
         });
      }
      else
      {
        this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
          timeOut :  3000
        });
      }
  }
  getLink(id:number,type=null){
    
    if(type)
    {
      
      return "/DentalCenter/Profile/"+this.EncryptService.Encrypt(id);
    }
    else
    {
      return "/Doctor/Profile/"+this.EncryptService.Encrypt(id);
    }
   }
  getCurrency(){
    this.CurrencyService.getAllAndName().subscribe(res=>{
      this.Currency=res;
    });
  }
  getCountry(){
    this.CountryService.getAllAndName().subscribe(res=>{
      this.Country=res;
    });
  }
  getMediator()
  {
    this.mediatorService.getAllOnline().subscribe(res=>{
      this.mediator=res;
      console.log(this.mediator);
    });
    
  }
  getlaboratorys()
  {
    this.laboratorysService.getAllOnline().subscribe(res=>{
      this.laboratorys=res;
    })
  }
  getShippingCompany(){
    this.shippingComapanyS.getAll().subscribe(res=>{
      this.shippingCompany=res;
    });
    //this.shippingCompany.push({id:1,shippingName:"asdad"});
  }
  onChangeCountry(){
    this.CityService.getAllAndNameById(this.formDentelCenter.get('countryId').value).subscribe(res=>{
      this.city=res;
    });
  }
  getAll(){
    this.DC.getAll().subscribe(res=>{
      this.dentalCenter=res;
    });
  }
  ngOnDestroy() {
    this.Trans.unsubscribe();
  }
  add(content){
    this.formDentelCenter.reset();
    this.formDentelCenter.enable({onlySelf:true});
    this.typeForm=0;
    this.titleForm="Add a Dental Center";
    this.modalService.open(content ,{ backdrop: 'static',size: 'lg' });
  }


  putValueController(id:Number){
    this.formDentelCenter.get('mediatorId').setValue(this.dentalCenter.find(x=>x.id==id).mediatorId);
    this.formDentelCenter.get('id').setValue(this.dentalCenter.find(x=>x.id==id).id);
    this.formDentelCenter.get('dentalCenterName').setValue(this.dentalCenter.find(x=>x.id==id).dentalCenterName);
    this.formDentelCenter.get('address').setValue(this.dentalCenter.find(x=>x.id==id).address);
    this.formDentelCenter.get('currencyId').setValue(this.dentalCenter.find(x=>x.id==id).currencyId);
    this.formDentelCenter.get('countryId').setValue(this.dentalCenter.find(x=>x.id==id).countryId);
    this.formDentelCenter.get('cityId').setValue(this.dentalCenter.find(x=>x.id==id).cityId);
    this.formDentelCenter.get('laboratorysId').setValue(this.dentalCenter.find(x=>x.id==id).laboratorysId);
    this.formDentelCenter.get('shippingCompanyId').setValue(this.dentalCenter.find(x=>x.id==id).shippingCompanyId);
    this.formDentelCenter.get('nameOfAdministrator').setValue(this.dentalCenter.find(x=>x.id==id).nameDoctor);
    this.base64.convertImageUrlToBase64(this.url+'/'+this.dentalCenter.find(x=>x.id==id).logo).subscribe(res=>{
      this.imageChangedEvent=res;
    });
    this.onChangeCountry();
    this.loading=false;
  }

  submit(param:[]){
    if(this.typeForm==0)
    {
      return this.dentecenterServer.create(param);
    }
    else if(this.typeForm==1)
    {
      return this.dentecenterServer.update(param);
    }
    else if(this.typeForm==2)
    {
      return this.dentecenterServer.delete(param);
    }
  
  }

  status(status:number){
    if(status==1)
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  ChangeStatus(event,id:number){
    if(event)
    {
      if(this.dentalCenter.find(x=>x.id==id).mediatorId==null)
      {
        this.toastr.warning("Please link the center with the Corordinator", "warning" ,{
          timeOut :  3000
        });
        this.getAll();
        return;
      }
      if(this.dentalCenter.find(x=>x.id==id).laboratorysId==null)
      {
        this.toastr.warning("lease link the center with the LAB", "warning" ,{
          timeOut :  3000
        });
        this.getAll();
        return;
      }
      if(this.dentalCenter.find(x=>x.id==id).shippingCompanyId==null)
      {
        this.toastr.warning("lease link the center with the shipping Company", "warning" ,{
          timeOut :  3000
        });
        this.getAll();
        return;
      }
      return this.dentecenterServer.deactivate_or_activate(id,1);
    }
    else
    {
      return this.dentecenterServer.deactivate_or_activate(id,0);
    }
  }
  onChangeStatus($event,id:number){
    this.ChangeStatus($event,id).subscribe(res=>{
      if($event)
      {
        this.toastr.success('Activated', "successfull" ,{
          timeOut :  3000
        });
      }
      else
      {
        this.toastr.warning('deactivated', "warning" ,{
          timeOut :  3000
        });
      }
    },err=>{
      if(err=2010)
      {
        this.toastr.warning('error', "warning" ,{
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
  onSubmit(){
    this.submitted=true;
    if(this.formDentelCenter.invalid)
    {
      return;
    }
    this.formDentelCenter.get('imagebase64').setValue(this.croppedImage);
    this.loading = true;
    this.submit(this.formDentelCenter.value).subscribe(res=>{
      if(res.message==2000) //2000 it means this number is added successfully
      {
        this.toastr.success("Record has been successfully added", "successfull" ,{
          timeOut :  3000
        });
      }
      else if(res.message==2001) //2001 it means this number is updated successfully
      {
        this.toastr.success('Record has been successfully updated', "successfull" ,{
          timeOut :  3000
        });
      }
      else if(res.message==2002) //2001 it means this number is deleted successfully
      {
        this.toastr.success('Record has been successfully deleted', "successfull" ,{
          timeOut :  3000
        });
      }
      this.loading = false;
      this.getAll();
      this.submitted = false;
      this.formDentelCenter.reset();
      this.modalService.dismissAll();
    },(err)=>{
      if(err.message==1001)
      {
        this.toastr.error('Error 1001', "error" ,{
          timeOut :  3000
        });
        this.submitted = false;
      }
      else if (err.message==55555){
        this.submitted = false;
        this.toastr.error('Error 3007', "error" ,{
          timeOut :  3000
        });
        
        //this.s_Error.sendErorr(err.message,err.error);
      }
      this.loading = false;
      this.submitted = false;
    });
  }

  edit(content,id:number){
    this.loading=true;
    this.typeForm=1;
    this.formDentelCenter.reset();
    this.titleForm="Edit a Dental Center"
    this.modalService.open(content ,{ backdrop: 'static',size: 'lg' });
    this.formDentelCenter.enable({onlySelf:true});
    this.putValueController(id);
    
  }
  delete(content,id:number){
    this.loading=true;
    this.typeForm=2;
    this.formDentelCenter.reset();
    this.modalService.open(content ,{ backdrop: 'static',size: 'lg' });
    this.formDentelCenter.enable({onlySelf:true});
    this.putValueController(id);
    this.formDentelCenter.disable({onlySelf:true});
    
  }
}

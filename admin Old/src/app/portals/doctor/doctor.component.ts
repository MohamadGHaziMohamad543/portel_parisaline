import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language/language.service';
import { doctor } from 'src/app/core/models/doctor';
import { DoctorService } from 'src/app/core/services/doctor/doctor.service';
import { Subscription } from 'rxjs';
import { TransService } from 'src/app/core/services/translation/trans.service';
import { Imagebase64Service } from 'src/app/core/services/other/imagebase64.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { currency } from 'src/app/core/models/currency';
import { CurrencyService } from 'src/app/core/services/currency/currency.service';
import { CountryService } from 'src/app/core/services/country/country.service';
import { CityService } from 'src/app/core/services/city/city.service';
import { country } from 'src/app/core/models/country';
import { city } from 'src/app/core/models/city';
import { mediator } from 'src/app/core/models/mediator';
import { laboratorys } from 'src/app/core/models/laboratorys';
import { dentalCenter } from 'src/app/core/models/dentalCenters';
import { environment } from 'src/environments/environment.prod';
import {EncryptService} from '../../core/services/encrypt/encrypt.service'
import { shippingCompany } from 'src/app/core/models/shippingCompany';
import { ShippingCompanyService } from 'src/app/core/services/shippingCompany/shipping-company.service';
import { LaboratorysService } from 'src/app/core/services/laboratorys/laboratorys.service';
import { MediatorService } from 'src/app/core/services/mediator/mediator.service';
import { DentalCenterService } from 'src/app/core/services/dentalCenter/dental-center.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {


  url:string;
  imageChangedEvent: any = '';
  croppedImage:any="";

  breadCrumbItems: Array<{}>;
  Trans:Subscription;
  Doctor:Subscription;
  doctor:doctor[];
  trans:any;

  formDoctor: FormGroup;
  submitted = false;
  errors = '';
  loading = false;
  titleForm:String="Add Doctor";
  typeForm:Number=0;
  doctorId:number=-1;
  
  dentalCenter:any[]=[];
  Currency:currency[];
  Country:country[];
  city:city[];
  Mediator:any[]=[];
  laboratorys:any[]=[];
  shippingCompany:shippingCompany[];
  pricingStrategy:any[]=[];
  constructor(private transs:TransService,
    private DoctorService:DoctorService,
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private toastr:ToastrService,
    private lang:LanguageService,
    private base64:Imagebase64Service,
    private CurrencyService:CurrencyService ,
    private CountryService:CountryService ,
    private CityService:CityService ,
    private EncryptService:EncryptService,
    private shippingComapanyS:ShippingCompanyService,
    private laboratorysService:LaboratorysService,
    private mediatorService:MediatorService,
    private dentalCenterService:DentalCenterService,
    private http:HttpClient
    ) {}


  ngOnInit() {
    this.getALLMember();
    this.Trans=this.transs.trans.subscribe(res=>{
      this.trans=res.key;
      this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' }, { label:"DOCTORS", path: '/', active: true }];
    });

    this.url=environment.url;
    this.formDoctor = this.formBuilder.group({
      nameDoctor: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      countryId: ['', Validators.required],
      cityId: ['', Validators.required],
      address: ['', Validators.required],
      Membership: ['', Validators.required],
      Price: ['', Validators.required],
    });
    this.formDoctor.addControl('id',new FormControl(""));
    this.formDoctor.addControl('dentalCenterId',new FormControl(""));
    this.formDoctor.addControl('imagebase64', new FormControl("this.croppedImage"));
    this.Doctor= this.DoctorService.set().subscribe(res=>{
      this.doctor=res;
    });
    this.DoctorService.getAll();
    this.CurrencyService.getAllAndName().subscribe(res=>{
      this.Currency=res;
      
    });
    this.CountryService.getAllAndName().subscribe(res=>{
      this.Country=res;
      
    });

   
    this.getAllShippingCompany();
    this.pricingStrategy.push({id:1,namePricingStrategy:"pricing 1"});
    this.getAllLab();
    this.getAllMed();
  }

  getAllShippingCompany(){
    this.shippingComapanyS.getAll().subscribe(res=>{
      this.shippingCompany=res;
    })
  }
  getAllLab(){
    this.laboratorysService.getAllOnline().subscribe(res=>{
      this.laboratorys=res;
    });
  }
  getAllMed(){
    this.mediatorService.getAllOnline().subscribe(res=>{
      this.Mediator=res;
    });
  }
  onChangeCountry(){
    this.CityService.getAllAndNameById(this.formDoctor.get('countryId').value).subscribe(res=>{
      this.city=res;
    });
  }

  ChangeStatus(event,id:number){
    if(event)
    {
      return this.DoctorService.deactivate_or_activate(id,1);
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
        this.toastr.success("", "successfull" ,{
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


  get fn() { return this.formDoctor.controls; }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  getLink(id:number){
   return "/Doctor/Profile/"+this.EncryptService.Encrypt(id);
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
  ngOnDestroy() {
    this.Trans.unsubscribe();
    this.Doctor.unsubscribe();
  }
  add(content){
    this.formDoctor.reset();
    this.formDoctor.enable({onlySelf:true});
    this.typeForm=0;
    this.modalService.open(content ,{ backdrop: 'static',size: 'lg' });
  }


  putValueController(id:Number){
    this.formDoctor.get('id').setValue(this.doctor.find(x=>x.id==id).id);
    this.formDoctor.get('nameDoctor').setValue(this.doctor.find(x=>x.id==id).nameDoctor);
    this.formDoctor.get('dentalCenterId').setValue(this.doctor.find(x=>x.id==id).dentalCenterId);
    this.formDoctor.get('phoneNumber').setValue(this.doctor.find(x=>x.id==id).phoneNumber);
    this.formDoctor.get('email').setValue(this.doctor.find(x=>x.id==id).email);
    this.formDoctor.get('countryId').setValue(this.doctor.find(x=>x.id==id).countryId);
    this.formDoctor.get('cityId').setValue(this.doctor.find(x=>x.id==id).cityId);
    this.formDoctor.get('address').setValue(this.doctor.find(x=>x.id==id).address);
    this.formDoctor.get('Membership').setValue(this.doctor.find(x=>x.id==id).Membership);
    this.formDoctor.get('Price').setValue(this.doctor.find(x=>x.id==id).Price);
    this.base64.convertImageUrlToBase64(this.url+'/'+this.doctor.find(x=>x.id==id).logo).subscribe(res=>{
      this.imageChangedEvent=res;
    });
    this.onChangeCountry();
    this.loading=false;
  }

  submit(param:[]){
    if(this.typeForm==0)
    {
      return this.DoctorService.create(param);
    }
    else if(this.typeForm==1)
    {
      return this.DoctorService.update(param);
    }
    else if(this.typeForm==2)
    {
      return this.DoctorService.delete(param);
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
  onSubmit(){
    this.submitted=true;
    if(this.formDoctor.invalid)
    {
      return;
    }
    this.formDoctor.get('imagebase64').setValue(this.croppedImage);
    if(this.typeForm==0)
    {
      this.formDoctor.get('dentalCenterId').setValue(-1);
    }
    this.loading = true;
    this.submit(this.formDoctor.value).subscribe(res=>{
      if(res.message==2000) //2000 it means this number is added successfully
      {
        this.toastr.success("Record has been successfully added", "successfull" ,{
          timeOut :  3000
        });
      }
      else if(res.message==2001) //2001 it means this number is updated successfully
      {
        this.toastr.success("Record has been successfully updated", "successfull" ,{
          timeOut :  3000
        });
      }
      else if(res.message==2002) //2001 it means this number is deleted successfully
      {
        this.toastr.success("Record has been successfully deleted", "successfull" ,{
          timeOut :  3000
        });
      }
      this.loading = false;
      this.DoctorService.getAll();
      this.submitted = false;
      this.formDoctor.reset();
      this.modalService.dismissAll();
    },(err)=>{
      if(err.message==1001)
      {
        this.toastr.error(this.trans.users.error_1001, "error" ,{
          timeOut :  3000
        });
        this.submitted = false;
      }
      else if (err.message==55555){
        this.submitted = false;
        this.toastr.error(this.trans.public.error_55555, "error" ,{
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
    this.formDoctor.reset();
    this.modalService.open(content ,{ backdrop: 'static',size: 'lg' });
    this.formDoctor.enable({onlySelf:true});
    this.putValueController(id);
    
  }



  //Memeber
  Membership:any[]=[];
  getALLMember(){
    this.http.post<any>(environment.url+"/PCS/MM/GAM",{}).subscribe(res=>{
      console.log(res);
      this.Membership=res;
    });
  }
}

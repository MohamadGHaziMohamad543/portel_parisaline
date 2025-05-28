import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TransService } from 'src/app/core/services/translation/trans.service';
import { CountryService } from 'src/app/core/services/country/country.service';
import { CityService } from 'src/app/core/services/city/city.service';
import { country } from 'src/app/core/models/country';
import { city } from 'src/app/core/models/city';
import { mediator } from 'src/app/core/models/mediator';
import { environment } from 'src/environments/environment.prod';
import {MediatorService} from '../../core/services/mediator/mediator.service';
import { Imagebase64Service } from 'src/app/core/services/other/imagebase64.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { EncryptService } from 'src/app/core/services/encrypt/encrypt.service';
@Component({
  selector: 'app-mediator',
  templateUrl: './mediator.component.html',
  styleUrls: ['./mediator.component.scss']
})
export class MediatorComponent implements OnInit {

  url:string;
  
  imageChangedEvent: any = '';
  croppedImage:any="";

  breadCrumbItems: Array<{}>;
  Trans:Subscription;
  trans:any;
  mediator:any[];

  Country:country[];
  city:city[];


  kk:boolean=false;
  formMediator: FormGroup;
  submitted = false;
  errors = '';
  loading = false;
  titleForm:String="Add Mediator";
  typeForm:Number=0;
  doctorId:number=-1;
  
  constructor(private transs:TransService,
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private toastr:ToastrService,
    private CountryService:CountryService ,
    private CityService:CityService ,
    private mediatorService:MediatorService,
    private base64:Imagebase64Service,
    private EncryptService:EncryptService,
    ) {}
    get fn() { return this.formMediator.controls; }
  ngOnInit() {
    this.Trans=this.transs.trans.subscribe(res=>{
      this.trans=res.key;
      this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' }, { label:"COORDINATORS", path: '/', active: true }];
    });
    this.url=environment.url;
    this.formMediator = this.formBuilder.group({
      nameMediator: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      countryId: ['', Validators.required],
      cityId: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.required]
    });
    this.formMediator.addControl('id',new FormControl(""));
    this.formMediator.addControl('imagebase64', new FormControl("this.croppedImage"));
    this.getAll();
    this.getCountry();

  }

  getAll(){
    this.mediatorService.getAll().subscribe(res=>{
      this.mediator=res;
    });
  }

  getCountry(){
    this.CountryService.getAllAndName().subscribe(res=>{
      this.Country=res;
    });
  }
  onChangeCountry(){
    this.CityService.getAllAndNameById(this.formMediator.get('countryId').value).subscribe(res=>{
      this.city=res;
    });
  }
  ngOnDestroy() {
    this.Trans.unsubscribe();
  }
  putValueController(id:Number){
    this.formMediator.get('id').setValue(this.mediator.find(x=>x.id==id).id);
    this.formMediator.get('nameMediator').setValue(this.mediator.find(x=>x.id==id).nameMediator);
    this.formMediator.get('phoneNumber').setValue(this.mediator.find(x=>x.id==id).phoneNumber);
    this.formMediator.get('email').setValue(this.mediator.find(x=>x.id==id).email);
    this.formMediator.get('countryId').setValue(this.mediator.find(x=>x.id==id).countryId);
    this.formMediator.get('cityId').setValue(this.mediator.find(x=>x.id==id).cityId);
    this.formMediator.get('postalCode').setValue(this.mediator.find(x=>x.id==id).postalCode);
    this.formMediator.get('address').setValue(this.mediator.find(x=>x.id==id).address);
    this.base64.convertImageUrlToBase64(this.url+'/'+this.mediator.find(x=>x.id==id).logo).subscribe(res=>{
      this.imageChangedEvent=res;
    });
    this.onChangeCountry();
    this.loading=false;
  }
  add(content){
    this.formMediator.reset();
    this.formMediator.enable({onlySelf:true});
    this.typeForm=0;
    this.modalService.open(content ,{ backdrop: 'static',size: 'lg' });
  }

  submit(param:[]){
    if(this.typeForm==0)
    {
      return this.mediatorService.create(param);
    }
    else if(this.typeForm==1)
    {
      return this.mediatorService.update(param);
    }
    else if(this.typeForm==2)
    {
      return this.mediatorService.delete(param);
    }
  
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
      return this.mediatorService.deactivate_or_activate(id,1);
    }
    else
    {
      return this.mediatorService.deactivate_or_activate(id,0);
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
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

  getLink(id:number){
    return "/COO/Profile/"+this.EncryptService.Encrypt(id);
   }
  onSubmit(){
    this.submitted=true;
    if(this.formMediator.invalid)
    {
      return;
    }
    this.loading = true;
    this.formMediator.get('imagebase64').setValue(this.croppedImage);
    this.submit(this.formMediator.value).subscribe(res=>{
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
      this.getAll();
      this.submitted = false;
      this.formMediator.reset();
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
    this.formMediator.reset();
    this.modalService.open(content ,{ backdrop: 'static',size: 'lg' });
    this.formMediator.enable({onlySelf:true});
    this.putValueController(id);
    
  }
  delete(content,id:number){
    this.loading=true;
    this.typeForm=2;
    this.formMediator.reset();
    this.modalService.open(content ,{ backdrop: 'static',size: 'lg' });
    this.putValueController(id);
    this.formMediator.disable({onlySelf:true});
    
  }
}

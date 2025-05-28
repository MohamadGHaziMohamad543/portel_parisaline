import { Component, OnInit,ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment.prod';
import { User } from 'src/app/core/models/user';
import { DpService } from 'src/app/core/services/dp/dp.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransService } from 'src/app/core/services/translation/trans.service';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { SenderrorService } from 'src/app/core/services/error/senderror.service';
import { Imagebase64Service } from 'src/app/core/services/other/imagebase64.service';

@Component({
  selector: 'app-doctorprovider',
  templateUrl: './doctorprovider.component.html',
  styleUrls: ['./doctorprovider.component.scss']
})
export class DoctorproviderComponent implements OnInit {

  USERTYPE=1;
  ID=1;
  url=environment.url;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropperSettings
  @ViewChild(ImageCropperComponent, { static: true }) imageCropper: ImageCropperComponent;

  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  breadCrumbItems: Array<{}>;
  trans:any;
  users:User[];

  formUser: FormGroup;
  submitted = false;
  error = '';
  loading = false;
  titleForm:String="Add Supervisor";
  typeForm:Number=0;
  ControllerPhoto:boolean=true;
  constructor(private base64:Imagebase64Service, private s_Error:SenderrorService, private http:HttpClient,private toastr: ToastrService,private transs:TransService,private formBuilder: FormBuilder,private modalService: NgbModal,private usersService:DpService) {
    //observabel translation object
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
    transs.trans.subscribe(res=>{
      this.trans=res.key
    });
   }

  ngOnInit() {
    //Validate all field form
    this.formUser = this.formBuilder.group({
      first_name: ['', Validators.required],
      telephone_number: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    //set title root
    this.breadCrumbItems = [{ label: 'HOME', path: '/' }, { label: 'Supervisor', path: '/', active: true }];

    //get all users 
    this.usersService.getUsers().subscribe(res=>{
      if(res)
      {
        this.users=res;
      }
    });
    //create controller image base64
    this.formUser.addControl('imagebase64', new FormControl("this.croppedImage"));
    this.formUser.addControl('id', new FormControl(-1));
    this.usersService.getAll();
  }

  ngAfterViewInit() {
    this.formUser.controls.telephone_number.setValue('+919898989898');
  }

  // convenience getter for easy access to form fields
  get f() { return this.formUser.controls; }

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

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  /*
   Informtion Mode
   Add : 0
   Edit : 1
   Remove : 2
  */
 
  //Open Modal in (0) mode 
  addUser(content: string) {
    this.enableController(null,true);
    this.ControllerPhoto=true;
    this.typeForm=0;
    this.titleForm="add Supervisor";
    this.formUser.reset();
    this.modalService.open(content,{ backdrop: 'static' });
    this.imageChangedEvent='';
  }
  
  //Open Modal in (1) mode
  editUser(content: string,id:number) {
    this.putValueController(id);
    this.disableController('email');
    this.ControllerPhoto=true;
    this.typeForm=1;
    this.titleForm="edit Supervisor";
    this.modalService.open(content,{ backdrop: 'static' });
    this.base64.convertImageUrlToBase64(this.url+'/'+this.users.find(x=>x.id==id).photo).subscribe(res=>{
      this.imageChangedEvent=res;
    });
  }
  //Open Modal in (2) mode
  removeUser(content: string,id:number) {
    this.loading = true;
    this.putValueController(id);
    this.disableController(null,true);
    this.ControllerPhoto=false;
    this.formUser.get('id').setValue(id);
    this.typeForm=2;
    this.titleForm=this.trans.users.TitleForm_remove_Users;
    this.modalService.open(content,{ backdrop: 'static' });
    this.base64.convertImageUrlToBase64(this.url+'/'+this.users.find(x=>x.id==id).photo).subscribe(res=>{
      this.imageChangedEvent=res;
      this.loading = false;
    },err=>{
      this.loading = false;
    });
    
  }

  //this submit formUsers
  onSubmit() {
    this.submitted = true;
    if (this.formUser.invalid) {
      return;
    }
    this.formUser.get('imagebase64').setValue(this.croppedImage);
    this.loading = true;
    this.submit(this.formUser.value).subscribe(res=>{
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
      this.usersService.getAll();
      this.submitted = false;
      this.formUser.reset();
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
        
        this.s_Error.sendErorr(err.message,err.error);
      }
      this.loading = false;
      this.submitted = false;
    });
    
  }

  submit(param:[]){
    if(this.typeForm==0)
    {
      return this.usersService.addUser(param);
    }
    else if(this.typeForm==1)
    {
      return this.usersService.updateUser(param);
    }
    else if(this.typeForm==2)
    {
      return this.usersService.deleteUser(param);
    }
  
  }

  putValueController(id:Number){
    this.formUser.get('id').setValue(this.users.find(x=>x.id==id).id);
    this.formUser.get('email').setValue(this.users.find(x=>x.id==id).email);
    this.formUser.get('first_name').setValue(this.users.find(x=>x.id==id).first_name);
    this.formUser.get('last_name').setValue(this.users.find(x=>x.id==id).last_name);
    this.formUser.get('telephone_number').setValue(this.users.find(x=>x.id==id).telephone_number.toString());
    this.formUser.get('password').setValue("dee234e90f63e76afc88087c98b6fa46");
  }

  OpenPermission(content,id:number){
    this.ID=this.users.find(x=>x.id==id).id;
    this.modalService.open(content,{ backdrop: 'static' ,size: 'lg'});
  }
  disableController(namecontroller:string="",All:boolean=false)
  {
    if(All)
    {
      this.formUser.disable({onlySelf:true});

    }
    else
    {
      this.formUser.get(namecontroller).disable({onlySelf:true});
    }
   
  }
  enableController(namecontroller:string="",All:boolean=false)
  {
    if(All)
    {
      this.formUser.enable({onlySelf:true});
    }
    else
    {
      this.formUser.get(namecontroller).enable({onlySelf:true});
    }
  }

}

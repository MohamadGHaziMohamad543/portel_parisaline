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
import { environment } from 'src/environments/environment.prod';
import {PatientService} from '../../core/services/patient/patient.service';
import { EncryptService } from 'src/app/core/services/encrypt/encrypt.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  url:string;
  breadCrumbItems: Array<{}>;
  Trans:Subscription;
  trans:any;
  patient:any[]=[];
  patientold:any[]=[];
  Country:country[];
  city:city[];


  URLStatic="";
  formPatient: FormGroup;
  submitted = false;
  errors = '';
  loading = false;
  titleForm:String="Add Patient";
  typeForm:Number=0;
  doctorId:number=-1;
  caseStatus:number=-1;
  caseStatusText:string="All";
  constructor(
    private transs:TransService,
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private toastr:ToastrService,
    private CountryService:CountryService ,
    private CityService:CityService ,
    private patientService:PatientService,
    private encryptService:EncryptService,
    private http:HttpClient,
    ) {

      this.URLStatic=environment.url+'/';
    }

    //tabel test
    

    page = 1;
    pageSize = 10;
    collectionSize =0;
    old:number=0;

    changeTabel(event,type=0)
    {
      if(type==0)
      {
        this.page=event
        this.patientold= this.patient.map((patient, i) => ({id: i + 1, ...patient})).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      }
      else
      {
        this.patientold = this.patient.map((patient, i) => ({id: i + 1, ...patient})).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      }

    }

    casesId:number=-1;
    supervisorId:any;
    supervisor:any[]=[];
    openModelSuperVisor(id,model){
      this.casesId=id;
      this.modalService.open(model,{ backdrop: 'static',size: 'lg' });
    }
    SetSuperVisor(){
      this.http.post<any>(environment.url+"/cases/SSV",{id:this.casesId,supervisor:this.supervisorId}).subscribe(res=>{
        this.toastr.success("Successfully","");
        this.modalService.dismissAll();
        
      });
    }

    changeVlaueVisror(event){
      this.supervisorId=event.id;
    }
    getSuperVisro(){
      this.http.post<any>(environment.url+"/doctorProvider/getall",{}).subscribe(res=>{
        this.supervisor=res;
      });
     }

    get fn() { return this.formPatient.controls; }
    ngOnInit() {
      this.Trans=this.transs.trans.subscribe(res=>{
        this.trans=res.key;
        this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' }, { label:"PATIENTS", path: '/', active: true }];
      });
      this.url=environment.url;
      this.formPatient = this.formBuilder.group({
        namePatient: ['', Validators.required],
        countryId: ['', Validators.required],
        email: ['', Validators.required],
        cityId: ['', Validators.required],
        address: ['', Validators.required],
        phoneNumber: ['', Validators.required]
      });
      this.formPatient.addControl('id',new FormControl(""));
      this.formPatient.addControl('doctorId',new FormControl(environment.id));
      this.formPatient.addControl('dentalCenterId',new FormControl(-1));
      this.getAll(this.caseStatus);
      this.getSuperVisro();
  
    }
  

    getLink(id:number){
      return "/status/"+this.encryptService.Encrypt(id);
     }

    getAll(caseStatus:number){
      this.patientService.getAll(caseStatus).subscribe(res=>{
        this.patient=res;
        this.patientold= this.patient.map((patient, i) => ({
          id: i + 1, ...patient}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);;
        this.collectionSize=res.length;
      });
    }
  
    changeCasesStatus(number,caseStatusText){
      this.caseStatus=number;
      this.caseStatusText=caseStatusText;
      this.getAll(this.caseStatus);
    }
    getCountry(){
      this.CountryService.getAllAndName().subscribe(res=>{
        this.Country=res;
      });
    }
    onChangeCountry(){
      this.CityService.getAllAndNameById(this.formPatient.get('countryId').value).subscribe(res=>{
        this.city=res;
      });
    }
    ngOnDestroy() {
      this.Trans.unsubscribe();
    }
    putValueController(id:Number){
      this.formPatient.get('id').setValue(this.patient.find(x=>x.id==id).id);
      this.formPatient.get('namePatient').setValue(this.patient.find(x=>x.id==id).namePatient);
      this.formPatient.get('countryId').setValue(this.patient.find(x=>x.id==id).countryId);
      this.formPatient.get('cityId').setValue(this.patient.find(x=>x.id==id).cityId);
      this.formPatient.get('address').setValue(this.patient.find(x=>x.id==id).address);
      this.formPatient.get('phoneNumber').setValue(this.patient.find(x=>x.id==id).phoneNumber);
      this.formPatient.get('email').setValue(this.patient.find(x=>x.id==id).email);
      
      this.onChangeCountry();
      this.loading=false;
    }
    add(content){
      this.formPatient.reset();
      this.formPatient.enable({onlySelf:true});
      this.typeForm=0;
      this.modalService.open(content ,{ backdrop: 'static',size: 'lg' });
    }
  
    submit(param:[]){
      if(this.typeForm==0)
      {
        return this.patientService.create(param);
      }
      else if(this.typeForm==1)
      {
        return this.patientService.update(param);
      }
      else if(this.typeForm==2)
      {
      }
    
    }
  


    onSubmit(){
      this.submitted=true;
      if(this.formPatient.invalid)
      {
        return;
      }
      this.loading = true;
      this.formPatient.get('doctorId').setValue(environment.id);
      this.formPatient.get('dentalCenterId').setValue(-1);
      this.submit(this.formPatient.value).subscribe(res=>{
        if(res.message==2000) //2000 it means this number is added successfully
        {
          this.toastr.success("Patient Added Successfully", "successfull" ,{
            timeOut :  3000
          });
        }
        else if(res.message==2001) //2001 it means this number is updated successfully
        {
          this.toastr.success("Patient Updated Successfully", "successfull" ,{
            timeOut :  3000
          });
        }
        else if(res.message==2002) //2001 it means this number is deleted successfully
        {
          this.toastr.success("Patient Deleted Successfully", "successfull" ,{
            timeOut :  3000
          });
        }
        this.loading = false;
        this.getAll(this.caseStatus);
        this.submitted = false;
        this.formPatient.reset();
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
      this.formPatient.reset();
      this.modalService.open(content ,{ backdrop: 'static',size: 'lg' });
      this.formPatient.enable({onlySelf:true});
      this.putValueController(id);
      
    }
    delete(content,id:number){
      this.loading=true;
      this.typeForm=2;
      this.formPatient.reset();
      this.modalService.open(content ,{ backdrop: 'static',size: 'lg' });
      this.putValueController(id);
      this.formPatient.disable({onlySelf:true});
      
    }
}

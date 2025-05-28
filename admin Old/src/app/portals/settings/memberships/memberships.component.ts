import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-memberships',
  templateUrl: './memberships.component.html',
  styleUrls: ['./memberships.component.scss']
})
export class MembershipsComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  constructor(private http:HttpClient,
    private modelServices:NgbModal,
    private formBuilder:FormBuilder,
    private tost:ToastrService
    ) { 
         //set Validators formMembership
         this.formMemberships = this.formBuilder.group({
          nameMembership: ['', Validators.required],
          percentage: ['', this.ssnValidator],
        });
        this.breadCrumbItems = [{ label: 'SETTINGS', path: '/' }, { label: 'Memberships', path: '/', active: true }];

  }

  ssnValidator(control: FormControl): {[key: string]: any} {
    if((parseInt(control.value) || control.value==0)  && parseInt(control.value) <= 100 && parseInt(control.value) >= 0)
    {
      return null;
    }
    else
    {
      return {ssn: true};
    }
  }
  ngOnInit() {
 
      this.formMemberships.addControl('id', new FormControl(-1));
      this.getAll();
  }
  Memberships:any[]=[];
  
  formMemberships: FormGroup;
  getAll(){
    this.http.post<any>(environment.url+"/memberships/getAll",{}).subscribe(res=>{
      this.Memberships=res;
    });
  }

  error = '';
  get f() { return this.formMemberships.controls; }
  titleForm:string="";
  submitted:boolean=false;
  idStatic:number=0;
  showModelMemberships(model,idStatic=null){
    this.submitted=false;
    if(idStatic)
    {
      this.formMemberships.reset();
      this.titleForm="Edit Membership"
      this.idStatic=idStatic;
      let mem= this.Memberships.find(x=>x.id==idStatic);
      this.formMemberships.get("nameMembership").setValue(mem.nameMembership);
      this.formMemberships.get("percentage").setValue(mem.percentage);
      this.formMemberships.get("id").setValue(mem.id);
    }
    else{
      this.titleForm="Add Membership"
      this.idStatic=-1;
      this.formMemberships.reset();
    }
    this.modelServices.open(model,{ backdrop: 'static' });
  }

  create(){
    this.submitted=true;
    if(!this.formMemberships.valid)
    {
      return;
    }
    this.http.post<any>(environment.url+'/memberships/create',this.formMemberships.value).subscribe(res=>{
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
    if(!this.formMemberships.valid)
    {
      return;
    }
    this.http.post<any>(environment.url+'/memberships/update',this.formMemberships.value).subscribe(res=>{
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

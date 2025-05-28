import { Component, OnInit, Input } from '@angular/core';
import {PermissionsService} from 'src/app/core/services/permissions/permissions.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

  permissions=[];
  @Input('ID') ID: number;
  @Input('USERTYPE') USERTYPE: number;
  formPermission: FormGroup;
  submitted = false;
  errors = '';
  loading = false;
  titleForm:String="Add Doctor";
  typeForm:Number=0;
  permissionId:number=-1;
  constructor(private prem:PermissionsService,
    private auth:AuthenticationService,
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private toastr:ToastrService) { }
  get fn() { return this.formPermission.controls; }
  ngOnInit() {
    this.formPermission = this.formBuilder.group({
      section: ['', Validators.required],
    });
    this.formPermission.addControl("userType",new FormControl(this.USERTYPE));
    this.formPermission.addControl("userId",new FormControl(this.ID));
    this.LoadAll();
    
  }

  LoadAll(){
    this.prem.get(this.USERTYPE,this.ID).subscribe(res=>{
      this.permissions=res;
    });
  }

  AddPermissions(content){
    this.formPermission.reset();
    this.modalService.open(content ,{ backdrop: 'static',size: 'lg' });
  }

  createPermissions(){
    this.submitted=true;
    if(this.formPermission.invalid)
    {
      return;
    }
    this.formPermission.get("userType").setValue(this.USERTYPE);
    this.formPermission.get("userId").setValue(this.ID);
    this.prem.create(this.formPermission.value).subscribe(res=>{
      if(res.message==1001)
      {
        this.toastr.warning("this scetion exists");
      }
      else if(res.message==2000)
      {
        this.toastr.success("Create seccsufly");
        this.LoadAll();
      }
    },err=>{
      this.toastr.warning("Error System");
    });
  }
  updateRead(event,id){
   this.prem.uRead({read:event,id:id}).subscribe(res=>{
     if(res.message==2001)
     {
       this.toastr.success("Update seccsufly");
       this.LoadAll();
     }
   });
  }
  updateInsert(event,id){
    this.prem.uInsert({insert:event,id:id}).subscribe(res=>{
      if(res.message==2001)
      {
        this.toastr.success("Update seccsufly");
      }
    });
   }
   updateDelete(event,id){
    this.prem.uDelete({delete:event,id:id}).subscribe(res=>{
      if(res.message==2001)
      {
        this.toastr.success("Update seccsufly");
        this.LoadAll();
      }
    });
   }
   updateUpdate(event,id){
    this.prem.uUpdate({update:event,id:id}).subscribe(res=>{
      if(res.message==2001)
      {
        this.toastr.success("Update seccsufly");
        this.LoadAll();
      }
    });
   }
   updateView(event,id){
    this.prem.uView({view:event,id:id}).subscribe(res=>{
      if(res.message==2001)
      {
        this.toastr.success("Update seccsufly");
        this.LoadAll();
      }
    });
   }
}

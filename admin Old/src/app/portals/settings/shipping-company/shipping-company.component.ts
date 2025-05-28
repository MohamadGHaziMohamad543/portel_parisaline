import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransService } from 'src/app/core/services/translation/trans.service';
import { Subscription } from 'rxjs';
import { ShippingCompanyService } from 'src/app/core/services/shippingCompany/shipping-company.service';
import { shippingCompany } from 'src/app/core/models/shippingCompany';
import { shippingParam } from 'src/app/core/models/shippingParam';

@Component({
  selector: 'app-shipping-company',
  templateUrl: './shipping-company.component.html',
  styleUrls: ['./shipping-company.component.scss']
})
export class ShippingCompanyComponent implements OnInit {

  Trans:Subscription;
  trans:any;
  shippingName=new FormControl("");
  shippingCompany:shippingCompany[];
  shippingParam:shippingParam[];
  breadCrumbItems: Array<{}>;
  key=new FormControl("");
  value=new FormControl("");
  typeForm=0;
  titleForm="add Param";
  idParam=0;
  shippingCompanyId:number;
  constructor(
    private toastr:ToastrService,
    private modal:NgbModal,
    private transs:TransService,
    private shipp:ShippingCompanyService
  ) { }

  ngOnInit() {
    this.Trans= this.transs.trans.subscribe(res=>{
      this.trans=res;
      this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' },{ label: "SETTINGS", path: '/', active: true }, { label: "SHIPPING SETTINGS", path: '/', active: true }];
    });
    this.getAllCompany();
  }

  getAllCompany(){
    this.shipp.getAll().subscribe(res=>{
      this.shippingCompany=res;
    });
  }
  AddCompany(content){
    this.shippingName.setValue("");
    this.modal.open(content,{backdrop:'static'});
  }

  getAllParam(shippingCompanyId:number){
    this.shippingCompanyId=shippingCompanyId;
    this.shipp.getParamById(shippingCompanyId).subscribe(res=>{
      this.shippingParam=res;
    });
  }

  createCompany()
  {
    if(this.shippingName.value=="")
    {
      this.toastr.warning("please input all filed ");
      return;
    }
    this.shipp.create({shippingName:this.shippingName.value}).subscribe(res=>{
      if(res.message==2000)
      {
        this.toastr.success("this compaby created successfuly");
      }
      this.getAllCompany();
      this.modal.dismissAll();
    },err=>{
      if(err.message==55555)
      {
        this.toastr.error("Unkniow Error ","Error");
      }
      else if(err.message==1001)
      {
        this.toastr.warning("this company is exsit please add other company ");
      }
    });
    
  }


  getStatus(status:number){
    if(status==1)
    {
      return true;
    }
    else{
      return false;
    }
  }
  DeleteCompany(id:number){
    this.shipp.delete(id).subscribe(res=>{
      this.toastr.warning("this company dileted ","Delete");
    });
  }
  onChangeStatus($event,id:number){
    let status=0;
    if($event==true)
    {
      status=1;
    }
    this.shipp.activeAndDeActivted(id,status).subscribe(res=>{
      if($event==1)
      {
        this.toastr.success("this is activted");
      }
      else{
        this.toastr.warning("this is company is deactvited");
      }
      this.getAllCompany();
    },err=>{
      this.toastr.warning("this prossing is not compleated");
      this.getAllCompany();
    });
  }
  putValueControllerParam(id:number){
    this.key.setValue(this.shippingParam.find(x=>x.id==id).key);
    this.value.setValue(this.shippingParam.find(x=>x.id==id).value);
  }
  clearParamValue()
  {
    this.key.setValue("");
    this.value.setValue("");
  }
  EnableParam(){
    this.key.enable({onlySelf:true});
    this.value.enable({onlySelf:true});
  }
  DisableParam(){
    this.key.disable({onlySelf:true});
    this.value.disable({onlySelf:true});
  }
  AddParam(content){
    this.clearParamValue();
    this.EnableParam();
    this.typeForm=0;
    this.idParam=-1;
    this.titleForm="Add Param Form";
    this.modal.open(content,{backdrop:"static"});
  }
  EditParam(content,id:number)
  {
    this.putValueControllerParam(id);
    this.EnableParam();
    this.typeForm=1;
    this.idParam=id;
    this.titleForm="Edit Value Param ";
    this.modal.open(content,{backdrop:"static"});
  }

  DeleteParam(content,id:number)
  {
    this.putValueControllerParam(id);
    this.DisableParam();
    this.idParam=id;
    this.typeForm=2;
    this.titleForm="Delete Paramter ";
    this.modal.open(content,{backdrop:"static"});
  }

  Onsubmit(param){
    if(this.typeForm==0)
    {
      return this.shipp.createParam(param);
    }
    else if(this.typeForm==1)
    {
      return this.shipp.updateParam(param);
    }
    else if(this.typeForm==2)
    {
      return this.shipp.deleteParam(this.idParam);
    }
  }

  submitParam(){
    this.Onsubmit({id:this.idParam,key:this.key.value,value:this.value.value,shippingCompanyId:this.shippingCompanyId}).subscribe((res:any)=>{
      if(res.message==2000)
      {
        this.toastr.success("this compaby created successfuly");
      }
      else if(res.message==2001)
      {
        this.toastr.success("this compaby created update");
      }
      else if(res.message==2002)
      {
        this.toastr.success("this compaby created Delete");
      }
      this.getAllParam(this.shippingCompanyId);
      this.modal.dismissAll();
    },err=>{
      if(err.message==55555)
      {
        this.toastr.error("Unkniow Error ","Error");
      }
      else if(err.message==1001)
      {
        this.toastr.warning("this company is exsit please add other company ");
      }
    });
  }
}

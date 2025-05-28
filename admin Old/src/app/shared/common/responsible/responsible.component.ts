import { Component, OnInit, Input } from '@angular/core';
import { ResponsibleService } from 'src/app/core/services/responsible/responsible.service';
import { responsible } from 'src/app/core/models/responsible';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-responsible',
  templateUrl: './responsible.component.html',
  styleUrls: ['./responsible.component.scss']
})
export class ResponsibleComponent implements OnInit {

  @Input('ID') ID: number;
  @Input('USERTYPE') USERTYPE: string;
  responsible:responsible[];
  formResponsible:FormGroup;
  typeForm:number;
  submitted:boolean;
  errors:String;
  titelForm:string;
  constructor(
    private responsibleService:ResponsibleService,
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private toastr:ToastrService,) { }

  ngOnInit() {
    this.getAll();
    this.formResponsible = this.formBuilder.group({
      fullName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });

    //create controller form bulder 
    this.formResponsible.addControl('id',new FormControl(''));
    this.formResponsible.addControl('userType',new FormControl(this.USERTYPE));
    this.formResponsible.addControl('userId',new FormControl(this.ID));

  }
  get fn() { return this.formResponsible.controls; }
  getAll(){
    this.responsibleService.getAllById(this.ID,this.USERTYPE).subscribe(res=>{
      this.responsible=res;
    });
  }
  putValueController(id:number){
    this.formResponsible.get('id').setValue(this.responsible.find(x=>x.id==id).id);
    this.formResponsible.get('email').setValue(this.responsible.find(x=>x.id==id).email);
    this.formResponsible.get('fullName').setValue(this.responsible.find(x=>x.id==id).fullName);
    this.formResponsible.get('jobTitle').setValue(this.responsible.find(x=>x.id==id).jobTitle);
    this.formResponsible.get('phone').setValue(this.responsible.find(x=>x.id==id).phone);
    this.formResponsible.get('userType').setValue(this.USERTYPE);
    this.formResponsible.get('userId').setValue(this.ID);
  }
  
  Add(content){
    this.titelForm="Add Responsible";
    this.formResponsible.reset();
    this.formResponsible.get('userType').setValue(this.USERTYPE);
    this.formResponsible.get('userId').setValue(this.ID);
    this.formResponsible.enable({onlySelf:true});
    this.typeForm=0;
    this.modalService.open(content ,{ backdrop: 'static' });
  }
  Edit(content,id:number){
    this.titelForm="Edit Responsible";
    this.formResponsible.reset();
    this.putValueController(id);
    this.formResponsible.enable({onlySelf:true});
    this.typeForm=1;
    this.modalService.open(content ,{ backdrop: 'static' });
  }
  Delete(content,id:number){
    this.titelForm="Delete Responsible";
    this.formResponsible.reset();
    this.formResponsible.disable({onlySelf:true});
    this.putValueController(id);
    this.typeForm=2;
    this.modalService.open(content,{backdrop:'static'});
  }
  submit(param:[]){
    if(this.typeForm==0)
    {
      return this.responsibleService.create(param);
    }
    else if(this.typeForm==1)
    {
      return this.responsibleService.update(param);
    }
    else if(this.typeForm==2)
    {
      return this.responsibleService.delete(param);
    }
  }
  onSubmit(){
    this.submitted=true;
    if(this.formResponsible.invalid)
    {
      return;
    }
    this.submit(this.formResponsible.value).subscribe(res=>{
      if(res.message==2000)
      {
        this.toastr.success("The administrator has been created successfully","successful");
      }
      else if(res.message==2001)
      {
        this.toastr.success("The data was successfully updated","updated");
      }
      else if(res.message==2002)
      {
        this.toastr.warning("The data has been deleted","deleted");
      }

      this.submitted=false;
      this.modalService.dismissAll();
      this.getAll();
    },err=>{
      if(err==55555)
      {
        this.toastr.error("Unknown error","Error");
      }
      else if(err==1001)
      {
        this.toastr.warning("this email exssites","exsistes");
      }
    });
  }

}

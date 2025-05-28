import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-case-stage',
  templateUrl: './case-stage.component.html',
  styleUrls: ['./case-stage.component.scss']
})
export class CaseStageComponent implements OnInit {


  breadCrumbItems: Array<{}>;
  constructor(private http:HttpClient,
    private modelServices:NgbModal,
    private formBuilder:FormBuilder,
    private tost:ToastrService
    ) { 
         //set Validators formMembership
         this.formBarcodes = this.formBuilder.group({
          nameStage: ['', Validators.required],
          numberStage: ['', Validators.required],
          color: ['', Validators.required],
          type: ['', Validators.required],
          sort: ['', Validators.required],
          ShowStage: ['', Validators.required],
        });
        this.breadCrumbItems = [{ label: 'SETTINGS', path: '/' }, { label: 'Case Stages', path: '/', active: true }];

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
      this.formBarcodes.addControl('id', new FormControl(-1));
      this.getAll();
  }


  editor:any;
  valueNotes:any;
  getEditor(event){
    this.editor=event;
  }


  Stages:any[]=[];
  formBarcodes: FormGroup;
  getAll(){
    this.http.post<any>(environment.url+"/caseStages/get",{}).subscribe(res=>{
      this.Stages=res;
    });
  }

  StageType=[
    {nameType:'Internal',id:1},
    {nameType:'External',id:0},
  ]
  error = '';
  get f() { return this.formBarcodes.controls; }
  titleForm:string="";
  submitted:boolean=false;
  idStatic:number=0;
  showModelMemberships(model,idStatic=null){
    this.submitted=false;
    if(idStatic)
    {
      this.formBarcodes.reset();
      this.titleForm="Edit Barcodes"
      this.idStatic=idStatic;
      let mem= this.Stages.find(x=>x.id==idStatic);
      this.formBarcodes.get("nameStage").setValue(mem.nameStage);
      this.formBarcodes.get("numberStage").setValue(mem.numberStage);
      this.formBarcodes.get("type").setValue(mem.type);
      this.formBarcodes.get("color").setValue(mem.color);
      this.formBarcodes.get("sort").setValue(mem.sort);
      this.formBarcodes.get("ShowStage").setValue(mem.ShowStage);
      this.formBarcodes.get("id").setValue(mem.id);
      this.valueNotes=mem.Contents;
    }
    else{
      this.titleForm="Add Stage"
      this.idStatic=-1;
      this.formBarcodes.reset();
    }
    this.modelServices.open(model,{ backdrop: 'static' });
  }

  create(){
    this.submitted=true;
    if(!this.formBarcodes.valid)
    {
      return;
    }
    this.http.post<any>(environment.url+'/caseStages/createAndUpdate',this.formBarcodes.value).subscribe(res=>{
      if(res.message==2000)
      {
        this.getAll();
        this.modelServices.dismissAll();
        this.tost.success("Record added successfully","successful");
        
      }
      else if(res.message==2001)
      {
        this.getAll();
        this.modelServices.dismissAll();
        this.tost.success("Record Updateded successfully","successful");
      }
    });
  }

  Save(){
    this.create();
  }



}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-submtion-text',
  templateUrl: './submtion-text.component.html',
  styleUrls: ['./submtion-text.component.scss']
})
export class SubmtionTextComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  constructor(private http:HttpClient,
    private modelServices:NgbModal,
    private formBuilder:FormBuilder,
    private tost:ToastrService
    ) { 
         //set Validators formMembership
         this.formBarcodes = this.formBuilder.group({
          nameKey: ['', Validators.required],
          shurtContent: ['', Validators.required],
        });
        this.breadCrumbItems = [{ label: 'SETTINGS', path: '/' }, { label: 'Submtion Text', path: '/', active: true }];

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
      this.formBarcodes.addControl('Content', new FormControl(-1));
      this.getAll();
  }


  editor:any;
  valueNotes:any;
  getEditor(event){
    this.editor=event;
  }


  Submtion:any[]=[];
  formBarcodes: FormGroup;
  getAll(){
    this.http.post<any>(environment.url+"/SubmtionText/get",{}).subscribe(res=>{
      this.Submtion=res;
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
      this.titleForm="Edit Content"
      this.idStatic=idStatic;
      let mem= this.Submtion.find(x=>x.id==idStatic);
      this.formBarcodes.get("nameKey").setValue(mem.nameKey);
      this.formBarcodes.get("shurtContent").setValue(mem.shurtContent);
      this.formBarcodes.get("id").setValue(mem.id);
      this.valueNotes=mem.Content;
    }
    else{
      this.titleForm="Add Key"
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
    this.formBarcodes.get('Content').setValue(this.editor.getData())
    this.http.post<any>(environment.url+'/SubmtionText/createAndUpdate',this.formBarcodes.value).subscribe(res=>{
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

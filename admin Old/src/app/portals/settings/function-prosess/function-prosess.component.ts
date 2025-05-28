import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-function-prosess',
  templateUrl: './function-prosess.component.html',
  styleUrls: ['./function-prosess.component.scss']
})
export class FunctionProsessComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  constructor(private http:HttpClient,
    private modelServices:NgbModal,
    private formBuilder:FormBuilder,
    private tost:ToastrService
    ) { 
         //set Validators formMembership
         this.formBarcodes = this.formBuilder.group({
          nameFun: ['', Validators.required],
          typeFun: ['', Validators.required],
          numberStatus: [''],
          emailContent: [''],
          typeUser: [''],
          idUser: [''],
        });
        this.breadCrumbItems = [{ label: 'SETTINGS', path: '/' }, { label: 'Functions', path: '/', active: true }];

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
      this.getStage();
      this.GetUsers();
  }

  editor:any;
  valueNotes:any;
  getEditor(event){
    this.editor=event;
  }


  Func:any[]=[];
  formBarcodes: FormGroup;
  getAll(){
    this.http.post<any>(environment.url+"/FUN/get",{}).subscribe(res=>{
      console.log("Result Function Array");
      console.log(res);
      this.Func=res;
    });
  }

  typeFun=[
    {nameType:'Change Stage',id:0},
    {nameType:'Send Emai',id:1},
    {nameType:'Send WhatsApp',id:3},
    {nameType:'Script',id:2},
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
      this.titleForm="Edit Function"
      this.idStatic=idStatic;
      let mem= this.Func.find(x=>x.id==idStatic);
      this.formBarcodes.get("nameFun").setValue(mem.nameFun);
      this.formBarcodes.get("typeFun").setValue(mem.typeFun);
      this.formBarcodes.get("numberStatus").setValue(mem.numberStatus);
      this.formBarcodes.get("emailContent").setValue(mem.emailContent);
      this.formBarcodes.get("typeUser").setValue(mem.typeUser);
      this.formBarcodes.get("idUser").setValue(mem.idUser);
      this.formBarcodes.get("id").setValue(mem.id);
      this.valueNotes=mem.emailContent;
    }
    else{
      this.titleForm="Add Function"
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
    if(this.formBarcodes.get('typeFun').value===0)
    {
      this.formBarcodes.get('emailContent').setValue('');
      this.formBarcodes.get('typeUser').setValue(-1);
      this.formBarcodes.get('idUser').setValue(-1);
    }
    else if(this.formBarcodes.get('typeFun').value==1){
      this.formBarcodes.get('numberStatus').setValue(-1);
      this.formBarcodes.get('emailContent').setValue(this.editor.getData());
    }
    else if(this.formBarcodes.get('typeFun').value==2){

    }
    else if(this.formBarcodes.get('typeFun').value==3){
      this.formBarcodes.get('numberStatus').setValue(-1);
      this.formBarcodes.get('emailContent');

    }
    this.http.post<any>(environment.url+'/FUN/createAndUpdate',this.formBarcodes.value).subscribe(res=>{
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


  
  //get STage
  Stages=[];
  getStage(){
    this.http.post<any>(environment.url+"/caseStages/get",{}).subscribe(res=>{
      this.Stages=res;
    });
  }


  //users
  typeUsers=[
    {nameType:'Doctor',id:2},
    {nameType:'LAB',id:3},
    {nameType:'coordinator',id:4},
    {nameType:'Treatment Planners',id:5},
    {nameType:'SuperVisor',id:7},
    {nameType:'Accounntant',id:9}
  ]
  Users=[];
  GetUsers(type=false){
    let linkSe="";
    if(this.formBarcodes.get('typeUser').value==2)
    {
        linkSe='/TAS/GetD';
    }
    if(this.formBarcodes.get('typeUser').value==3)
    {
        linkSe="/TAS/GetL";
    }
    else if(this.formBarcodes.get('typeUser').value==4)
    {
        linkSe="/TAS/GetC";
    }
    else if(this.formBarcodes.get('typeUser').value==5)
    {
        linkSe="/TAS/GetT";
    }
    else if(this.formBarcodes.get('typeUser').value==7)
    {
        linkSe="/TAS/GetS";
    }
    else if(this.formBarcodes.get('typeUser').value==9)
    {
        linkSe="/TAS/GetA";
    }
    this.http.post<any>(environment.url+"/PCS/"+linkSe,{}).subscribe(res=>{
      if(type && this.formBarcodes.get('typeUser').value==2){
        this.Users=[{id:-1,userName:"Doctor for this case"}];
      }
      else{
        this.Users=res.data;
      }
    });
  }

}

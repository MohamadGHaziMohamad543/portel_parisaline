import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-barcodes',
  templateUrl: './barcodes.component.html',
  styleUrls: ['./barcodes.component.scss']
})
export class BarcodesComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  constructor(private http:HttpClient,
    private modelServices:NgbModal,
    private formBuilder:FormBuilder,
    private tost:ToastrService
    ) { 
         //set Validators formMembership
         this.formBarcodes = this.formBuilder.group({
          name: ['', Validators.required],
          productType: ['', Validators.required],
          productsName: ['', Validators.required],
          GTIN: ['', Validators.required],
          Control: ['', Validators.required],
          PCSUN: ['', Validators.required],
          SN: ['', Validators.required],
          DG: ['', Validators.required],
        });
        this.breadCrumbItems = [{ label: 'SETTINGS', path: '/' }, { label: 'Barcodes', path: '/', active: true }];

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
      this.formBarcodes.addControl('Contents', new FormControl(-1));
      this.getAll();
  }


  editor:any;
  valueNotes:any;
  getEditor(event){
    this.editor=event;
  }


  Barcodes:any[]=[];
  formBarcodes: FormGroup;
  getAll(){
    this.http.post<any>(environment.url+"/barcodes/get",{}).subscribe(res=>{
      this.Barcodes=res;
    });
  }

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
      let mem= this.Barcodes.find(x=>x.id==idStatic);
      this.formBarcodes.get("name").setValue(mem.name);
      this.formBarcodes.get("productType").setValue(mem.productType);
      this.formBarcodes.get("productsName").setValue(mem.productsName);
      this.formBarcodes.get("GTIN").setValue(mem.GTIN);
      this.formBarcodes.get("Control").setValue(mem.Control);
      this.formBarcodes.get("PCSUN").setValue(mem.PCSUN);
      this.formBarcodes.get("SN").setValue(mem.SN);
      this.formBarcodes.get("DG").setValue(mem.DG);
      this.formBarcodes.get("id").setValue(mem.id);
      this.valueNotes=mem.Contents;
    }
    else{
      this.titleForm="Add Barcodes"
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
    this.formBarcodes.get('Contents').setValue(this.editor.getData());
    this.http.post<any>(environment.url+'/barcodes/createAndUpdate',this.formBarcodes.value).subscribe(res=>{
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

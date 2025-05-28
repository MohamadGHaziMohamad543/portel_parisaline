import { Component, OnInit } from '@angular/core';

import {sms_model,content_sms_model} from '../../../core/models/sms_model';
import {SmsModelService} from '../../../core/services/sms_model/sms-model.service';
import { Subscription } from 'rxjs';
import { TransService } from 'src/app/core/services/translation/trans.service';
import { Language } from 'src/app/core/models/Language';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language/language.service';
import { content_email_model } from 'src/app/core/models/content_email_model';
@Component({
  selector: 'app-sms-model',
  templateUrl: './sms-model.component.html',
  styleUrls: ['./sms-model.component.scss']
})
export class SmsModelComponent implements OnInit {
  breadCrumbItems: Array<{}>;

  Trans:Subscription;
  trans:any;

  Email_model:Subscription;
  sms_model:sms_model[];

  content_sms_model:content_sms_model[];
  
  Language:Language[];
  country:any[];

  formSms_model: FormGroup;
  submitted = false;
  error = '';
  loading = false;
  titleForm:String="Add SMS MODEL";
  typeForm:Number=0;
  smsModelId:number=-1;


  formcontent_Sms_model: FormGroup;
  submittedContent = false;
  errorContent = '';
  loadingContent = false;
  titleFormContent:String="ADD CONTENT";
  typeFormContent:Number=0;
  ngEditContent:boolean=true;
  constructor(private transs:TransService,
     private SmsModelService:SmsModelService,
     private formBuilder:FormBuilder,
     private modalService: NgbModal,
     private toastr:ToastrService,
     private lang:LanguageService,) { 
    
  }
  get f() { return this.formSms_model.controls; }
  get fn() { return this.formcontent_Sms_model.controls; }
  ngOnInit() {
    this.Trans=this.transs.trans.subscribe(res=>{
      this.trans=res.key;
      this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' },{ label: "SETTINGS", path: '/', active: true }, { label: "SMS MODEL", path: '/', active: true }];
    });

    this.Email_model=this.SmsModelService.getll_email_model().subscribe(res=>{
      this.sms_model=res;
    });
    this.SmsModelService.getAll();
    //Form validators 
    this.formSms_model = this.formBuilder.group({
      nameModel: ['', Validators.required],
    });
    this.formSms_model.addControl('id',new FormControl(""));


    //Form validators 
    this.formcontent_Sms_model = this.formBuilder.group({
      content_model: ['', Validators.required],
      langId: ['', Validators.required]
    });
    this.formcontent_Sms_model.addControl('id',new FormControl(""));
    this.formcontent_Sms_model.addControl('sms_model_id',new FormControl(""));
  }


  getLang(){
    this.lang.getAllLanguageAndClassfier().subscribe(res=>{
      this.Language=res;
    });
  }

  getCodeLang(id:number){
    if(this.Language.find(x=>x.id==id)==undefined)
    {
      return this.trans.contentEmailModel.thislanguageitisstop;
    }
    else{
      return this.Language.find(x=>x.id==id).langCode;
    }
  
  }

  ngOnDestroy() {
    this.Trans.unsubscribe();
    this.Email_model.unsubscribe();
  }

  status(status:number)
  {
    if(status==0)
    {
      return false;
    }
    else
    {
      return true;
    }
  }
  ChangeStatus(event,id:number){
    if(event)
    {
      return this.SmsModelService.deactivate_or_activate(id,1);
    }
    else
    {
      return this.SmsModelService.deactivate_or_activate(id,0);
    }
  }
  onChangeStatus($event,id:number){
    this.ChangeStatus($event,id).subscribe(res=>{
      if($event)
      {
        this.toastr.success(this.trans.emailModel.TheEmail_modelHasBeenActivated, "successfull" ,{
          timeOut :  3000
        });
      }
      else
      {
        this.toastr.warning(this.trans.emailModel.Email_modelHasBeenDeactivated, "warning" ,{
          timeOut :  3000
        });
      }
    },err=>{
      if(err=2010)
      {
        this.toastr.warning(this.trans.emailModel.YouMustHaveAtLeastOneName, "warning" ,{
          timeOut :  3000
        });
        this.SmsModelService.getAll();
      }
      else
      {
        this.toastr.error(this.trans.emailModel.UnknownError, "error" ,{
          timeOut :  3000
        });
      }
    })
  }

  putValueForm(id:number)
  {
    this.formSms_model.get('id').setValue(this.sms_model.find(x=>x.id==id).id);
    this.formSms_model.get('nameModel').setValue(this.sms_model.find(x=>x.id==id).nameModel);
  }
  disableForm(){
    this.formSms_model.disable({onlySelf:true});
  }
  enableForm(){
    this.formSms_model.enable({onlySelf:true});
  }
  add(content){
    this.enableForm();
    this.formSms_model.reset();
    this.typeForm=0;
    this.titleForm="ADD MODEL";
    this.modalService.open(content ,{ backdrop: 'static' });
  }

  edit(id:number)
  {
    this.getLang();
    this.smsModelId=id;
    this.titleForm="EDIT MODEL";
    this.getAllContent();
  }
  delete(content,id:number){
    this.formSms_model.reset();
    this.putValueForm(id);
    this.disableForm();
    this.typeForm=2;
    this.titleForm="DELETE MODEL";
    this.modalService.open(content ,{ backdrop: 'static' });
  }
  submit(param:[]){
    if(this.typeForm==0)
    {
      return this.SmsModelService.create(param);
    }
    else
    {
      return this.SmsModelService.delete(this.formSms_model.value);
    }
  }
  onSubmit(){
    this.submitted = true;
    if (this.formSms_model.invalid) {
      return;
    }
    this.loading = true;
    this.submit(this.formSms_model.value).subscribe(res=>{
      if(res.message==2000) //2000 it means this number is added successfully
      {
        this.toastr.success(this.trans.emailModel.addSuccessfull, "successfull" ,{
          timeOut :  3000
        });
      }
      else if(res.message==2002) //2002 it means this number is deleted successfully
      {
        this.toastr.success(this.trans.emailModel.deletedSuccessfully, "Deleted" ,{
          timeOut :  3000
        });
      }
      this.modalService.dismissAll();
      this.SmsModelService.getAll();
      this.loading = false;
      this.submitted =false;
    },err=>{;
     if(err==1001) //2002 it means this number is deleted successfully
      {
        this.toastr.error(this.trans.emailModel.SimilarRecordsCannotbeAdded, "error" ,{
          timeOut :  3000
        });
      }
      else if(err==2008)
      {
        this.toastr.error(this.trans.emailModel.TheCodeIsInvalid, "error" ,{
          timeOut :  3000
        });
      }
      else{
        this.toastr.error(this.trans.emailModel.UnknownError, "error" ,{
          timeOut :  3000
        });
      }
      this.loading = false;
    });
  }
  onChange(event){
  
   // this.formEmail_model.get('code').setValue(this.formEmail_model.get('code').value.toLowerCase())
  }

  //Content

  putValueFormContent(id:number)
  {
    this.formcontent_Sms_model.get('id').setValue(this.content_sms_model.find(x=>x.id==id).id);
    this.formcontent_Sms_model.get('content_model').setValue(this.content_sms_model.find(x=>x.id==id).content_model);
    this.formcontent_Sms_model.get('sms_model_id').setValue(this.content_sms_model.find(x=>x.id==id).sms_model_id);
    this.formcontent_Sms_model.get('langId').setValue(this.content_sms_model.find(x=>x.id==id).langId);
  }
  disableFormContent(){
    this.formcontent_Sms_model.disable({onlySelf:true});
    this.ngEditContent=false;
  }
  enableFormContent(){
    this.formcontent_Sms_model.enable({onlySelf:true});
    this.ngEditContent=true;
  }
  addContent(content){
    if(this.smsModelId != -1)
    {
      this.enableFormContent();
      this.getLang();
      this.formcontent_Sms_model.reset();
      this.typeFormContent=0;
      this.titleFormContent="ADD CONTENT";
      this.modalService.open(content ,{ backdrop: 'static' });
      this.formcontent_Sms_model.get('sms_model_id').setValue(this.smsModelId);
    }

  }
  editContent(content,id:number){
    this.formcontent_Sms_model.reset();
    this.putValueFormContent(id);
    this.formcontent_Sms_model.get('langId').disable({onlySelf:true});
    this.typeFormContent=1;
    this.titleFormContent="EDIT CONTENT"
    this.modalService.open(content ,{ backdrop: 'static' })
  }
  getAllContent()
  {
    this.SmsModelService.getllContentById(this.smsModelId).subscribe(res=>{
        this.content_sms_model=res;
    })
  }
  deleteContent(content,id:number){

    this.formcontent_Sms_model.reset();
    this.putValueFormContent(id);
    this.disableFormContent();
    this.typeFormContent=2;
    this.titleFormContent="DELETE CONTENT";
    this.modalService.open(content ,{ backdrop: 'static' });
  }
  submitContent(param:[]){
    if(this.typeFormContent==0)
    {
      return this.SmsModelService.createContent(param);
    }
    else if(this.typeFormContent==2)
    {
      return this.SmsModelService.deleteConent(param);
    }
    else if(this.typeFormContent==1)
    {
      return this.SmsModelService.updateContent(param);
    }
  }
  onSubmitContent(){
    this.submittedContent = true;
    if (this.formcontent_Sms_model.invalid) {
      return;
    }
    this.loadingContent = true;
    this.submitContent(this.formcontent_Sms_model.value).subscribe(res=>{
      if(res.message==2000) //2000 it means this number is added successfully
      {
        this.toastr.success(this.trans.contentEmailModel.addSuccessfull, "successfull" ,{
          timeOut :  3000
        });
      }
      else if(res.message==2002) //2002 it means this number is deleted successfully
      {
        this.toastr.success(this.trans.contentEmailModel.deletedSuccessfully, "Deleted" ,{
          timeOut :  3000
        });
      }
      this.modalService.dismissAll();
      this.getAllContent();
      this.loadingContent = false;
      this.submittedContent =false;
    },err=>{;
     if(err==1001) //2002 it means this number is deleted successfully
      {
        this.toastr.error(this.trans.emailModel.SimilarRecordsCannotbeAdded, "error" ,{
          timeOut :  3000
        });
      }
      else if(err==2008)
      {
        this.toastr.error(this.trans.emailModel.TheCodeIsInvalid, "error" ,{
          timeOut :  3000
        });
      }
      else{
        this.toastr.error(this.trans.emailModel.UnknownError, "error" ,{
          timeOut :  3000
        });
      }
      this.loadingContent = false;
    });
  }


}

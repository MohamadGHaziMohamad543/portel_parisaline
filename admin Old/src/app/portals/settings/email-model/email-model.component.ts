import { Component, OnInit } from '@angular/core';
import {email_model} from '../../../core/models/email_mode';
import {EmailModelService} from '../../../core/services/email_model/email-model.service';
import { Subscription } from 'rxjs';
import { TransService } from 'src/app/core/services/translation/trans.service';
import { Language } from 'src/app/core/models/Language';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language/language.service';
import { content_email_model } from 'src/app/core/models/content_email_model';
@Component({
  selector: 'app-email-model',
  templateUrl: './email-model.component.html',
  styleUrls: ['./email-model.component.scss']
})
export class EmailModelComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  Trans:Subscription;
  trans:any;

  Email_model:Subscription;
  email_model:email_model[];

  content_email_model:content_email_model[];
  
  Language:Language[];
  country:any[];

  formEmail_model: FormGroup;
  submitted = false;
  error = '';
  loading = false;
  titleForm:String="Add email_model";
  typeForm:Number=0;
  email_modelId:number=-1;


  formcontent_email_model: FormGroup;
  submittedContent = false;
  errorContent = '';
  loadingContent = false;
  titleFormContent:String="Add email_modelContent";
  typeFormContent:Number=0;
  ngEditContent:boolean=true;
  constructor(private transs:TransService,
     private EmailModelService:EmailModelService,
     private formBuilder:FormBuilder,
     private modalService: NgbModal,
     private toastr:ToastrService,
     private lang:LanguageService,) { 
    
  }
  get f() { return this.formEmail_model.controls; }
  get fn() { return this.formcontent_email_model.controls; }
  ngOnInit() {
    this.Trans=this.transs.trans.subscribe(res=>{
      this.trans=res.key;
      this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' },{ label: "SETTINGS", path: '/', active: true }, { label: "EMAIL MODEL", path: '/', active: true }];
    });

    this.Email_model=this.EmailModelService.getll_email_model().subscribe(res=>{
      this.email_model=res;
    });
    this.EmailModelService.getAll();
    //Form validators 
    this.formEmail_model = this.formBuilder.group({
      nameModel: ['', Validators.required],
    });
    this.formEmail_model.addControl('id',new FormControl(""));


    //Form validators 
    this.formcontent_email_model = this.formBuilder.group({
      langId: ['', Validators.required],
      subject:['', Validators.required],
    });
    this.formcontent_email_model.addControl('id',new FormControl(""));
    this.formcontent_email_model.addControl('email_model_id',new FormControl(""));
    this.formcontent_email_model.addControl('content_model',new FormControl(""));
  }


  editImage($event,type){

  }
  editor:any;
  valueNotes:any;
  getEditor(event){
    this.editor=event;
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
      return this.EmailModelService.deactivate_or_activate(id,1);
    }
    else
    {
      return this.EmailModelService.deactivate_or_activate(id,0);
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
        this.EmailModelService.getAll();
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
    this.formEmail_model.get('id').setValue(this.email_model.find(x=>x.id==id).id);
    this.formEmail_model.get('nameModel').setValue(this.email_model.find(x=>x.id==id).nameModel);
  }
  disableForm(){
    this.formEmail_model.disable({onlySelf:true});
  }
  enableForm(){
    this.formEmail_model.enable({onlySelf:true});
  }
  add(content){
    this.enableForm();
    this.formEmail_model.reset();
    this.typeForm=0;
    this.titleForm="ADD EMAIL MODEL";
    this.modalService.open(content ,{ backdrop: 'static' });
  }

  edit(id:number)
  {
    this.getLang();
    this.email_modelId=id;
    this.titleForm="EDIT EMAIL MODEL";
    this.getAllContent();
  }
  
  delete(content,id:number){
    this.formEmail_model.reset();
    this.putValueForm(id);
    this.disableForm();
    this.typeForm=2;
    this.titleForm="DELETE EMAIL MODEL";
    this.modalService.open(content ,{ backdrop: 'static' });
  }
  submit(param:[]){
    if(this.typeForm==0)
    {
      return this.EmailModelService.create(param);
    }
    else
    {
      return this.EmailModelService.delete(this.formEmail_model.value);
    }
  }
  onSubmit(){
    this.submitted = true;
    if (this.formEmail_model.invalid) {
      return;
    }
    this.loading = true;
    this.submit(this.formEmail_model.value).subscribe(res=>{
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
      this.EmailModelService.getAll();
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
    this.formcontent_email_model.get('id').setValue(this.content_email_model.find(x=>x.id==id).id);
    this.formcontent_email_model.get('subject').setValue(this.content_email_model.find(x=>x.id==id).subject);
    this.valueNotes=this.content_email_model.find(x=>x.id==id).content_model;
    this.formcontent_email_model.get('email_model_id').setValue(this.content_email_model.find(x=>x.id==id).email_model_id);
    this.formcontent_email_model.get('langId').setValue(this.content_email_model.find(x=>x.id==id).langId);
  }
  disableFormContent(){
    this.formcontent_email_model.disable({onlySelf:true});
    this.ngEditContent=false;
  }
  enableFormContent(){
    this.formcontent_email_model.enable({onlySelf:true});
    this.ngEditContent=true;
  }
  addContent(content){
    if(this.email_modelId != -1)
    {
      this.valueNotes="";
      this.enableFormContent();
      this.getLang();
      this.formcontent_email_model.reset(); 
      this.typeFormContent=0;
      this.titleFormContent="ADD CONTENT";
      this.modalService.open(content ,{ backdrop: 'static',windowClass: 'modal-full ' });
      this.formcontent_email_model.get('email_model_id').setValue(this.email_modelId);
    }

  }
  editContent(content,id:number){
    this.formcontent_email_model.reset();
    this.putValueFormContent(id);
    this.formcontent_email_model.get('langId').disable({onlySelf:true});
    this.typeFormContent=1;
    this.titleFormContent=this.trans.emailModel.TitleForm_update;
    this.modalService.open(content ,{ backdrop: 'static' ,windowClass: 'modal-full '})
  }
  getAllContent()
  {
    this.EmailModelService.getllContentById(this.email_modelId).subscribe(res=>{
        this.content_email_model=res;
    })
  }
  deleteContent(content,id:number){

    this.formcontent_email_model.reset();
    this.putValueFormContent(id);
    this.disableFormContent();
    this.typeFormContent=2;
    this.titleFormContent=this.trans.emailModel.TitleForm_delete;
    this.modalService.open(content ,{ backdrop: 'static' });
  }
  submitContent(param:[]){
    if(this.typeFormContent==0)
    {
      return this.EmailModelService.createContent(param);
    }
    else if(this.typeFormContent==2)
    {
      return this.EmailModelService.deleteConent(param);
    }
    else if(this.typeFormContent==1)
    {
      return this.EmailModelService.updateContent(param);
    }
  }
  onSubmitContent(){
    this.submittedContent = true;
    if (this.formcontent_email_model.invalid) {
      return;
    }
    this.loadingContent = true;
    this.formcontent_email_model.get('content_model').setValue(this.editor.getData())
    this.submitContent(this.formcontent_email_model.value).subscribe(res=>{
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

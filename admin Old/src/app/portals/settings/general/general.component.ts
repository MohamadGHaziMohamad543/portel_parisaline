import { Component, OnInit,OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { socialMedia } from '../../../core/models/socialMedia';
import {  FormControl, Validators } from '@angular/forms';
import { seo } from '../../../core/models/seo';
import { TransService } from 'src/app/core/services/translation/trans.service';
import { Subscription } from 'rxjs';
import { Language } from 'src/app/core/models/Language';
import { LanguageService } from 'src/app/core/services/language/language.service';
import { SeoService } from 'src/app/core/services/seo/seo.service';
import { SocialMediaService } from 'src/app/core/services/socialMedia/social-media.service';
import { ToastrService } from 'ngx-toastr';
import {CurrencyService} from '../../../core/services/currency/currency.service';
import { GeneralService } from 'src/app/core/services/general/general.service';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {
  trans:any;
  Trans:Subscription;
  breadCrumbItems: Array<{}>;
  Language: Language[];
  currency:any[];
  //v_social
  _socialMedia:Subscription;
  socialMedia:socialMedia[];
  sl_name = new FormControl('');
  sl_link = new FormControl('');
  sl_title:String="";
  sl_type:number;
  sl_id:number;
  //v_SEO
  seo:Subscription;
  a_seo:seo[]=[];
  seo_name = new FormControl('');
  seo_description = new FormControl('');
  seo_key_words = new FormControl('');
  seo_title:String="";
  seo_type:number;
  seo_id:number;
  languageModel:number=1;
  currencModel:number=1;
  emailModel:string="";
  companyAddress:string="";
  constructor(private currancyS:CurrencyService,
     private sl:SocialMediaService,
     private toastr:ToastrService,
      private modalService: NgbModal,
      private transs:TransService,
      private lang:LanguageService,
      private seoS:SeoService ,
      private http:HttpClient ,
      private generalService:GeneralService) { 
     // this.a_seo.push({id:1,name:"KIVEN",description:"DISCRCTION",key_words:"this.seo_key_words.value"});
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' },{ label: 'SETTING', path: '/' ,active: true }, { label: 'GENERAL', path: '/', active: true }];
    // this.Language = [
    // {id: 1, name: 'Vilnius'},
    // {id: 2, name: 'Kaunas'},
    // {id: 3, name: 'Pavilnys', disabled: true},
    // {id: 4, name: 'Pabradė'},
    // {id: 5, name: 'Klaipėda'}];
    this.lang.getAllLanguageAndClassfier().subscribe(res=>{
      this.Language=res;
    });
    //set DB Seo 
    this.seo=this.seoS.setSeo().subscribe(res=>{
      this.a_seo=res;
    });
    this.seoS.getAll();

    //set DB Seo 
    this._socialMedia=this.sl.setSocialMedia().subscribe(res=>{
      this.socialMedia=res;
    });
    this.sl.getAll();
    //set cararncy
    this.currency = [
      {id: 1, name: '$'},
      {id: 2, name: 'TL'}
    ];

    this.currancyS.getAllAndName().subscribe(res=>{
      this.currency=res;
    });

    this.Trans=this.transs.trans.subscribe(res=>{
      this.trans=res.key;
    });
    this.generalService.getGeneral().subscribe(res=>{
      this.currencModel=res.currencyId;
      this.languageModel=res.languageId;
      this.emailModel=res.email;
      this.companyAddress=res.companyAddress;
      this.valueNotes=res.PortFileo;
    });
  }
 
  editor;
  getEditor(editor){
    this.editor=editor;
  }
  valueNotes;
  savePortFlio=()=>{
    this.http.post<any>(environment.url+"/general/SPF",{PortFileo:this.editor.getData()}).subscribe(res=>{
      if(res.message===2001){
        this.toastr.success("Update Success", "successfull" ,{
          timeOut :  3000
        });
      }
    });
  }
  ngOnDestroy(){
    this.Trans.unsubscribe();
    this.seo.unsubscribe();
  }
  //0:Add,1:Edit,2:Delete #social
  OpenSocial(content: string,type:number,id:number=-1){
    this.sl_type=type;
    if(type==0)
    {
      this.sl_title=this.trans.general.modal_title_Add_link;
      this.sl_name.setValue("");
      this.sl_link.setValue("");
      this.EditInputSocial(false);
      this.modalService.open(content ,{ backdrop: 'static' });
    }
    else if(type==1)
    {
      this.sl_id=id;
      this.sl_title=this.trans.general.modal_title_edit_link;
      this.sl_name.setValue(this.socialMedia.find(x=>x.id==id).name);
      this.sl_link.setValue(this.socialMedia.find(x=>x.id==id).link);
      this.EditInputSocial(false);
      this.modalService.open(content ,{ backdrop: 'static' });
    }
    else if(type==2)
    {
      this.sl_id=id;
      this.sl_title=this.trans.general.modal_title_remove_link;
      this.sl_name.setValue(this.socialMedia.find(x=>x.id==id).name);
      this.sl_link.setValue(this.socialMedia.find(x=>x.id==id).link);
      this.EditInputSocial();
      this.modalService.open(content ,{ backdrop: 'static' });
    }

  }

  EditInputSocial(on:boolean=true)
  {
    if(on)
    {
      this.sl_name.disable({onlySelf:true});
      this.sl_link.disable({onlySelf:true});
    }
    else
    {
      this.sl_name.enable({onlySelf:true});
      this.sl_link.enable({onlySelf:true});
    }

  }

  slsubmit(param:[]=null){
    if(this.sl_type==0)
    {
      return this.sl.create(param);
    }
    else if(this.sl_type==1)
    {
      return this.sl.update(param);
    }
    else if(this.sl_type==2)
    {
      return this.sl.delete(this.sl_id);
    }
  }

  slsubSubmit(param:[]=null){
    this.slsubmit(param).subscribe(res=>{
      if(res.message==2000) //2000 it means this number is added successfully
      {
        this.toastr.success(this.trans.general.addSuccessfull, "successfull" ,{
          timeOut :  3000
        });
      }
      else if(res.message==2001) //2002 it means this number is deleted successfully
      {
        this.toastr.success(this.trans.general.updatedSuccessfully, "successfull" ,{
          timeOut :  3000
        });
      }
      else if(res.message==2002) //2002 it means this number is deleted successfully
      {
        this.toastr.success(this.trans.general.deletedSuccessfully, "successfull" ,{
          timeOut :  3000
        });
      }
      this.sl.getAll();
    })
  }

  BtnSaveSocial()
  {
    let param:any={id:this.sl_id,name:this.sl_name.value,link:this.sl_link.value}
    this.slsubSubmit(param);
    this.modalService.dismissAll();
  }

  //0:Add,1:Edit,2:Delete #seo
  OpenSeo(content: string,type:number,id:number=-1){
    this.seo_type=type;
    if(type==0)
    {
      this.seo_title=this.trans.general.modalseo_title_Add_key_words;
      this.seo_name.setValue("");
      this.seo_description.setValue("");
      this.seo_key_words.setValue("");
      this.EditInputSocial(false);
      this.modalService.open(content ,{ backdrop: 'static' });
    }
    else if(type==1)
    {
      this.seo_id=id;
      this.seo_title=this.trans.general.modalseo_title_edit_key_words;
      this.seo_name.setValue(this.a_seo.find(x=>x.id==id).name);
      this.seo_description.setValue(this.a_seo.find(x=>x.id==id).description);
      this.seo_key_words.setValue(this.a_seo.find(x=>x.id==id).key_words);
      this.EditInputSocial(false); 
      this.modalService.open(content ,{ backdrop: 'static' });
    }
    else if(type==2)
    {
      this.seo_id=id;
      this.seo_title=this.trans.general.modalseo_title_remove_key_words;
      this.seo_name.setValue(this.a_seo.find(x=>x.id==id).name);
      this.seo_description.setValue(this.a_seo.find(x=>x.id==id).description);
      this.seo_key_words.setValue(this.a_seo.find(x=>x.id==id).key_words);
      this.EditInputSocial();
      this.modalService.open(content ,{ backdrop: 'static' });
    }

  }
  EditInputSeo(on:boolean=true)
  {
    if(on)
    {
      this.seo_name.disable({onlySelf:true});
      this.seo_description.disable({onlySelf:true});
      this.seo_key_words.disable({onlySelf:true});
    }
    else
    {
      this.seo_name.enable({onlySelf:true});
      this.seo_description.enable({onlySelf:true});
      this.seo_key_words.enable({onlySelf:true});
    }

  }
  seosubmit(param:[]=null){
    if(this.seo_type==0)
    {
      return this.seoS.create(param);
    }
    else if(this.seo_type==1)
    {
      return this.seoS.update(param);
    }
    else if(this.seo_type==2)
    {
      return this.seoS.delete(this.seo_id);
    }
  }
  soesubSubmit(param:[]=null){
    this.seosubmit(param).subscribe(res=>{
      if(res.message==2000) //2000 it means this number is added successfully
      {
        this.toastr.success(this.trans.general.addSuccessfull, "successfull" ,{
          timeOut :  3000
        });
      }
      else if(res.message==2001) //2002 it means this number is deleted successfully
      {
        this.toastr.success(this.trans.general.updatedSuccessfully, "successfull" ,{
          timeOut :  3000
        });
      }
      else if(res.message==2002) //2002 it means this number is deleted successfully
      {
        this.toastr.success(this.trans.general.deletedSuccessfully, "successfull" ,{
          timeOut :  3000
        });
      }
      this.seoS.getAll();
    })
  }
  BtnSaveSeo()
  {

    let param:any={id:this.seo_id,name:this.seo_name.value,description:this.seo_description.value,key_words:this.seo_key_words.value};
    this.soesubSubmit(param);
    this.modalService.dismissAll();
  }

  BtnSaveGenral(){
    this.generalService.update({languageId:this.languageModel,currencyId:this.currencModel,email:this.emailModel,companyAddress:this.companyAddress}).subscribe(res=>{
      if(res.message==2001)
      this.toastr.success("SuccessFuly","Update SuccessFuly");
    },err=>{
      this.toastr.error("Error","Error for Update");
    });
  }
  
}

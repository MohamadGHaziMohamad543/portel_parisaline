import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';
import { TransService } from 'src/app/core/services/translation/trans.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Imagebase64Service } from 'src/app/core/services/other/imagebase64.service';
import { NgbModal, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import {PatientService} from '../../core/services/patient/patient.service';
import {FilemanagerService} from '../../core/services/filemanager/filemanager.service'
import { DoctorService } from 'src/app/core/services/doctor/doctor.service';
import { environment } from 'src/environments/environment.prod';
import { CasesService } from 'src/app/core/services/cases/cases.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { parseDate } from 'ngx-bootstrap';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { EncryptService } from 'src/app/core/services/encrypt/encrypt.service';
import { CommentService } from 'src/app/core/services/comment/comment.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Location } from '@angular/common';
import { Options } from 'ng5-slider';
import { LaboratorysService } from 'src/app/core/services/laboratorys/laboratorys.service';
import { SocketService } from 'src/app/core/services/socket/socket.service';
import { StlViewService } from 'src/app/core/services/stlView/stl-view.service';
import { UploadFilesService } from 'src/app/shared/common/upload-files/upload-files.service';
import { HttpClient } from '@angular/common/http';
declare var $:any;
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {


  stlRun:any;

  breadCrumbItems: Array<{}>;
  Trans:Subscription;
  trans:any;
  imageChangedEvent: any = '';
  imageArray=[];
  croppedImage:any="";
  submitedForm=0;
  doctor:any[];
  pattientTabD=false;
  createOrderD=false;
  submitCaseD=false;
  //form patient Create
  FirstName:any='';
  LastName:any='';
  BirthDate:any;
  idNumberPatient:any;
  addPatientLoding=false;
  Office:any;
  gender:any=1;
  caseId=0;
  //formUpload IMage patient
  imagePathServer="";

  //impramtion file 
  commentInput:any;
  createOrdarLoding=false;
  idDentelCenter=1;
  mediatorId=0;
  laboratoryId=0;
  Arches:any=1;
  Impressions:number=1;
  UpperStl:string=null;
  LowerStl:string=null;
  OcclusionStl:string=null;
  OcclusionLoading:boolean=false;
  LowerLoading:boolean=false;
  UpperLoading:boolean=false;
  loadAll:boolean=true;
  imageViewrElement=[];
  IPRArray={
    UR8:{T:0,I:0,number:11},
    UR7:{T:0,I:0,number:12},
    UR6:{T:0,I:0,number:13},
    UR5:{T:0,I:0,number:14},
    UR4:{T:0,I:0,number:15},
    UR3:{T:0,I:0,number:16},
    UR2:{T:0,I:0,number:17},
    UR1:{T:0,I:0,number:18},
    UL8:{T:0,I:0,number:21},
    UL7:{T:0,I:0,number:22},
    UL6:{T:0,I:0,number:23},
    UL5:{T:0,I:0,number:24},
    UL4:{T:0,I:0,number:25},
    UL3:{T:0,I:0,number:26},
    UL2:{T:0,I:0,number:27},
    UL1:{T:0,I:0,number:28},
    LR8:{T:0,I:0,number:31},
    LR7:{T:0,I:0,number:32},
    LR6:{T:0,I:0,number:33},
    LR5:{T:0,I:0,number:34},
    LR4:{T:0,I:0,number:35},
    LR3:{T:0,I:0,number:36},
    LR2:{T:0,I:0,number:37},
    LR1:{T:0,I:0,number:38},
    LL8:{T:0,I:0,number:41},
    LL7:{T:0,I:0,number:42},
    LL6:{T:0,I:0,number:43},
    LL5:{T:0,I:0,number:44},
    LL4:{T:0,I:0,number:45},
    LL3:{T:0,I:0,number:46},
    LL2:{T:0,I:0,number:47},
    LL1:{T:0,I:0,number:48},
  };



ArchesItems=[
  {id:1,label:"Both Upper/Lower"},
  {id:2,label:"Single Arch-Upper"},
  {id:3,label:"Single Arch-Lower"}
]
OfficeItems:any[
]=[];

genderItems=[
  {id:1,label:"Male"},
  {id:1,label:"Fmale"}
];
treatmentTypeItems=[
  {id:1,label:"Express"},
  {id:2,label:"Lite"},
  {id:3,label:"Moderate"},
  {id:4,label:"Complex"},
  {id:5,label:"Comprehensive"},
];
treatmentType:any=-1;
incisorsMidlineItems=[
  {id:0,label:"none"},
  {id:1,label:"Improve"},
  {id:2,label:"maintain"},
  {id:3,label:"correct"}
];
incisorsMidline:any=0;
incisorsOverbiteItems=[
  {id:0,label:"none"},
  {id:1,label:"Maintain"},
  {id:2,label:"increase"},
  {id:3,label:"decrease"},
];

incisorsOverbite:any=0;
incisorsOverjetItems=[
  {id:0,label:"none"},
  {id:1,label:"maintain"},
  {id:2,label:"increase"},
  {id:3,label:"decrease"},
];
incisorsOverjet:any=0;


posteriorSpacingItems=[
  {id:0,label:"none"},
  {id:1,label:"close ALL Spaces"},
  {id:2,label:"Leave ALL Spaces"},
  {id:3,label:"Leave Space Anteriorly For Prosthesis"},
];
posteriorSpacing:any=0;
posteriorArchWdithItems=[
  {id:0,label:"none"},
  {id:1,label:"maintain"},
  {id:2,label:"expand"},
  {id:3,label:"narrow"},
];
posteriorArchWdith:any=0;
posteriorPosteriorCrossBiteItems=[
  {id:0,label:"none"},
  {id:1,label:"maintain"},
  {id:2,label:"Correct"},
  {id:3,label:"expand"},
  {id:4,label:"narrow"},
];
posteriorPosteriorCrossBite:any=0;


crowdingProclineMaxillar=false;

crowdingExpandMaxillar=false;
crowdingProclineMandibular=false;

crowdingExpandMandibular=false;

IdCases=-1;
classDesiredMRigthItems=[
  {id:0,label:"none"},
  {id:1,label:"class I"},
  {id:2,label:"class II"},
  {id:3,label:"class III"},
];
classDesiredMRigth:any=0;
classDesiredMLeftItems=[
  {id:0,label:"none"},
  {id:1,label:"class I"},
  {id:2,label:"class II"},
  {id:3,label:"class III"},
];
classDesiredMLeft:any=0;
classDesiredRRigthItems=[
  {id:0,label:"none"},
  {id:1,label:"class I"},
  {id:2,label:"class II"},
  {id:3,label:"class III"},
];
classDesiredRRigth:any=0;
classDesiredRLeftItems=[
  {id:0,label:"none"},
  {id:1,label:"class I"},
  {id:2,label:"class II"},
  {id:3,label:"class III"},
];
classDesiredRLeft:any=0;

commentInputLab:any;
chatData = [];
chatDatalab = [];
DoctorId=-1;
doctorData:any;;
noAttachment=false;
removeAttachmentonlaststage=false;
removeAttachmentonstage=false;
removeAttachmentonstageNumber:any;
iPRInstructions:number=1;
croppedImageSRC:string="";

private top: number;
private bottom: number;
private left: number;
private right: number;
private centerX: number;
private centerY: number;
private zoomLevel: number = 0;
private maxZoom: number = 2;
private canvasWidth: number;
private canvasHeight: number;
private image: HTMLImageElement = new Image();
numberImage=0;
numberImageStop=-1;
typeDentelVideo="Front";
typeLeftOrRigth="";
salary:any=0;
interval:any;
typeRunVideo=false;
value: number = 0;
options: Options = {
  floor: 0,
  ceil: 2,
  vertical: false,
  step:0.01,
  animate:false
};

casesStatus:number;
treatmentLink:string=null;
imageFrontSmiling=null;
imageFrontPose=null;
imageProfile=null;
imageUpperOcclusal=null;
imageLowerOcclusal=null;
imageLeftBuccal=null;
imageFrontal=null;
imageRightBuccal=null;
PANAROMIC=null;
CEPHALOMETRIC=null;
fileTretment=null;
submitedStatus="";
eventSocket:Subscription;
gnarateVideoStatus=0;
fileSTLfOR3DPrinting:any[]=[];
  constructor(
    private toastr:ToastrService,
    private transs:TransService,
    private base64:Imagebase64Service,
    private modalService: NgbModal,
    private PatientService:PatientService,
    private doctorService:DoctorService,
    private fileManager:FilemanagerService,
    private CasesService:CasesService,
    private router: Router,
    private _Activatedroute:ActivatedRoute,
    private encryptService:EncryptService,
    private comment:CommentService,
    private auth:AuthenticationService,
    private _location: Location,
    private lab:LaboratorysService,
    private sok:SocketService,
    private stlView:StlViewService,
    private UpStl:UploadFilesService,
    private http:HttpClient
    
  ) {
    this.imagePathServer=environment.url;
    this._Activatedroute.paramMap.subscribe(params => { 
      if(params.get('id')=='_'){
        this.router.navigate(['/']);
      }
      else{
        let id = this.encryptService.Decode(params.get('id'));
        if(id=='')
        {
          this.router.navigate(['/']);
        }
        else{
          this.idNumberPatient=id;
        }
        
      } 

      this.sok.getObservabelChat().subscribe(res=>{
        this.LoadChatBox();
        this.LoadChatBoxLab();
      });
    });
   }


   loadVideoUpload:boolean=false;
   uploadVideoTretment(e)
   {
     let name=e.target.files[0].name;
    if(name.split('.')[name.split('.').length-1].toUpperCase()=='MP4')
    {
      this.loadVideoUpload=true;
      this.fileManager.uploadFile(e.target.files[0],{directionName:"K"+this.idNumberPatient+"/videoFileTretment"}).subscribe(res=>{
        if(res==true)
        {
          this.loadVideoUpload=false;
          this.LoadFileVide();
        }
        else
        {

        }
      });
    }
    else
    {
      this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
        timeOut :  3000
      });
    }
   }

   gnrateVide(){
     this.numberImageStop=-1;
    this.fileManager.getAlLFilePlan(this.idNumberPatient,'video').subscribe(res=>{
    
    });
    this.eventSocket= this.sok.addevent("tretmentGnerate").subscribe(res=>{
      this.gnarateVideoStatus=res;
      if(res==100)
      {
        this.LoadFileVide();
      }
     });
     this.sok.emit("tretmentGnerate",{idPatient:this.treatmentLink,PatientId:this.idNumberPatient});
   }

   srcVideo:string="";
   deleteVideo(){
    this.fileManager.deleteFile(this.srcVideo).subscribe(res=>{
      if(res)
      {
        this.LoadFileVide();
      }
    });
   }
   LoadFileVide(){
    this.fileManager.getAlLFilePlan(this.idNumberPatient,'videoFileTretment').subscribe(res=>{
     if(res.length!=0)
     {
      this.srcVideo=res[0].path;
     }
     else{
      this.srcVideo="";
     }
    });
   }
   filterItems(needle, heystack) {
    var query = needle.toLowerCase();
    return heystack.filter(function(item) {
        return item.name.toLowerCase().indexOf(query) >= 0;
    })
  }
   changeRightVideo(){
    this.typeDentelVideo="Right";
    this.getImageConves();
    this.value=0;
  }
  changeLowerVideo(){
   this.typeLeftOrRigth="";
   this.typeDentelVideo="Lower";
   this.getImageConves();
   this.value=0;
 }
 getLink(id:number){
  if(id!=undefined){
   return "/DentalCenter/Profile/"+this.encryptService.Encrypt(id);
  }
  else
  {
    return "/";
  }
 
}

updatePrice(e,id){
  this.http.post<any>(environment.url+"/tretmentPlan/Update",{salary:e,id:id}).subscribe(res=>{
    if(res.message==2001)
    {
      this.getAllLevelTretment();
    }
  });
}
tretment=[];
getAllLevelTretment(){
  this.http.post<any>(environment.url+"/tretmentPlan/getAll",{patientId:this.idNumberPatient}).subscribe(res=>{
    if(res.error==0)
    {
      this.tretment=[];
      for(var p=0;p<res.data.length;p++)
      {
        this.tretment.push({id:res.data[p].id,Simulation:null,Setup:null,Right:null,Left:null,Frontal:null,nLevel:res.data[p].nLevel,salary:res.data[p].salary});
      }
    }
    this.loadFileTretment();
  });
}

addLevelTretmentPaln(){
 this.http.post<any>(environment.url+"/tretmentPlan/create",{patientId:this.idNumberPatient}).subscribe(res=>{
   if(res.error==0)
   {
    this.getAllLevelTretment();
   }
  });
}

loadFileTretment(){
  for(var i=0;i<this.tretment.length;i++)
  {
    this.getFileTretmentPlanSetup(i,i+1);
    this.getFileTretmentPlanSimulation(i,i+1);
    this.getFileTretmentPlanRight(i,i+1);
    this.getFileTretmentPlanLeft(i,i+1);
    this.getFileTretmentPlanFrontal(i,i+1);
  }
}
getFileTretmentPlanSetup(i,level){
  this.fileManager.getAlLFilePlan(this.idNumberPatient,"/TretmentPlan/"+level+"/Setup").subscribe(res=>{
    if(res.length != 0)
    {
      this.tretment[i].Setup=res[0].path;
    }
    else{
      this.tretment[i].Setup=null;
    }
  });
}
getFileTretmentPlanSimulation(i,level){
  this.fileManager.getAlLFilePlan(this.idNumberPatient,"/TretmentPlan/"+level+"/Simulation").subscribe(res=>{
    if(res.length != 0)
    {
      this.tretment[i].Simulation=res[0].path;
    }
    else{
      this.tretment[i].Simulation=null;
    }
  });
}
getFileTretmentPlanRight(i,level){
  this.fileManager.getAlLFilePlan(this.idNumberPatient,"/TretmentPlan/"+level+"/Right").subscribe(res=>{
    if(res.length != 0)
    {
      this.tretment[i].Right=res[0].path;
    }
    else{
      this.tretment[i].Right=null;
    }
  });
}
getFileTretmentPlanLeft(i,level){
  this.fileManager.getAlLFilePlan(this.idNumberPatient,"/TretmentPlan/"+level+"/Left").subscribe(res=>{
    if(res.length != 0)
    {
      this.tretment[i].Left=res[0].path;
    }
    else{
      this.tretment[i].Left=null;
    }
  });
}
getFileTretmentPlanFrontal(i,level){
  this.fileManager.getAlLFilePlan(this.idNumberPatient,"/TretmentPlan/"+level+"/Frontal").subscribe(res=>{
    if(res.length != 0)
    {
      this.tretment[i].Frontal=res[0].path;
    }
    else{
      this.tretment[i].Frontal=null;
    }
  });
}

 changeFrontVideo(){
   this.typeDentelVideo="Front";
   this.getImageConves();
   this.value=0;
 }
 changeLeftVideo(){
   this.typeDentelVideo="Left";
   this.getImageConves();
   this.value=0;
 }
 changeUpperVideo(){
   this.typeLeftOrRigth="";
   this.typeDentelVideo="Upper";
   this.getImageConves();
   this.value=0;
 }
 change_UpperVideo(){
   if(this.typeLeftOrRigth=="_Upper" || this.typeDentelVideo=="Upper")
   {
     this.typeLeftOrRigth="";
     this.getImageConves();
   }
   else{
     this.typeLeftOrRigth="_Upper";
     this.getImageConves();
   }

 }
 change_LowerVideo(){
   if(this.typeLeftOrRigth=="_Lower" || this.typeDentelVideo=="Lower")
   {
     this.typeLeftOrRigth="";
     this.getImageConves();
   }
   else{
     this.typeLeftOrRigth="_Lower";
     this.getImageConves();
   }

 }
 change_clear(){
   this.typeLeftOrRigth="";
   this.typeLeftOrRigth="_Lower";
   this.getImageConves();
 }
  getImageConves(){
   this.image.src=environment.url+"/uploads/Plans/K"+this.idNumberPatient+"/video/"+this.idNumberPatient+"-"+this.typeDentelVideo+this.typeLeftOrRigth+"-"+this.numberImage+".jpg";
  }
  clearTimer(){
   clearInterval(this.interval);
   this.typeRunVideo=false;
  }
  startVideo(){
    if(!this.typeRunVideo)
    {
     this.typeRunVideo=true;
     this.interval= setInterval(()=>{
       this.numberImage++;
       this.getImageConves();
       if(this.numberImage >=this.numberImageStop)
       {
        this.numberImage=0;
        this.clearTimer();
       }
      },1000);
    }
    else{
     this.clearTimer();
    }

   
  }

  nextPriveosVideo(type){
    if(type=="next")
    {
      this.numberImage++;
    }
    else{
      this.numberImage--;
    }
    this.getImageConves();
  }

   LoadDoctor()
   {
     this.doctorService.getById(this.DoctorId).subscribe(res=>{
       this.doctorData=res[0];
      this.LoadChatBox();
     });
   }
   labratorData:any
   LoadLab(){
    this.lab.getById(this.laboratoryId).subscribe(res=>{
      this.labratorData=res[0];
     this.LoadChatBoxLab();
    });
   }

   imageViewer(modalImage: string,image) {
    this.imageViewrElement=[];
    this.imageViewrElement.push(image);
     for(var i=0;i<this.imageArray.length;i++)
     {
       if(environment.url+'/'+this.imageArray[i].path!=image)
       {
        this.imageViewrElement.push(environment.url+'/'+this.imageArray[i].path);
       }
     }
    this.modalService.open(modalImage, {windowClass: 'modal-full'});
  }
   //IRP
   LoadChatBox(){
    this.comment.getId(this.DoctorId,this.idNumberPatient,"doctor").subscribe(res=>{
     this.chatData=[];
     for(var i=0;i<res.data.length;i++)
     {
      
       let date=new Date(res.data[i].createdAt);
       this.chatData.push(    {
        image:res.data[i].typeSend==1?environment.url+"/"+this.auth.user.imageUser:(this.doctorData.logo.split("googleusercontent.com",2).length==1?environment.url+"/"+this.doctorData.logo:this.doctorData.logo),//(this.auth.user.imageUser.split("googleusercontent.com",2).length==1?environment.url+"/"+this.auth.user.imageUser:this.auth.user.imageUser)
        name: res.data[i].typeSend==1?'me':this.doctorData.nameDoctor,
        message: res.data[i].message,
        time: date.getFullYear()+"/"+date.getMonth()+"/"+date.getDay()+" "+date.getHours()+":"+date.getMinutes(),
        typeSend:res.data[i].typeSend
        })
     }
     this.scrollToBottom('messagesDoctor');
    });
  }


  scrollToBottom(idDiv) {
    setTimeout(() => {
      const messages =<HTMLElement> document.getElementById(idDiv);
      if(messages)
      {
      // alert(messages.scrollHeight);
       messages.scrollTop = messages.scrollHeight;
      }
    }, 50);
  }
     //IRPchatDatalab
     LoadChatBoxLab(){
      this.comment.getId(this.laboratoryId,this.idNumberPatient,"laboratory").subscribe(res=>{
       this.chatDatalab=[];
       for(var i=0;i<res.data.length;i++)
       {
        
         let date=new Date(res.data[i].createdAt);
         this.chatDatalab.push(    {
          image:res.data[i].typeSend==1?environment.url+"/"+this.auth.user.imageUser:environment.url+"/"+this.labratorData.logo,
          name: res.data[i].typeSend==1?'me':this.labratorData.nameLab,
          message: res.data[i].message,
          time: date.getFullYear()+"/"+date.getMonth()+"/"+date.getDay()+" "+date.getHours()+":"+date.getMinutes(),
          typeSend:res.data[i].typeSend
          })
       }
       this.scrollToBottom('messagesLab');
      });
    }
  
  sendComment()
  {
    this.comment.create({doctorId:this.DoctorId,laboratoryId:-1,mediatorId:-1,typeSend:1,patientId:this.idNumberPatient,message:this.commentInput}).subscribe(res=>{
      this.commentInput="";
      this.LoadChatBox();
    });
  }
  sendCommentLab()
  {
    this.comment.create({doctorId:-1,laboratoryId:this.laboratoryId,mediatorId:-1,typeSend:1,patientId:this.idNumberPatient,message:this.commentInputLab}).subscribe(res=>{
      this.commentInputLab="";
      this.LoadChatBoxLab();
    });
  }
   LoadCases(){
     this.CasesService.getIdPatient(this.idNumberPatient).subscribe(res=>{
       this.Arches=res.data.arches;
       this.submitedStatus=res.data.caseStatus;
       if(typeof res.data.rx=="string")
       {
        res.data.rx=JSON.parse(res.data.rx);
       }
       this.IPRArray=res.data.rx;
       this.Impressions=res.data.impressions;
       this.treatmentType=res.data.treatmentType;
       this.incisorsMidline=res.data.incisorsMidline;
       this.incisorsOverbite=res.data.incisorsOverbite;
        this.incisorsOverjet=res.data.incisorsOverjet;
       this.posteriorSpacing=res.data.posteriorSpacing;
       this.posteriorArchWdith=res.data.posteriorArchWdith;
       this.posteriorPosteriorCrossBite=res.data.posteriorPosteriorCrossBite;
       this.crowdingProclineMaxillar=res.data.crowdingProclineMaxillar;
      this.crowdingExpandMaxillar=res.data.crowdingExpandMaxillar;
      this.crowdingProclineMandibular=res.data.crowdingProclineMandibular;
       this.crowdingExpandMandibular=res.data.crowdingExpandMandibular;
       this.classDesiredMRigth=res.data.classDesiredMRigth;
       this.classDesiredMLeft=res.data.classDesiredMLeft;
       this.classDesiredRRigth=res.data.classDesiredRRigth;
       this.classDesiredRLeft=res.data.classDesiredRLeft;
       this.noAttachment=res.data.noAttachment;
       this.removeAttachmentonlaststage=res.data.removeAttachmentonlaststage;
       this.removeAttachmentonstage=res.data.removeAttachmentonstage;
       this.removeAttachmentonstageNumber=res.data.removeAttachmentonstageNumber;
       this.iPRInstructions=res.data.iPRInstructions;
       this.laboratoryId=res.data.laboratoryId;
       this.salary=res.data.salary;
       this.createOrderD=false;
       this.caseId=res.data.id;
       this.pattientTabD=false;
       this.casesStatus=res.data.caseStatus;
       this.LoadDoctor();
       this.LoadLab();
       this.loadAll=false;
     });
   }
   LoadPatient(){
     this.PatientService.getById(this.idNumberPatient).subscribe(res=>{
       console.log(res);
       if(res.length!=0)
       {
         this.FirstName=res[0].firstName;
         this.LastName=res[0].lastName;
         if(res[0].birthDate){
          var date=res[0].birthDate.split(":");
          this.BirthDate={
           year: parseInt(date[0].split("-")[0]),
           month:parseInt(date[0].split("-")[1]),
           day: parseInt(date[0].split("-")[2])
         };//res.birthDate;
         }

        this.OfficeItems.push({dentalCenterId:res[0].dentalCenterId,dentalCenterName:res[0].dentalCenterName,logo: res[0].logo});
        // this.Office=res[0].dentalCenterId;
         this.gender=res[0].gender;
         this.DoctorId=res[0].doctorId;
        
         this.LoadCases();
         this.croppedImageSRC=environment.url+"/"+res[0].image;
       }
       else
       {

       }
     });
   }

   approveCasesAdmin(){
     this.CasesService.approveCasesAdmin(this.caseId,this.idNumberPatient).subscribe(res=>{
       if(res.error==0)
       {
        this.router.navigate(['/patient']);
       }
     });
   }
   changeImpressions(id){
    this.Impressions=id;
   }
   changeNumber(value,nameUR){
    eval('this.'+nameUR+'='+value+';');
   }
   getNumber(nameUR)
   {
    return eval('this.'+nameUR+';');
   }
   public files: NgxFileDropEntry[] = [];

   public dropped(files: NgxFileDropEntry[],type:number=0,level:number=0) {
     this.files = files;
     if(files.length > 1 && type !=0 && type != 18)
     {
      this.toastr.warning("please Upload 1 file ", "Warning" ,{
        timeOut :  3000
      });
       return ;
     }
     for (const droppedFile of files) {
 
       // Is it a file?
       if (droppedFile.fileEntry.isFile) {
         const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
         fileEntry.file((file: File) => {
 
           // Here you can access the real file
           console.log(droppedFile.relativePath, file.type);
           this.addFile2(file,type,level);
           /**
           // You could upload it like this:
           const formData = new FormData()
           formData.append('logo', file, relativePath)
 
           // Headers
           const headers = new HttpHeaders({
             'security-token': 'mytoken'
           })
 
           this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
           .subscribe(data => {
             // Sanitized logo returned from backend
           })
           **/
 
         });
       } else {
         // It was a directory (empty directories are added, otherwise only files)
         const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
         console.log(droppedFile.relativePath, fileEntry);
       }
     }
   }
 
   public fileOver(event){
     console.log(event);
   }
 
   public fileLeave(event){
     console.log(event);
   }


  runSubmitedCase(){
    this.submitedForm=1;
  }



  LoadFile(urlFile:string){
    document.getElementById("loadingStl").style.display="block";
    this.stlView.setStlView(<HTMLDivElement>document.getElementById("stl_cont"),<HTMLProgressElement>document.getElementById("pbtotal"));
    this.stlRun= this.stlView.setFileView(urlFile).subscribe(re=>{
      if(re)
      {
        document.getElementById("loadingStl").style.display="none";
        this.stlView.StopAnmtion();
        this.stlRun.unsubscribe();
      }

    });
    document.getElementById("modelDivStlViewr").style.display="block";
    // animation:{delta:{rotationx:1, msec:1000, loop:true}}
  }
  ngOnInit() {

    if(this.idNumberPatient)
    {
      this.LoadPatient();
    }
    this.getAllLevelTretment();
    this.getImageConves();
    this.loadFile();
    this.loadFile(1);
    this.loadFile(2);
    this.loadFile(3);
    this.loadFile(6);
    this.loadFile(7);
    this.loadFile(8);
    this.loadFile(9);
    this.loadFile(10);
    this.loadFile(11);
    this.loadFile(12);
    this.loadFile(13);
    this.loadFile(14);
    this.loadFile(15);
    this.loadFile(17);
    this.loadFile(18);
    this.loadFile(19);
    this.loadFile(19);
    this.LoadFileVide();
    this.doctorService.getById(environment.id).subscribe(res=>{
    });
    this.Trans=this.transs.trans.subscribe(res=>{
      this.trans=res.key;
      this.breadCrumbItems = [{ label: 'PATIENT', path: '/' }, { label:"PATIENT INFORMATION", path: '/', active: true }];
    });
    this.croppedImage="http://doctor.parisalign.com/admin/assets/avatar.gif";
  }
  openFileUploadImage(){
    document.getElementById("FileUploadImage").click();
  }
  openFile(){
    document.getElementById("inputImage").click();
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  onFileSelect(event,content) : void {
    //check type image 
    let name:string=event.target.files[0].name;
    if(name.split('.')[name.split('.').length-1].toUpperCase()=='PNG'||
       name.split('.')[name.split('.').length-1].toUpperCase()=='JPG' ||
       name.split('.')[name.split('.').length-1].toUpperCase()=='JPEG' ||
       name.split('.')[name.split('.').length-1].toUpperCase()=='TIF')
      {
         this.base64.convertImageToBase64(event.target.files[0]).subscribe(res=>{
          this.imageChangedEvent=res;
          this.modalService.open(content);
         });
      }
      else
      {
        this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
          timeOut :  3000
        });
      }
  }
  toggleWithGreeting(pro, numberIRP, namePr: string) {
    if (pro.isOpen()) {
      pro.close();
    } else {
      let val=0;
      eval('val=this.'+numberIRP+';');
      pro.open({numberIRP, namePr,pro,val});
    }
  }

  addPatient(tabset:any){
    this.addPatientLoding=true;
    if(this.idNumberPatient==undefined)
    {
      this.PatientService.create({id:this.idNumberPatient,firstName:this.FirstName,lastName:this.LastName,birthDate:this.BirthDate.year+"/"+this.BirthDate.month+"/"+this.BirthDate.day,dentalCenterId:this.Office,gender:this.gender,image:this.croppedImage}).subscribe(res=>{
        this.idNumberPatient=res.id;
        this.pattientTabD=false;
        
        this.loadFile();
        this.addPatientLoding=false;
        setTimeout(function () {
          tabset.select('tab2');
        }, 1);
      });
    }
    else
    {
    //  alert(JSON.stringify(this.BirthDate));
     // return;
      let date=new Date(this.BirthDate.year+'/'+(this.BirthDate.month.toString().length==1?'0'+this.BirthDate.month:this.BirthDate.month)+"/"+(this.BirthDate.day.toString().length==1?'0'+this.BirthDate.day:this.BirthDate.day));
      this.PatientService.update({id:this.idNumberPatient,firstName:this.FirstName,lastName:this.LastName,birthDate:date,dentalCenterId:this.Office,gender:this.gender,image:this.croppedImage}).subscribe(res=>{
        this.pattientTabD=false;
        this.loadFile();
        setTimeout(function () {
          tabset.select('tab2');
        }, 1);
      });
    }

  }

  sendDoctorrr(){
    this.CasesService.sendDoctor(this.caseId,this.salary,this.idNumberPatient).subscribe(res=>{
      if(res.error==0)
      {
       this.router.navigate(['/patient']);
      }
    });
  }


  fileOpen:[]=[];
  //file manager
  clickFileStl(type){
    document.getElementById("inputFileStl").setAttribute("typeStl",type);
    document.getElementById("inputFileStl").click();
  }

  loadFile(type:number=0){
    if(type==0)
    {
      this.fileManager.getAlLFilePlan(this.idNumberPatient,'PatientImage').subscribe(res=>{
        this.imageArray=res;
      });
    }
    if(type==6)
    {
      this.fileManager.getAlLFilePlan(this.idNumberPatient,'imageFrontSmiling').subscribe(res=>{
        if(res.length!=0)
        {
          this.imageFrontSmiling=res[0].path;
         
        }
        else
        {
          this.imageFrontSmiling=null;
        }
        
      });
    }
    else if(type==7)
    {
      this.fileManager.getAlLFilePlan(this.idNumberPatient,'imageFrontPose').subscribe(res=>{
        if(res.length!=0)
        {
          this.imageFrontPose=res[0].path;
        }
        else
        {
          this.imageFrontPose=null;
        }
        
      });
    }
    else if(type==8)
    {
      this.fileManager.getAlLFilePlan(this.idNumberPatient,'imageProfile').subscribe(res=>{
        if(res.length!=0)
        {
          this.imageProfile=res[0].path;
        }
        else
        {
          this.imageProfile=null;
        }
        
      });
    }
    else if(type==9)
    {
      this.fileManager.getAlLFilePlan(this.idNumberPatient,'imageUpperOcclusal').subscribe(res=>{
        if(res.length!=0)
        {
          this.imageUpperOcclusal=res[0].path;
        }
        else
        {
          this.imageUpperOcclusal=null;
        }
        
      });
    }
    else if(type==10)
    {
      this.fileManager.getAlLFilePlan(this.idNumberPatient,'imageLowerOcclusal').subscribe(res=>{
        if(res.length!=0)
        {
          this.imageLowerOcclusal=res[0].path;
        }
        else
        {
          this.imageLowerOcclusal=null;
        }
        
      });
    }
    else if(type==11)
    {
      this.fileManager.getAlLFilePlan(this.idNumberPatient,'imageLeftBuccal').subscribe(res=>{
        if(res.length!=0)
        {
          this.imageLeftBuccal=res[0].path;
        }
        else
        {
          this.imageLeftBuccal=null;
        }
        
      });
    }
    else if(type==12)
    {
      this.fileManager.getAlLFilePlan(this.idNumberPatient,'imageFrontal').subscribe(res=>{
        if(res.length!=0)
        {
          this.imageFrontal=res[0].path;
        }
        else
        {
          this.imageFrontal=null;
        }
        
      });
    }
    else if(type==13)
    {
       this.fileManager.getAlLFilePlan(this.idNumberPatient,'imageRightBuccal').subscribe(res=>{
          if(res.length!=0)
          {
            this.imageRightBuccal=res[0].path;
          }
          else
          {
            this.imageRightBuccal=null;
          }
          
        });
    }
    else if(type==14)
    {
       this.fileManager.getAlLFilePlan(this.idNumberPatient,'PANAROMIC').subscribe(res=>{
          if(res.length!=0)
          {
            this.PANAROMIC=res[0].path;
          }
          else
          {
            this.PANAROMIC=null;
          }
          
        });
    }
    else if(type==15)
    {
       this.fileManager.getAlLFilePlan(this.idNumberPatient,'CEPHALOMETRIC').subscribe(res=>{
          if(res.length!=0)
          {
            this.CEPHALOMETRIC=res[0].path;
          }
          else
          {
            this.CEPHALOMETRIC=null;
          }
          
        });
    }
    else if(type==17)
    {
       this.fileManager.getAlLFilePlan(this.idNumberPatient,'fileTretment').subscribe(res=>{
          if(res.length!=0)
          {
            this.fileTretment=res[0].path;
          }
          else
          {
            this.fileTretment=null;
          }
          
        });
    }
    else if(type==18)
    {
       this.fileManager.getAlLFilePlan(this.idNumberPatient,'fileSTLfOR3DPrinting').subscribe(res=>{
          if(res.length!=0)
          {
            this.fileSTLfOR3DPrinting=res;
          }
          else
          {
            this.fileSTLfOR3DPrinting=null;
          }
          
        });
    }
    else if(type==19)
    {
       this.fileManager.getAlLFilePlan(this.idNumberPatient,'OPNFiles').subscribe(res=>{
          if(res.length!=0)
          {
            this.fileOpen=res;
          }
          else
          {
            this.fileOpen=null;
          }
        });
    }
    else if(type==1)
    {
      this.fileManager.getAlLFilePlan(this.idNumberPatient,'UpperStl').subscribe(res=>{
        if(res.length!=0)
        {
          this.UpperStl=res[0].path;
        }
        else
        {
          this.UpperStl=null;
        }
        
      });
    }
    else if(type==2)
    {
      this.fileManager.getAlLFilePlan(this.idNumberPatient,'LowerStl').subscribe(res=>{
        if(res.length!=0)
        {
          this.LowerStl=res[0].path;
        }
        else
        {
          this.LowerStl=null;
        }
      });
    }
    else if(type==3)
    {
      this.fileManager.getAlLFilePlan(this.idNumberPatient,'OcclusionStl').subscribe(res=>{
        if(res.length!=0)
        {
          this.OcclusionStl=res[0].path;
        }
        else
        {
          this.OcclusionStl=null;
        }
      });
    }
    else if(type==30)
    {
      this.loadFileTretment();
    }

  }
  loadingFileOpn:boolean=false;
  addFile(event,type:number=0,level:number=0) : void {
    //check type image
  //     imageFrontSmiling="";
  // imageFrontPose="";
  // imageProfile="";
  // imageUpperOcclusal="";
  // imageLowerOcclusal="";
  // imageLeftBuccal="";
  // imageFrontal="";
  // imageRightBuccal=""; 
    if(type==4)
    {
      type=parseInt(document.getElementById("inputFileStl").getAttribute("typeStl"));
    }
    let name:string=event.target.files[0].name;
    if(type==6)
    {
      if(name.split('.')[name.split('.').length-1].toUpperCase()=='PNG'||
         name.split('.')[name.split('.').length-1].toUpperCase()=='JPG' ||
         name.split('.')[name.split('.').length-1].toUpperCase()=='JPEG' ||
         name.split('.')[name.split('.').length-1].toUpperCase()=='TIF')
        {
          this.fileManager.uploadFile(event.target.files[0],{directionName:"K"+this.idNumberPatient+"/imageFrontSmiling"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(6);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==7)
    {
      if(name.split('.')[name.split('.').length-1].toUpperCase()=='PNG'||
         name.split('.')[name.split('.').length-1].toUpperCase()=='JPG' ||
         name.split('.')[name.split('.').length-1].toUpperCase()=='JPEG' ||
         name.split('.')[name.split('.').length-1].toUpperCase()=='TIF')
        {
          this.fileManager.uploadFile(event.target.files[0],{directionName:"K"+this.idNumberPatient+"/imageFrontPose"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(7);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==8)
    {
      if(name.split('.')[name.split('.').length-1].toUpperCase()=='PNG'||
         name.split('.')[name.split('.').length-1].toUpperCase()=='JPG' ||
         name.split('.')[name.split('.').length-1].toUpperCase()=='JPEG' ||
         name.split('.')[name.split('.').length-1].toUpperCase()=='TIF')
        {
          this.fileManager.uploadFile(event.target.files[0],{directionName:"K"+this.idNumberPatient+"/imageProfile"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(8);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==9)
    {
      if(name.split('.')[name.split('.').length-1].toUpperCase()=='PNG'||
         name.split('.')[name.split('.').length-1].toUpperCase()=='JPG' ||
         name.split('.')[name.split('.').length-1].toUpperCase()=='JPEG' ||
         name.split('.')[name.split('.').length-1].toUpperCase()=='TIF')
        {
          this.fileManager.uploadFile(event.target.files[0],{directionName:"K"+this.idNumberPatient+"/imageUpperOcclusal"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(9);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==10)
    {
      if(name.split('.')[name.split('.').length-1].toUpperCase()=='PNG'||
         name.split('.')[name.split('.').length-1].toUpperCase()=='JPG' ||
         name.split('.')[name.split('.').length-1].toUpperCase()=='JPEG' ||
         name.split('.')[name.split('.').length-1].toUpperCase()=='TIF')
        {
          this.fileManager.uploadFile(event.target.files[0],{directionName:"K"+this.idNumberPatient+"/imageLowerOcclusal"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(10);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==11)
    {
      if(name.split('.')[name.split('.').length-1].toUpperCase()=='PNG'||
         name.split('.')[name.split('.').length-1].toUpperCase()=='JPG' ||
         name.split('.')[name.split('.').length-1].toUpperCase()=='JPEG' ||
         name.split('.')[name.split('.').length-1].toUpperCase()=='TIF')
        {
          this.fileManager.uploadFile(event.target.files[0],{directionName:"K"+this.idNumberPatient+"/imageLeftBuccal"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(type);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==12)
    {
      if(name.split('.')[name.split('.').length-1].toUpperCase()=='PNG'||
         name.split('.')[name.split('.').length-1].toUpperCase()=='JPG' ||
         name.split('.')[name.split('.').length-1].toUpperCase()=='JPEG' ||
         name.split('.')[name.split('.').length-1].toUpperCase()=='TIF')
        {
          this.fileManager.uploadFile(event.target.files[0],{directionName:"K"+this.idNumberPatient+"/imageFrontal"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(type);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==13)
    {
      if(name.split('.')[name.split('.').length-1].toUpperCase()=='PNG'||
         name.split('.')[name.split('.').length-1].toUpperCase()=='JPG' ||
         name.split('.')[name.split('.').length-1].toUpperCase()=='JPEG' ||
         name.split('.')[name.split('.').length-1].toUpperCase()=='TIF')
        {
          this.fileManager.uploadFile(event.target.files[0],{directionName:"K"+this.idNumberPatient+"/imageRightBuccal"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(type);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==14)
    {
      if(name.split('.')[name.split('.').length-1].toUpperCase()=='PNG'||
         name.split('.')[name.split('.').length-1].toUpperCase()=='JPG' ||
         name.split('.')[name.split('.').length-1].toUpperCase()=='JPEG' ||
         name.split('.')[name.split('.').length-1].toUpperCase()=='TIF')
        {
          this.fileManager.uploadFile(event.target.files[0],{directionName:"K"+this.idNumberPatient+"/PANAROMIC"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(type);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==15)
    {
      if(name.split('.')[name.split('.').length-1].toUpperCase()=='PNG'||
         name.split('.')[name.split('.').length-1].toUpperCase()=='JPG' ||
         name.split('.')[name.split('.').length-1].toUpperCase()=='JPEG' ||
         name.split('.')[name.split('.').length-1].toUpperCase()=='TIF')
        {
          this.fileManager.uploadFile(event.target.files[0],{directionName:"K"+this.idNumberPatient+"/CEPHALOMETRIC"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(type);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==17)
    {
      if(name.split('.')[name.split('.').length-1].toUpperCase()=='PDF')
        {
          this.fileManager.uploadFile(event.target.files[0],{directionName:"K"+this.idNumberPatient+"/fileTretment"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(type);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==18)
    {
      if(name.split('.')[name.split('.').length-1].toUpperCase()=='STL')
        {
          this.loadingFile3d=true;
          this.fileManager.uploadFile(event.target.files[0],{directionName:"K"+this.idNumberPatient+"/fileSTLfOR3DPrinting"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(type);
              this.loadingFile3d=false;
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==19)
    {
      if(name.split('.')[name.split('.').length-1].toUpperCase()==='OPN')
        {
          //  loadingFile3d:boolean=false;
          this.loadingFileOpn=true;
          this.UpStl.UploadStl(event.target.files[0],{directionName:"K"+this.idNumberPatient+"/OPNFiles"},"OPNFiles | ",this.idNumberPatient+3,(id)=>{
            this.loadFile(type);
            this.loadingFileOpn=false;
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==1)
    {
      if(name.toUpperCase().split('.').pop()=='STL')
        {
          this.LowerLoading=true;
          this.fileManager.uploadFile(event.target.files[0],{directionName:"K"+this.idNumberPatient+"/UpperStl"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(1);
              this.LowerLoading=false;
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning("Please upload a STL file" ,"Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==2)
    {
      if(name.toUpperCase().split('.').pop()=='STL')
        {
          this.LowerLoading=true;
          this.fileManager.uploadFile(event.target.files[0],{directionName:"K"+this.idNumberPatient+"/LowerStl"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(2);
              this.LowerLoading=false;
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning("Please upload a STL file" ,"Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==3)
    {
      if(name.toUpperCase().split('.').pop()=='STL')
        {
          this.OcclusionLoading=true;
          this.fileManager.uploadFile(event.target.files[0],{directionName:"K"+this.idNumberPatient+"/OcclusionStl"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(3);
              this.OcclusionLoading=false;
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning("Please upload a STL file" ,"Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==30)
    {
      if(name.toUpperCase().split('.').pop()=='PDF')
        {
          this.fileManager.uploadFile(event.target.files[0],{directionName:"K"+this.idNumberPatient+"/TretmentPlan/"+level+"/Setup"}).subscribe(res=>{
            this.loadFile(30);
          });
        }
        else
        {
          this.toastr.warning("Please upload a PDF file" ,"Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==31)
    {
      if(name.toUpperCase().split('.').pop()=='PDF')
        {
          this.fileManager.uploadFile(event.target.files[0],{directionName:"K"+this.idNumberPatient+"/TretmentPlan/"+level+"/Simulation"}).subscribe(res=>{
            this.loadFile(30);
          });
        }
        else
        {
          this.toastr.warning("Please upload a MP4 file" ,"Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==32)
    {
      if(name.toUpperCase().split('.').pop()=='MP4' || name.toUpperCase().split('.').pop()=='WMV')
        {
          this.fileManager.uploadFile(event.target.files[0],{directionName:"K"+this.idNumberPatient+"/TretmentPlan/"+level+"/Right"}).subscribe(res=>{
            this.loadFile(30);
          });
        }
        else
        {
          this.toastr.warning("Please upload a MP4 Or WMV  file" ,"Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==33)
    {
      if(name.toUpperCase().split('.').pop()=='MP4' || name.toUpperCase().split('.').pop()=='WMV')
        {
          this.fileManager.uploadFile(event.target.files[0],{directionName:"K"+this.idNumberPatient+"/TretmentPlan/"+level+"/Left"}).subscribe(res=>{
            this.loadFile(30);
          });
        }
        else
        {
          this.toastr.warning("Please upload a MP4 Or WMV file" ,"Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==34)
    {
      if(name.toUpperCase().split('.').pop()=='MP4' || name.toUpperCase().split('.').pop()=='WMV')
        {
          this.fileManager.uploadFile(event.target.files[0],{directionName:"K"+this.idNumberPatient+"/TretmentPlan/"+level+"/Frontal"}).subscribe(res=>{
            this.loadFile(30);
          });
        }
        else
        {
          this.toastr.warning("Please upload a MP4 Or WMV  file" ,"Warning" ,{
            timeOut :  3000
          });
        }
    }
  }

  loadingFile3d:boolean=false;
  addFile2(file:File,type:number,level:number=0) : void {
    if(type==0)
    {
      if(file.type.toUpperCase()=='IMAGE/PNG'||
      file.type.toUpperCase()=='IMAGE/JPG' ||
      file.type.toUpperCase()=='IMAGE/JPEG' ||
      file.type.toUpperCase()=='IMAGE/TIF')
        {
          
          this.fileManager.uploadFile(file,{directionName:"K"+this.idNumberPatient+"/PatientImage"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile();
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    if(type==6)
    {
      if(file.type.toUpperCase()=='IMAGE/PNG'||
      file.type.toUpperCase()=='IMAGE/JPG' ||
      file.type.toUpperCase()=='IMAGE/JPEG' ||
      file.type.toUpperCase()=='IMAGE/TIF')
        {
          this.fileManager.uploadFile(file,{directionName:"K"+this.idNumberPatient+"/imageFrontSmiling"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(6);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==7)
    {
      if(file.type.toUpperCase()=='IMAGE/PNG'||
      file.type.toUpperCase()=='IMAGE/JPG' ||
      file.type.toUpperCase()=='IMAGE/JPEG' ||
      file.type.toUpperCase()=='IMAGE/TIF')
        {
          this.fileManager.uploadFile(file,{directionName:"K"+this.idNumberPatient+"/imageFrontPose"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(7);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==8)
    {
      if(file.type.toUpperCase()=='IMAGE/PNG'||
      file.type.toUpperCase()=='IMAGE/JPG' ||
      file.type.toUpperCase()=='IMAGE/JPEG' ||
      file.type.toUpperCase()=='IMAGE/TIF')
        {
          this.fileManager.uploadFile(file,{directionName:"K"+this.idNumberPatient+"/imageProfile"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(8);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==9)
    {
      if(file.type.toUpperCase()=='IMAGE/PNG'||
      file.type.toUpperCase()=='IMAGE/JPG' ||
      file.type.toUpperCase()=='IMAGE/JPEG' ||
      file.type.toUpperCase()=='IMAGE/TIF')
        {
          this.fileManager.uploadFile(file,{directionName:"K"+this.idNumberPatient+"/imageUpperOcclusal"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(9);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==10)
    {
      if(file.type.toUpperCase()=='IMAGE/PNG'||
      file.type.toUpperCase()=='IMAGE/JPG' ||
      file.type.toUpperCase()=='IMAGE/JPEG' ||
      file.type.toUpperCase()=='IMAGE/TIF')
        {
          this.fileManager.uploadFile(file,{directionName:"K"+this.idNumberPatient+"/imageLowerOcclusal"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(10);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==11)
    {
      if(file.type.toUpperCase()=='IMAGE/PNG'||
      file.type.toUpperCase()=='IMAGE/JPG' ||
      file.type.toUpperCase()=='IMAGE/JPEG' ||
      file.type.toUpperCase()=='IMAGE/TIF')
        {
          this.fileManager.uploadFile(file,{directionName:"K"+this.idNumberPatient+"/imageLeftBuccal"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(type);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==12)
    {
      if(file.type.toUpperCase()=='IMAGE/PNG'||
      file.type.toUpperCase()=='IMAGE/JPG' ||
      file.type.toUpperCase()=='IMAGE/JPEG' ||
      file.type.toUpperCase()=='IMAGE/TIF')
        {
          this.fileManager.uploadFile(file,{directionName:"K"+this.idNumberPatient+"/imageFrontal"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(type);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==13)
    {
      if(file.type.toUpperCase()=='IMAGE/PNG'||
      file.type.toUpperCase()=='IMAGE/JPG' ||
      file.type.toUpperCase()=='IMAGE/JPEG' ||
      file.type.toUpperCase()=='IMAGE/TIF')
        {
          this.fileManager.uploadFile(file,{directionName:"K"+this.idNumberPatient+"/imageRightBuccal"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(type);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==14)
    {
      if(file.type.toUpperCase()=='IMAGE/PNG'||
      file.type.toUpperCase()=='IMAGE/JPG' ||
      file.type.toUpperCase()=='IMAGE/JPEG' ||
      file.type.toUpperCase()=='IMAGE/TIF')
        {
          this.fileManager.uploadFile(file,{directionName:"K"+this.idNumberPatient+"/PANAROMIC"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(type);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==15)
    {
      if(file.type.toUpperCase()=='IMAGE/PNG'||
      file.type.toUpperCase()=='IMAGE/JPG' ||
      file.type.toUpperCase()=='IMAGE/JPEG' ||
      file.type.toUpperCase()=='IMAGE/TIF')
        {
          this.fileManager.uploadFile(file,{directionName:"K"+this.idNumberPatient+"/CEPHALOMETRIC"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(type);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==17)
    {
      if(file.type.toUpperCase()=='APPLICATION/PDF')
        {
          this.fileManager.uploadFile(file,{directionName:"K"+this.idNumberPatient+"/fileTretment"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(type);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==18)
    {
      if(file.name.toUpperCase().split('.').pop()=='STL')
        {
          this.loadingFile3d=true;
          this.fileManager.uploadFile(file,{directionName:"K"+this.idNumberPatient+"/fileSTLfOR3DPrinting"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(type);
              this.loadingFile3d=false;
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning(this.trans.public.this_format_is_not_currently_supported, "Warning" ,{
            timeOut :  3000
          });
        }
    }
    
    else if(type==1)
    {
      if(file.name.toUpperCase().split('.').pop()=='STL')
        {
          this.fileManager.uploadFile(file,{directionName:"K"+this.idNumberPatient+"/UpperStl"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(1);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning("Please upload a STL file" ,"Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==2)
    {
      if(file.name.toUpperCase().split('.').pop()=='STL')
        {
          this.fileManager.uploadFile(file,{directionName:"K"+this.idNumberPatient+"/LowerStl"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(2);
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning("Please upload a STL file" ,"Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==3)
    {
      if(file.name.toUpperCase().split('.').pop()=='STL')
        {
          this.OcclusionLoading=true;
          this.fileManager.uploadFile(file,{directionName:"K"+this.idNumberPatient+"/OcclusionStl"}).subscribe(res=>{
            if(res==true)
            {
              this.loadFile(3);
              this.OcclusionLoading=false;
            }
            else
            {
  
            }
          });
        }
        else
        {
          this.toastr.warning("Please upload a STL file" ,"Warning" ,{
            timeOut :  3000
          });
        }
    }
    else if(type==30){
      if(file.name.toUpperCase().split('.').pop()=='PDF')
      {
        this.fileManager.uploadFile(file,{directionName:"K"+this.idNumberPatient+"/TretmentPlan/"+level+"/Setup"}).subscribe(res=>{
          this.loadFile(30);
        });
      }
      else
      {
        this.toastr.warning("Please upload a PDF file" ,"Warning" ,{
          timeOut :  3000
        });
      }

    }
    else if(type==31){
      if(file.name.toUpperCase().split('.').pop()=='PDF')
      {
        this.fileManager.uploadFile(file,{directionName:"K"+this.idNumberPatient+"/TretmentPlan/"+level+"/Simulation"}).subscribe(res=>{
          this.loadFile(30);
        });
      }
      else
      {
        this.toastr.warning("Please upload a PDF file" ,"Warning" ,{
          timeOut :  3000
        });
      }
    }
    else if(type==32){
      if(file.name.toUpperCase().split('.').pop()=='MP4' || file.name.toUpperCase().split('.').pop()=='WMV')
      {
        this.fileManager.uploadFile(file,{directionName:"K"+this.idNumberPatient+"/TretmentPlan/"+level+"/Right"}).subscribe(res=>{
          this.loadFile(30);
        });
      }
      else
      {
        this.toastr.warning("Please upload a PDF file" ,"Warning" ,{
          timeOut :  3000
        });
      }
    }
    else if(type==33){
      if(file.name.toUpperCase().split('.').pop()=='MP4' || file.name.toUpperCase().split('.').pop()=='WMV')
      {
        this.fileManager.uploadFile(file,{directionName:"K"+this.idNumberPatient+"/TretmentPlan/"+level+"/Left"}).subscribe(res=>{
          this.loadFile(30);
        });
      }
      else
      {
        this.toastr.warning("Please upload a PDF file" ,"Warning" ,{
          timeOut :  3000
        });
      }
    }
    else if(type==34){
      if(file.name.toUpperCase().split('.').pop()=='MP4' || file.name.toUpperCase().split('.').pop()=='WMV')
      {
        this.fileManager.uploadFile(file,{directionName:"K"+this.idNumberPatient+"/TretmentPlan/"+level+"/Frontal"}).subscribe(res=>{
          this.loadFile(30);
        });
      }
      else
      {
        this.toastr.warning("Please upload a PDF file" ,"Warning" ,{
          timeOut :  3000
        });
      }
    }
  }

  deleteFile(directionName,type:number=0){
    this.fileManager.deleteFile(directionName).subscribe(res=>{
      this.loadFile(type);
    });
  }
  gotToTab(tabCreate:any)
  {
       this.createOrderD=false;
        setTimeout(function () {
          tabCreate.select('tab3');
        }, 1);
  }
}

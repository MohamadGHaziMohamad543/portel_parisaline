import { Component, OnInit } from '@angular/core';
import {EncryptService} from '../../core/services/encrypt/encrypt.service'
import { ActivatedRoute } from '@angular/router';
import {DoctorService} from '../../core/services/doctor/doctor.service';
import { environment } from 'src/environments/environment.prod';
import { CountryService } from 'src/app/core/services/country/country.service';
import { CityService } from 'src/app/core/services/city/city.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DentalCenterService } from 'src/app/core/services/dentalCenter/dental-center.service';
import { LaboratorysService } from 'src/app/core/services/laboratorys/laboratorys.service';
import { mediator } from 'src/app/core/models/mediator';
import { MediatorService } from 'src/app/core/services/mediator/mediator.service';
@Component({
  selector: 'app-med-profile',
  templateUrl: './med-profile.component.html',
  styleUrls: ['./med-profile.component.scss']
})
export class MedProfileComponent implements OnInit {


  id:number;
  url:string;
   // bread crumb items
  breadCrumbItems: Array<{}>;
  Lab:any;
  countryName:String;
  countryCode:String;
  cityName:String;
  longitude = 20.728218;
  latitude = 52.128973;
  
  constructor(
    private encryptService:EncryptService,
    private DoctorService:DoctorService,
    private dentalCenterServ:DentalCenterService,
    private medServer:MediatorService,
    private route:ActivatedRoute,
    private modalService: NgbModal,
    private toastr:ToastrService,
    private countryService:CountryService,
    private cityServ:CityService
    ) {
    this.Lab="";
    this.url=environment.url;
    let id = this.encryptService.Decode(this.route.snapshot.paramMap.get("id"));
    if(id!="")
    {
      this.id=1;
    }
    else{
       
    }
  }

  
 ngOnInit() {

  this.medServer.getById(this.id).subscribe(res=>{
    
    this.Lab=res[0];
    this.countryService.getNameById(res[0].countryId).subscribe(Rcountry=>{
      this.countryName=Rcountry[0].countryName;
      this.countryCode=Rcountry[0].code;
    });
    this.cityServ.getNameById(res[0].cityId).subscribe(Rcity=>{
      this.cityName=Rcity[0].cityName;
    })
  })
 }
 
 getImg(urlimg:string){
   if(urlimg!=undefined)
   return this.url+"/"+urlimg;
   
 }
 
 getLocation(num:number,location:string){
   if(location!=undefined)
   return location.split('=')[num];
 }


 OpenModalPass(content: string) {
  this.modalService.open(content);
 }

 typePassword:number=0;
 CheckPassword(password:string){
  var score = 0;
  if (password.length > 8) {
      score += 25;
  }      
  if ((password.match(/[a-z]/)) && (password.match(/[A-Z]/))) {
      score += 25;
  }
  if (password.match(/[\!\@\#\$\%\^\&\*\?\_\~\-\(\)]+/)) {
      score += 25;
  }
  if (password.match(/[0-9]/)) {
      score += 25
  }
  this.typePassword=score;
 }

 getClassPassCheck(){
   if(this.typePassword==0)
   {
     return "danger";
   }
   else if(this.typePassword==25)
   {
     return "warning";
   }
   else if(this.typePassword==50)
   {
     return "secondary";
   }
   else if(this.typePassword==75)
   {
     return "info";
   }
   else if(this.typePassword==100)
   {
     return "success";
   }
 }

 changePasswordForMed(password:string)
 {
   this.medServer.chpass(password,this.id).subscribe(res=>{
     if(res.message==2001)
     {
      this.toastr.success("update Password successfulay", "successfull" ,{
        timeOut :  3000
      });
      this.modalService.dismissAll();
      this.typePassword=0;
     }
     else
     {
      this.toastr.error("Error in server", "Error" ,{
        timeOut :  3000
      });
     }
   });
 }

}

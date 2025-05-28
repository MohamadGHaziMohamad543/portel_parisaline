import { Component, OnInit } from '@angular/core';
import {EncryptService} from '../../core/services/encrypt/encrypt.service'
import { ActivatedRoute } from '@angular/router';
import {DoctorService} from '../../core/services/doctor/doctor.service';
import { doctor } from 'src/app/core/models/doctor';
import { environment } from 'src/environments/environment.prod';
import { country } from 'src/app/core/models/country';
import { CountryService } from 'src/app/core/services/country/country.service';
import { city } from 'src/app/core/models/city';
import { countryName } from 'src/app/core/models/countryName';
import { cityName } from 'src/app/core/models/cityName';
import { CityService } from 'src/app/core/services/city/city.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {

  id:number;
  url:string;
   // bread crumb items
  breadCrumbItems: Array<{}>;
  doctor:any;
  countryName:String;
  countryCode:String;
  cityName:String;
  longitude = 20.728218;
  latitude = 52.128973;
  
  constructor(private encryptService:EncryptService,
    private DoctorService:DoctorService,
    private route:ActivatedRoute,
    private modalService: NgbModal,
    private toastr:ToastrService,
    private countryService:CountryService,private cityServ:CityService) {
      this.doctor="";
      this.url=environment.url;
    let id = this.encryptService.Decode(this.route.snapshot.paramMap.get("id"));
    if(id!="")
    {
      
      this.id=id;
    }
    else{
       
    }
  }

 ngOnInit() {

  this.DoctorService.getById(this.id).subscribe(res=>{
    this.doctor=res[0];
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

 changePasswordForDoctor(password:string)
 {
   this.DoctorService.chpass(password,this.id).subscribe(res=>{
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

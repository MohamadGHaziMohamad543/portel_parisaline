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
import { DentalCenterService } from 'src/app/core/services/dentalCenter/dental-center.service';
@Component({
  selector: 'app-profile-dentel-center',
  templateUrl: './profile-dentel-center.component.html',
  styleUrls: ['./profile-dentel-center.component.scss']
})
export class ProfileDentelCenterComponent implements OnInit {


  id:number;
  url:string;
   // bread crumb items
  breadCrumbItems: Array<{}>;
  dentelCenterItem:any;
  countryName:String;
  countryCode:String;
  cityName:String;
  longitude = 20.728218;
  latitude = 52.128973;
  
  constructor(private encryptService:EncryptService,
    private dentelCenter:DentalCenterService,
    private route:ActivatedRoute,
    private countryService:CountryService,private cityServ:CityService) {
      this.dentelCenterItem="";
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

  this.dentelCenter.getById(this.id).subscribe(res=>{
    this.dentelCenterItem=res[0];
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

}

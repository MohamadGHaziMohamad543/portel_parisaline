import { Component, OnInit } from '@angular/core';
import {NoticesService} from 'src/app/core/services/notices/notices.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  breadCrumbItems:any[]=[];
  constructor(private noti:NoticesService) { }

  allNotiFi:any[]=[];
  ngOnInit() {
    this.getAllInformation();
    this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' },{ label: "SETTINGS", path: '/', active: true }, { label: "NOTIFICATIONS", path: '/', active: true }];

  }

  getAllInformation(){
    this.noti.getAll().subscribe(res=>{
      this.allNotiFi=res;
      res.forEach(res=>{
        if(typeof res.content=="string")
        {
          res.content=JSON.parse(res.content);
        }
      })
    });
  }


  getTypeUser(typeUser){

    if(typeUser==1)
    {
      return "Admin";
    }
    else if(typeUser==2){
      return "Doctor";
    }
    else if(typeUser==3){
      return "Lab";
    }
    else if(typeUser==4){
      return "DentelCenter";
    }
    else if(typeUser==5){
      return "mediators";
    }
    else if(typeUser==6){
      return "webSite";
    }
    else{
      return typeUser;
    }
  }
  getTypeNotfi(type){
    if(type==1)
    {
      return "Insert";
    }
    else if(type==2)
    {
      return "Update";
    }
    else if(type==3)
    {
      return "Delete";
    }
    else if(type==4)
    {
      return "disable";
    }
    else if(type==5)
    {
      return "enabel";
    }
    else if(type==6)
    {
      return "Login";
    }
    else if(type==7)
    {
      return "Created";
    }
    else{
      return type;
    }
  }
  getDate(date){
    let event = new Date(date);
   // return event.getFullYear()+"/"+event.getMonth()+"/"+event.getUTCDay()+" "+event.getHours()+":"+event.getMinutes()+":"+event.getSeconds();
   return event.toDateString() +" | "+event.getHours()+":"+event.getMinutes()+":"+event.getSeconds();
  }
}

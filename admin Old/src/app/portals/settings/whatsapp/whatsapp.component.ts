import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss']
})
export class WhatsappComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' }, { label:"Settings", path: '/', active: false },{ label:"Whatsapp", path: '/', active: false }];
  
    this.getQrCode();
  }

  resutlQr="";
  getQrCode(){
    this.http.post<any>("https://wap.parisaline.com/getQrCode",{}).subscribe(res=>{
      if(res.status===2){
        this.status=1;
        //this.getCotacts();
      }
      document.getElementById('qrWahtsapp').innerHTML=res.qr;
    });
  }

  Contacts=[];
  getCotacts(){
    this.http.post<any>("https://wap.parisaline.com/getContacts",{}).subscribe(res=>{
      if(res.status===200){
        this.Contacts=res.data;
      }
    });
   
  }

  Chats:[]
  getChats(id){
    this.http.post<any>(`https://wap.parisaline.com/getChats?id=${id}`,{id:id}).subscribe(res=>{
      if(res.status===200){
        this.Chats=res.message;
        
      }
    });
  }

  status=0;
  logOut(){
    this.http.post<any>(`https://wap.parisaline.com/logOut`,{}).subscribe(res=>{
      document.getElementById('qrWahtsapp').innerHTML='';
      this.status=0;
      this.getQrCode();
    });
  }
}

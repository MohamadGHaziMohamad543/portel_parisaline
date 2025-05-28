import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { UserAuth } from '../../models/auth.models';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket:io;
  private connstatus: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private connctionStatus:boolean=false;
  private events=[];
  constructor( ) { 
  }

   private observabelChatOP: BehaviorSubject<boolean> = new BehaviorSubject(false);
  connction(type:number,user:UserAuth){
    if(this.socket == undefined)
    {
      //type : 1 =ADMIN ,2=DOCTOR ,3=LABRETOR,4=MEDIARETOR,5=DENTELCENTER,6=users
     this.socket=io( environment.url, {reconnect: true,query:{id:user.id,type:type,name:user.nameUser}} );
     this.socket.on("connect",(data: any)=> { 
       this.connctionStatus=true;
      this.connstatus.next(true);
     });
     this.socket.on("disconnect",(data: any)=> { 
      this.connctionStatus=false;
       this.connstatus.next(false);
     });  
    }
    else
    {
      if(!this.connctionStatus)
      {
        this.socket.connect();
      }
    }

  }

  disConncted(){
    if(this.connctionStatus)
    {
      this.socket.disconnect();
    }

  
  }
  getStatusConnction(){
    return this.connstatus.asObservable();
  }

  emit(nameEvent:string,param:any){
    this.socket.emit(nameEvent,param);
  }

  public addevent(nameEvent:string): Observable<any> {
    this.events.push({name:nameEvent});
     return new Observable<any>(observer => {
       this.socket.on(nameEvent, (data: any) => observer.next(data));
     });
  }

  chekevent(nameevent){
    for (let i = 0; i < this.events.length; i++) {
      if(this.events[i].name==nameevent)
      {
        return false;
      }
    }
    return true;
  }

  getObservabelChat(){
    return this.observabelChatOP.asObservable();
  }

  observabelChat()
  {
    this.observabelChatOP.next(true);
  }
}

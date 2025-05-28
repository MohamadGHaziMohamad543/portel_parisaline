import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import {SocketService} from './core/services/socket/socket.service';
import { ToastrService } from 'ngx-toastr';
import { StlViewService } from './core/services/stlView/stl-view.service';
import { AuthenticationService } from './core/services/auth.service';
import { Router, NavigationStart,Event, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
@Component({
  selector: 'app-ubold',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  permssion:[]=[];
  constructor(private router:Router,private auth:AuthenticationService,private sok:SocketService,   private toastr:ToastrService,   private stlView:StlViewService){

    this.sok.getStatusConnction().subscribe(res=>{
      if(res)
      {
        if(this.sok.chekevent('NOTF'))
        {
          this.sok.addevent('NOTF').subscribe((data)=>{
            if(data.content[0].section=="Cases")
            {
              if(data.typeNotices==1)
              this.toastr.success(data.content[0].information,"Add");
            }
            
          });
        }

        if(this.sok.chekevent('SERVERLOGS'))
        {
          this.sok.addevent('SERVERLOGS').subscribe((data)=>{
            let Logs=document.createElement('p');
           
            if(data.type==="MESSAGE"){
              Logs.style.background='#8203b6';
              Logs.innerText=data.data.toString();
            }
            else if(data.type==="ERRORSERVER"){
              Logs.style.background='rgb(230 0 0)';
              Logs.innerText=data.data.toString();
            }
            else if(data.type==="ERRORMESSAGE"){
              Logs.style.background='rgb(230 0 142)';
              Logs.innerText=data.data.toString();
            }
           
            document.getElementById('logServer').querySelector('#txtLogs').appendChild(Logs);
            document.getElementById('logServer').querySelector('#txtLogs').scrollTop= document.getElementById('logServer').querySelector('#txtLogs').scrollHeight
          });
        }
      }
      else{
      }
    });
    // this.router.events.subscribe((event:Event) => {
    //   if (event instanceof NavigationStart) {
    //       // Show loading indicator
    //      let num=0
    //       this.permssion.forEach(element => {
    //         if(element==event.url)
    //         {
    //           num++;
    //         }
    //       });
    //       if(num==0 && this.auth.user.role==2)
    //       {
    //         this.router.navigateByUrl("/notFondPage");
    //       }
    //   }
    // });
  }



  StopAnmtion(){
    this.stlView.StopAnmtion();
  }
  closeStlViewr(){
    this.stlView.StopAnmtion();
    this.stlView.clearStl();
    (<HTMLDivElement>document.getElementById("modelDivStlViewr")).style.display="none";
  }
}

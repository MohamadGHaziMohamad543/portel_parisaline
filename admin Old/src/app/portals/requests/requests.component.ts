import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EncryptService } from 'src/app/core/services/encrypt/encrypt.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  type=true;
  id:number=-1;
  constructor(private _Activatedroute:ActivatedRoute,private encryptService:EncryptService) {
    this._Activatedroute.paramMap.subscribe(params => { 
        if(params.get('id')=='_'){
          this.type = true; 
        }
        else{
          let id = this.encryptService.Decode(params.get('id'));
          this.id=id;
          if(id=='')
          {
            this.type = true; 
          }
          else{
            this.type = false; 
          }
        } 
     });
   }

  ngOnInit() {
  }

}

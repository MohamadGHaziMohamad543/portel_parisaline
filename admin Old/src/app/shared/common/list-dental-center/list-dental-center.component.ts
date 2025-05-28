import { Component, OnInit, Input } from '@angular/core';
import {DentalCenterService} from 'src/app/core/services/dentalCenter/dental-center.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TransService } from 'src/app/core/services/translation/trans.service';

import { EncryptService } from 'src/app/core/services/encrypt/encrypt.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { environment } from 'src/environments/environment.prod';
import { Router } from "@angular/router";
@Component({
  selector: 'app-list-dental-center',
  templateUrl: './list-dental-center.component.html',
  styleUrls: ['./list-dental-center.component.scss']
})
export class ListDentalCenterComponent implements OnInit {

  url:string;
  imageChangedEvent: any = '';
  croppedImage:any="";
  Trans:Subscription;
  dentalCenter:any[];
  trans:any;
  breadCrumbItems: Array<{}>;
  @Input('ID') ID: number;
  @Input('USERTYPE') USERTYPE: number;
  constructor(
    private DC:DentalCenterService,
    private transs:TransService,
    private EncryptService:EncryptService,
    private router:Router) { 
      this.url=environment.url;
    }
  ngOnInit() {
    this.Trans=this.transs.trans.subscribe(res=>{
      this.trans=res.key;
    });
    this.getAll();
  }


  
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  getLink(id:number,type=null){
    
    if(type)
    {
      
      this.router.navigate(["/DentalCenter/Profile/"+this.EncryptService.Encrypt(id)]).then( (e) => {
        if (e) {
          console.log("Navigation is successful!");
        } else {
          console.log("Navigation has failed!");
        }
      });
    }
    else
    {
      this.router.navigate(["/Doctor/Profile/"+this.EncryptService.Encrypt(id)]).then( (e) => {
        if (e) {
        } else {
        }
      });
    }
   }

  getAll(){
  if(this.USERTYPE==3)
  {
    this.DC.getAllBylaboratorysId(this.ID).subscribe(res=>{
      this.dentalCenter=res;
    });
  }
  else if(this.USERTYPE==4){
    this.DC.getAllByMediatorId(this.ID).subscribe(res=>{
      this.dentalCenter=res;
    });
  }

  }
  ngOnDestroy() {
    this.Trans.unsubscribe();
  }




}

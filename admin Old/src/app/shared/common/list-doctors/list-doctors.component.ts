import { Component, OnInit, Input } from '@angular/core';
import {DentelCenterClintService} from 'src/app/core/services/dentelCenterClint/dentel-center-clint.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list-doctors',
  templateUrl: './list-doctors.component.html',
  styleUrls: ['./list-doctors.component.scss']
})
export class ListDoctorsComponent implements OnInit {


  dctorClaint:any[]=[];
  urlStatic="";
  @Input('ID') ID: number;
  constructor(
    private Dclint:DentelCenterClintService,
    private auth:AuthenticationService,
    private toastr:ToastrService
  ) { 
    this.urlStatic=environment.url+"/";
  }

  getAllDoctor()
  {
    this.Dclint.getAllDoctor(this.ID).subscribe(res=>{
      this.dctorClaint=res;
    });
  }


  Accept(id:number){
    this.Dclint.deactivate_or_activate(id,1).subscribe(res=>{
      if(res.message==2001)
      {
        this.toastr.success("تم قبول الطلب", "successfull" ,{
          timeOut :  3000
        });
      }
    });
  }
  ngOnInit() {

    this.getAllDoctor();
  }

}

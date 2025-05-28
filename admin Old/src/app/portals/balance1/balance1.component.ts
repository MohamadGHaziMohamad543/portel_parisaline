
import { Component, OnInit } from '@angular/core';
import { BalanceService } from 'src/app/core/services/balance/balance.service';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EncryptService } from 'src/app/core/services/encrypt/encrypt.service';

@Component({
  selector: 'app-balance1',
  templateUrl: './balance1.component.html',
  styleUrls: ['./balance1.component.scss']
})
export class Balance1Component implements OnInit {

  balances=[];
  balanceItem:any=null;
  breadCrumbItems: Array<{}>;
  isbnMask1 = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/];
  isbnMask2 = [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/];
  datacard = [/\d/,/\d/,'/',/\d/, /\d/];
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cardMask  = [ /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
  securitycode  = [ /\d/, /\d/, /\d/, /\d/];
  urlStatic:string;
  LodingMore:boolean=false;
  term: any;
  pass:any;
  submitted: boolean;
  Tpassword:boolean=false;
  billTypeItems=[
    {id:0,label:"bankTransFer"},
    {id:1,label:"Credit card"},

  ];
  billTypeModel=0;
  // validation form
  //PATIENTS
  validationform: FormGroup;
  constructor(
    private balance:BalanceService,
    private tostr:ToastrService,
    private auth:AuthenticationService,
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    private EncryptService:EncryptService,
    ) { 
      this.urlStatic=environment.url+"/";
    }

  ngOnInit() {
    this.getAllbalance();
    this.billTypeModel=0;
    this.validationform = this.formBuilder.group({
      price: ['', [Validators.required]],
      comment: ['', [Validators.required]],
      billType: ['', [Validators.required]],
      pass: ['', [Validators.required]],
    });
    this.breadCrumbItems = [{ label: 'DASHBOARD', path: '/' }, { label:"PAYMENTS", path: '/', active: true }];
    this.validationform.addControl("dentalCenterId",new FormControl());
    this.validationform.addControl("doctorId",new FormControl());
    this.validationform.get('price').setValue("100");
    
  }
 
  getAllbalance(){
    this.LodingMore=true;
    this.balance.getAllAccepted().subscribe(res=>{
      this.balances=res;
      this.LodingMore=false;
    });
  }
  
  get form() {
    return this.validationform.controls;
  }
  //create balnce on claint
  acceptedBalnce(){
    if(!this.Tpassword)
    {
      this.Tpassword=true;
      return;
    }
    
    this.balance.accepted(this.balanceItem.id,this.auth.user.id,this.pass).subscribe(res=>{
      if(res.message==2000)
      {
        this.tostr.success("Balance has been added to the center "+this.balanceItem.dentalCenterName,"Add Price");
        this.Tpassword=false;
        this. getAllbalance();
        this.modalService.dismissAll();
      }
      else if(res.message==2001){
        this.tostr.warning("Password error","Add Price");
       }
       else if(res.message==2003){
        this.tostr.warning("There is an error in your account","Add Price");
        this.auth.logout();
       }
      else if(res.message==55555){
       this.tostr.warning("Error adding balance ","Add Price");
      }
     });
  }
  getLink(id:number,type=null){
    
    if(type)
    {
      
      return "/DentalCenter/Profile/"+this.EncryptService.Encrypt(id);
    }
    else
    {
      return "/Doctor/Profile/"+this.EncryptService.Encrypt(id);
    }
   }
  openModal(content: string,id:number) {
    if(id != -1)
    {
      this.balanceItem=this.balances.find(x=>x.id==id);
    }
    this.modalService.open(content,{ size: 'lg'});
  }

  getBalances(){

  }

}

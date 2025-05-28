import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { TransService } from 'src/app/core/services/translation/trans.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { paymentAddress } from 'src/app/core/models/paymentAddress';

import { CityService } from 'src/app/core/services/city/city.service';
import { country } from 'src/app/core/models/country';
import { city } from 'src/app/core/models/city';
import { PaymentAddressService } from 'src/app/core/services/paymentAddress/payment-address.service';
import { CountryService } from 'src/app/core/services/country/country.service';
@Component({
  selector: 'app-payment-address',
  templateUrl: './payment-address.component.html',
  styleUrls: ['./payment-address.component.scss']
})
export class PaymentAddressComponent implements OnInit {


  breadCrumbItems: Array<{}>;
  btn:boolean;
  Trans:Subscription;
  trans:any;
  country:country[];
  city:city[];
  paymentAddress:paymentAddress;

  
  formpaymentAddress: FormGroup;
  submitted = false;
  error = '';
  loading = false;
  titleForm:String="Add sms Mode";
  typeForm:Number=0;
  smsModelId:number=-1;
  @Input('ID') ID: number;
  @Input('USERTYPE') USERTYPE: number;
  constructor(private transs:TransService,
    private PaymentAddressService:PaymentAddressService,
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private CountryService:CountryService,
    private CityService:CityService) { }

  ngOnInit() {
    this.loading=true;
    this.Trans=this.transs.trans.subscribe(res=>{
      this.trans=res.key;
      this.breadCrumbItems = [{ label: 'Setting', path: '/' }, { label: this.trans.card1_title, path: '/', active: true }];
    });

    this.btn=true;
    this.formpaymentAddress = this.formBuilder.group({
      fullName: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      countryId: ['', Validators.required],
      cityId: ['', Validators.required],
      phone: ['', Validators.required],
      postalCode: ['', Validators.required]
    });
    this.formpaymentAddress.addControl('id',new FormControl(-1));
    this.formpaymentAddress.addControl('userId',new FormControl(this.ID));
    this.formpaymentAddress.addControl('userType',new FormControl(this.USERTYPE));
    this.getCountry();
    this.get();
  }
  get f() {
    return this.formpaymentAddress.controls;
  }
  getCountry(){
    this.CountryService.getAllAndName().subscribe(res=>{
      this.country=res;
    });
  }

  getCity(countryId:number){
    this.CityService.getAllAndNameById(countryId).subscribe(res=>{
      this.city=res;
    });
  }
  onChange(){
    if(this.formpaymentAddress.get("countryId").value != undefined && this.formpaymentAddress.get('countryId').value != "")
    {
      this.getCity(this.formpaymentAddress.get("countryId").value);
     
    }
  }
  get(){
    this.PaymentAddressService.get(this.USERTYPE,this.ID).subscribe(res=>{
      this.paymentAddress=res;
      this.putValueController();
      this.loading=false;
      this.btn=true;
    });
  }
  putValueController(){
    if(this.paymentAddress != null)
    {
      this.formpaymentAddress.get('id').setValue(this.paymentAddress.id);
      this.formpaymentAddress.get('fullName').setValue(this.paymentAddress.fullName);
      this.formpaymentAddress.get('address1').setValue(this.paymentAddress.address1);
      this.formpaymentAddress.get('address2').setValue(this.paymentAddress.address2);
      this.formpaymentAddress.get('countryId').setValue(this.paymentAddress.countryId);
      this.formpaymentAddress.get('cityId').setValue(this.paymentAddress.cityId);
      this.formpaymentAddress.get('phone').setValue(this.paymentAddress.phone);
      this.formpaymentAddress.get('postalCode').setValue(this.paymentAddress.postalCode);
      this.formpaymentAddress.disable({onlySelf:true});
    }

  }

  edit(){
    this.btn=false;
    this.formpaymentAddress.enable({onlySelf:true});

  }
  onSubmit()
  {
    this.PaymentAddressService.createAndUpdate(this.formpaymentAddress.value).subscribe(res=>{
      this.toastr.success(this.trans.paymentAddress.updatedSuccessfully, "Success" ,{
        timeOut :  3000
      });
      this.get();
    });
  }

}

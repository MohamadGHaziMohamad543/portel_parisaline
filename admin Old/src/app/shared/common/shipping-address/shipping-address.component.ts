import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { TransService } from 'src/app/core/services/translation/trans.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { shippingAddress } from 'src/app/core/models/shippingAddress';
import { country } from 'src/app/core/models/country';
import { city } from 'src/app/core/models/city';
import { ShippingAddressService } from 'src/app/core/services/shippingAddress/shipping-address.service';
import { CountryService } from 'src/app/core/services/country/country.service';
import { CityService } from 'src/app/core/services/city/city.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss']
})
export class ShippingAddressComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  btn:boolean;
  Trans:Subscription;
  trans:any;
  country:country[];
  city:city[];
  shippingAddress:shippingAddress;

  
  formshippingAddress: FormGroup;
  submitted = false;
  error = '';
  loading = false;
  titleForm:String="Add sms Mode";
  typeForm:Number=0;
  smsModelId:number=-1;
  @Input('ID') ID: string;
  @Input('USERTYPE') USERTYPE: string;
  constructor(
    private transs:TransService,
    private ShippingAddressService:ShippingAddressService,
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private toastr:ToastrService,
    private CountryService:CountryService,
    private CityService:CityService) { 
    }

  ngOnInit() {
    this.loading=true;
    this.Trans=this.transs.trans.subscribe(res=>{
      this.trans=res.key;
      this.breadCrumbItems = [{ label: 'Setting', path: '/' }, { label: this.trans.card1_title, path: '/', active: true }];
    });
    this.btn=true;
    this.formshippingAddress = this.formBuilder.group({
      fullName: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      countryId: ['', Validators.required],
      cityId: ['', Validators.required],
      phone: ['', Validators.required],
      postalCode: ['', Validators.required]
    });
    this.formshippingAddress.addControl('id',new FormControl(-1));
    this.formshippingAddress.addControl('userId',new FormControl(this.ID));
    this.formshippingAddress.addControl('userType',new FormControl(this.USERTYPE));
    this.getCountry();
    this.get();
  }

  get f() {
    return this.formshippingAddress.controls;
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
    if(this.formshippingAddress.get("countryId").value != undefined && this.formshippingAddress.get('countryId').value != "")
    {
      this.getCity(this.formshippingAddress.get("countryId").value);
     
    }
  }
  get(){
    this.ShippingAddressService.get(this.USERTYPE,this.ID).subscribe(res=>{
      this.shippingAddress=res;
      this.putValueController();
      this.loading=false;
      this.btn=true;
    });
  }
  putValueController(){
    if(this.shippingAddress != null)
    {
      this.formshippingAddress.get('id').setValue(this.shippingAddress.id);
      this.formshippingAddress.get('fullName').setValue(this.shippingAddress.fullName);
      this.formshippingAddress.get('address1').setValue(this.shippingAddress.address1);
      this.formshippingAddress.get('address2').setValue(this.shippingAddress.address2);
      this.formshippingAddress.get('countryId').setValue(this.shippingAddress.countryId);
      this.formshippingAddress.get('cityId').setValue(this.shippingAddress.cityId);
      this.formshippingAddress.get('phone').setValue(this.shippingAddress.phone);
      this.formshippingAddress.get('postalCode').setValue(this.shippingAddress.postalCode);
      this.formshippingAddress.disable({onlySelf:true});
    }

  }

  edit(){
    this.btn=false;
    this.formshippingAddress.enable({onlySelf:true});

  }
  onSubmit()
  {
    this.ShippingAddressService.createAndUpdate(this.formshippingAddress.value).subscribe(res=>{
      this.toastr.success(this.trans.shippingAddress.updatedSuccessfully, "Success" ,{
        timeOut :  3000
      });
      this.get();
    });
  }
}

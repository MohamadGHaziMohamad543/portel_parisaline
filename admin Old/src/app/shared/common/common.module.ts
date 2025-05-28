import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { PaymentAddressComponent } from './payment-address/payment-address.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {UIModule} from '../ui/ui.module';
import { NgxFlagIconCssModule } from 'ngx-flag-icon-css';
import { NgSelectModule } from '@ng-select/ng-select';
import { ResponsibleComponent } from './responsible/responsible.component';
import { PricingStrategyComponent } from './pricing-strategy/pricing-strategy.component';
import { ImageCropperModule } from 'ngx-image-cropper';

import { TextMaskModule } from 'angular2-text-mask';
import { NgbDropdownModule, NgbTabsetModule, NgbAccordionModule, NgbCollapseModule, NgbModalModule, NgbProgressbarModule, NgbAlertModule, NgbToastModule, NgbPopoverModule, NgbTooltipModule, NgbPaginationModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { BillsBalanceComponent } from './bills-balance/bills-balance.component';
import { CasesDoctorComponent } from './cases-doctor/cases-doctor.component';
import { ListDoctorsComponent } from './list-doctors/list-doctors.component';
import { ListbalaceComponent } from './listbalace/listbalace.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PermissionsComponent } from './permissions/permissions.component';
import { ListDentalCenterComponent } from './list-dental-center/list-dental-center.component';
import { KeditorComponent } from './keditor/keditor.component';
import { VideoTrementComponent } from './video-trement/video-trement.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { CodeeditorComponent } from './codeeditor/codeeditor.component';
@NgModule({
  declarations: [ShippingAddressComponent,KeditorComponent,PaymentAddressComponent, ResponsibleComponent, PricingStrategyComponent, BillsBalanceComponent, CasesDoctorComponent, ListDoctorsComponent, ListbalaceComponent, PermissionsComponent, ListDentalCenterComponent, VideoTrementComponent,UploadFilesComponent, CodeeditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    NgbDropdownModule,
    NgbTabsetModule,
    NgbAccordionModule,
    NgbCollapseModule,
    NgbModalModule,
    NgbProgressbarModule,
    NgbAlertModule,
    NgbToastModule,
    NgbPopoverModule,
    NgbTooltipModule,
    NgbPaginationModule,
    NgbCarouselModule,
    NgxFlagIconCssModule,
    Ng2SearchPipeModule,
    NgSelectModule,
    TextMaskModule,
    ImageCropperModule
  ],
  exports: [ShippingAddressComponent,KeditorComponent,PaymentAddressComponent,CasesDoctorComponent,ResponsibleComponent,PricingStrategyComponent,ListDoctorsComponent,ListbalaceComponent,PermissionsComponent,ListDentalCenterComponent,VideoTrementComponent,UploadFilesComponent,CodeeditorComponent]
})
export class CommonsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '../shared/ui/ui.module';
import { PortalRoutingModule } from './portal-routing.module';
import { NgbDropdownModule, NgbTabsetModule, NgbAccordionModule, NgbCollapseModule, NgbModalModule, NgbProgressbarModule, NgbAlertModule, NgbToastModule, NgbPopoverModule, NgbTooltipModule, NgbPaginationModule, NgbCarouselModule ,NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import { DoctorComponent } from './doctor/doctor.component';
import { LaboratorysComponent } from './laboratorys/laboratorys.component';
import { RequestsComponent } from './requests/requests.component';
import { DentalCenterComponent } from './dental-center/dental-center.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LightboxModule } from 'ngx-lightbox';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxFlagIconCssModule } from 'ngx-flag-icon-css';
import { MediatorComponent } from './mediator/mediator.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { CommonsModule } from '../shared/common/common.module';
import { AgmCoreModule } from '@agm/core';
import { PatientComponent } from './patient/patient.component';
import { StatusComponent } from './status/status.component';
import { NgbDatepickerModule,} from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { NgxFileDropModule } from 'ngx-file-drop';

import { ImageViewerModule } from 'ng2-image-viewer';
import { HomeComponent } from './home/home.component';
import { ZoomableCanvasComponent } from '@durwella/zoomable-canvas';
import { Ng5SliderModule } from 'ng5-slider';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TextMaskModule } from 'angular2-text-mask';
import { BalanceComponent } from './balance/balance.component';
import { ProfileDentelCenterComponent } from './profile-dentel-center/profile-dentel-center.component';
import { LabProfileComponent } from './lab-profile/lab-profile.component';
import { MedProfileComponent } from './med-profile/med-profile.component';
import { DoctorproviderComponent } from './doctorprovider/doctorprovider.component';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import { Balance1Component } from './balance1/balance1.component';
import { NotfondpageComponent } from './notfondpage/notfondpage.component';

@NgModule({
  declarations: [DoctorComponent,ZoomableCanvasComponent, LaboratorysComponent, RequestsComponent,StatusComponent, DentalCenterComponent,PatientComponent, MediatorComponent, DoctorProfileComponent, HomeComponent, BalanceComponent, ProfileDentelCenterComponent, LabProfileComponent, MedProfileComponent, DoctorproviderComponent, Balance1Component, NotfondpageComponent],
  imports: [
    CommonModule,
    PortalRoutingModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    ChartsModule,
    NgxFileDropModule,
    NgbDropdownModule,
    NgbTabsetModule,
    ImageViewerModule,
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
    LightboxModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    CommonsModule,
    Ng5SliderModule,
    UiSwitchModule,
    NgSelectModule,
    ImageCropperModule,
    NgxFlagIconCssModule,
    TextMaskModule,
    Ng2SearchPipeModule,
    NgbTypeaheadModule,
    NgxIntlTelInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDtOmp3ADCtmSRpchO6rHaPWMoI6mW5Etk'
    })
  ]
})
export class PortalModule { }

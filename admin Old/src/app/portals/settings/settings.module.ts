import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { SettingsRoutingModule } from './settings-routing.module';
import { UsersComponent } from './users/users.component';
import { UIModule } from '../../shared/ui/ui.module';
import { UiSwitchModule } from 'ngx-ui-switch';
import { GeneralComponent } from './general/general.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDropdownModule } from 'ngx-bootstrap';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LanguagesComponent } from './languages/languages.component';
import { EmailModelComponent } from './email-model/email-model.component';
import { NgxFlagIconCssModule } from 'ngx-flag-icon-css';
import { CurrencyComponent } from './currency/currency.component'
import { NgxMaskModule } from 'ngx-mask';
import { CountryComponent } from './country/country.component';
import { CityComponent } from './city/city.component';
import { NgxEditorModule } from 'ngx-editor';
import { SmsModelComponent } from './sms-model/sms-model.component';
import { CommonsModule } from '../../shared/common/common.module';
import { ShippingCompanyComponent } from './shipping-company/shipping-company.component';
import { NotificationComponent } from './notification/notification.component';
import { InfoUsersComponent } from './info-users/info-users.component';
import { MembershipsComponent } from './memberships/memberships.component';
import { PricestrategyComponent } from './pricestrategy/pricestrategy.component';
import { BarcodesComponent } from './barcodes/barcodes.component';
import { CaseStageComponent } from './case-stage/case-stage.component';
import { FunctionProsessComponent } from './function-prosess/function-prosess.component';
import { SubmtionTextComponent } from './submtion-text/submtion-text.component';
import { WhatsappComponent } from './whatsapp/whatsapp.component';
import { BarndSettingComponent } from './barnd-setting/barnd-setting.component';

@NgModule({
  declarations: [UsersComponent, GeneralComponent, LanguagesComponent, EmailModelComponent, CurrencyComponent, CountryComponent, CityComponent, SmsModelComponent, ShippingCompanyComponent, NotificationComponent, InfoUsersComponent, MembershipsComponent, PricestrategyComponent, BarcodesComponent, CaseStageComponent, FunctionProsessComponent, SubmtionTextComponent, WhatsappComponent, BarndSettingComponent],
  imports: [
    CommonModule,
    UIModule,
    CommonsModule,
    NgSelectModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbAlertModule,
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule,
    ImageCropperModule,
    UiSwitchModule,
    NgxFlagIconCssModule,
    NgxMaskModule.forRoot(),
    NgxEditorModule
  ]
})
export class SettingsModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { GeneralComponent } from './general/general.component';
import { LanguagesComponent } from './languages/languages.component';
import { EmailModelComponent } from './email-model/email-model.component';
import { CurrencyComponent } from './currency/currency.component';
import { CountryComponent } from './country/country.component';
import { CityComponent } from './city/city.component';
import { SmsModelComponent } from './sms-model/sms-model.component';
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

const routes: Routes = [
  {
    path: 'Users',
    component: UsersComponent
},
{
  path: 'Memberships',
  component: MembershipsComponent
},
{
  path: 'barcodes',
  component: BarcodesComponent
},{
  path: 'caseStage',
  component: CaseStageComponent
},{
  path: 'SubmtionText',
  component: SubmtionTextComponent
},
{
  path: 'PricingStrategies',
  component: PricestrategyComponent
},
{
  path: 'BrandSetting',
  component: BarndSettingComponent
},
{
  path: 'General',
  component: GeneralComponent
}
,
{
  path: 'Languages',
  component: LanguagesComponent
}
,
{
  path: 'EmailModel',
  component: EmailModelComponent
}
,
{
  path: 'Currency',
  component: CurrencyComponent
}
,
{
  path: 'Country',
  component: CountryComponent
}
,
{
  path: 'City',
  component: CityComponent
}
,
{
  path: 'EmailModel',
  component: CityComponent
},
{
  path: 'SmsModel',
  component: SmsModelComponent
},
{
  path: 'ShippingCompany',
  component: ShippingCompanyComponent
},
{
  path: 'notification',
  component: NotificationComponent
},
{
  path: 'function',
  component: FunctionProsessComponent
},
{
  path: 'infoUser',
  component: InfoUsersComponent
},
{
  path: 'WP',
  component: WhatsappComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

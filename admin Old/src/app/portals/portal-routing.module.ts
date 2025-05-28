import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { LaboratorysComponent } from './laboratorys/laboratorys.component';
import { RequestsComponent } from './requests/requests.component';
import { DentalCenterComponent } from './dental-center/dental-center.component';
import { MediatorComponent } from './mediator/mediator.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { PatientComponent } from './patient/patient.component';
import { StatusComponent } from './status/status.component';
import { HomeComponent } from './home/home.component';
import { BalanceComponent } from './balance/balance.component';
import { ProfileDentelCenterComponent } from './profile-dentel-center/profile-dentel-center.component';
import { LabProfileComponent } from './lab-profile/lab-profile.component';
import { MedProfileComponent } from './med-profile/med-profile.component';
import { DoctorproviderComponent } from './doctorprovider/doctorprovider.component';
import { Balance1Component } from './balance1/balance1.component';
import { NotfondpageComponent } from './notfondpage/notfondpage.component';
const routes: Routes = [
  { path: 'Settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
  { path: 'Doctor', component:DoctorComponent},
  { path: 'Laboratorys', component:LaboratorysComponent},
  { path: 'Requests/:id', component:RequestsComponent},
  { path: 'Requests', redirectTo:'Requests/_'},
  { path: 'DentalCenter', component:DentalCenterComponent},
  { path: 'Mediator', component:MediatorComponent},
  { path: 'Doctor/Profile/:id', component:DoctorProfileComponent},
  { path: 'patient', component:PatientComponent},
  { path: 'status/:id', component:StatusComponent},
  { path: '', component:HomeComponent},
  { path: 'balance',component:BalanceComponent},
  { path: 'balanceAccivted',component:Balance1Component},
  { path: 'DentalCenter/Profile/:id',component:ProfileDentelCenterComponent},
  { path: 'LAB/Profile/:id', component:LabProfileComponent},
  { path: 'COO/Profile/:id', component:MedProfileComponent},
  { path: 'DP', component:DoctorproviderComponent},
  { path: 'notFondPage', component:NotfondpageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }

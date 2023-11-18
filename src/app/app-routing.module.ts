import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginasComponent } from './pages/loginas/loginas.component';
import { AdminloginComponent } from './pages/adminlogin/adminlogin.component';
import { UserloginComponent } from './pages/userlogin/userlogin.component';
import { UseregisterComponent } from './pages/useregister/useregister.component';
import { AdmindashboardComponent } from './pages/admindashboard/admindashboard.component';
import { UserdashboardComponent } from './pages/userdashboard/userdashboard.component';
import { AccommodationsComponent } from './pages/accommodations/accommodations.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { ItineraryComponent } from './pages/itinerary/itinerary.component';

const routes: Routes = [
  { path: '', component: LoginasComponent },
  {path:'adminlogin',component:AdminloginComponent},
  {path:'userlogin',component:UserloginComponent},
  {path:'useregister',component:UseregisterComponent},
  {path : 'userdashboard',component : UserdashboardComponent},
  {path:'admindashboard',component:AdmindashboardComponent},
  { path:'accomodations/:packageId', component: AccommodationsComponent },
  { path:'activities/:packageId', component: ActivitiesComponent },
  {path:'itinerary',component:ItineraryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthClientComponent} from "./auth/auth-client/auth-client.component";
import {UserProfileComponent} from "./main/user-profile/user-profile.component";
import {AuthRegistrationComponent} from "./auth/auth-registration/auth-registration.component";

const routes: Routes = [
  {path: '', component: AuthClientComponent},
  {path: 'auth', component: AuthClientComponent},
  {path: 'signup', component: AuthRegistrationComponent},
  {path: 'user-profile', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

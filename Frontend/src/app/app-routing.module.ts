import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthClientComponent} from "./auth/auth-client/auth-client.component";
import {AppComponent} from "./app.component";
import {UserProfileComponent} from "./main/user-profile/user-profile.component";

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'auth', component: AuthClientComponent},
  {path: 'user-profile', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

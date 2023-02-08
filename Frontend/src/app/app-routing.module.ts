import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthClientComponent} from "./auth/auth-client/auth-client.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
{path: 'auth', component: AuthClientComponent},
{path: '', component: AppComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

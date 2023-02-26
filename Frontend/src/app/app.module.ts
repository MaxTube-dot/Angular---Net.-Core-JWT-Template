import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthClientComponent } from './auth/auth-client/auth-client.component';
import {ReactiveFormsModule} from "@angular/forms";
import { UserProfileComponent } from './main/user-profile/user-profile.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialExampleModule} from "./material.module";
import {AuthRegistrationComponent} from "./auth/auth-registration/auth-registration.component";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {CustomDateAdapter} from "./shared/adapter/CustomDateAdapter";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {AuthGuard} from "./guards/auth-guard.service";
import { HomeComponent } from './home/home/home.component';
import {HomeHeaderComponent} from "./home/home/home-header/home-header.component";

@NgModule({
  declarations: [
    AppComponent,
    AuthClientComponent,
    UserProfileComponent,
    AuthRegistrationComponent,
    HomeComponent,
    HomeHeaderComponent,
  ],
  imports: [
    BrowserModule,
    MaterialExampleModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,


  ],
  providers: [
    {provide: DateAdapter, useClass: CustomDateAdapter},
    { provide: MAT_DATE_LOCALE, useValue: 'ru'},
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    AuthGuard,],
  bootstrap: [AppComponent]
})
export class AppModule { }

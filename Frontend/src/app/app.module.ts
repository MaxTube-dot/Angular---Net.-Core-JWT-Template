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

@NgModule({
  declarations: [
    AppComponent,
    AuthClientComponent,
    UserProfileComponent,
    AuthRegistrationComponent
  ],
  imports: [
    BrowserModule,
    MaterialExampleModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,


  ],
  providers: [{provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'ru' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreateListComponent } from './list/createlist.component';
import { ListDetailsComponent } from "./list/listdetails.component";

import { appRoutes } from './_constants/routes.constants';

import { AuthenticationService, ItemService, ListService } from "./_services/index";

import { AuthGuard } from './_guards/index';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CreateListComponent,
    ListDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthenticationService, ItemService, ListService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

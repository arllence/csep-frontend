import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPermissionsModule } from 'ngx-permissions';


import { LandingRoutingModule } from './landing-routing.module';
import { HomePageComponent } from '../home-page/home-page.component';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    NgxPermissionsModule.forChild(),
  ]
})
export class LandingModule { }

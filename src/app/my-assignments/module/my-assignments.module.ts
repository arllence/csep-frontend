import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MyAssignmentsComponent } from '../container/my-assignments/my-assignments.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DynamicFormModule } from '../../dynamic-form/dynamic-form/dynamic-form.module';
import { DynamicNestedFormModule } from '../../dynamic-nested-form/dynamic-nested-form.module';
import { SharedModule } from '../../common-module/common-module/common-module.module';
import { MyAssignmentModuleRoutingModule } from './my-assignments-routing.module';
// import { InnovationProfileComponent } from '../container/innovation-profile/innovation-profile.component';

import { TagInputModule } from 'ngx-chips';
import { QuillModule } from 'ngx-quill'
import { ChartsModule } from 'ng2-charts';
import { NgxPrintModule } from 'ngx-print';
import { AccordionModule } from 'ngx-bootstrap/accordion'

@NgModule({
  declarations: [
    MyAssignmentsComponent,
  ],

  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    DynamicFormModule,
    DynamicNestedFormModule,
    ReactiveFormsModule,
    MyAssignmentModuleRoutingModule,

    TagInputModule,
    QuillModule,
    ChartsModule,
    NgxPrintModule,
    AccordionModule
  ]
})
export class MyAssignmentModule { }


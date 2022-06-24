import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CandidatesListComponent } from '../container/candidates-list/candidates-list.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DynamicFormModule } from '../../dynamic-form/dynamic-form/dynamic-form.module';
import { DynamicNestedFormModule } from '../../dynamic-nested-form/dynamic-nested-form.module';
import { SharedModule } from '../../common-module/common-module/common-module.module';
import { CandidatesListRoutingModule } from './candidates-list-routing.module';

import { TagInputModule } from 'ngx-chips';
import { QuillModule } from 'ngx-quill'
import { ChartsModule } from 'ng2-charts';
import { NgxPrintModule } from 'ngx-print';
import { AccordionModule } from 'ngx-bootstrap/accordion'

@NgModule({
  declarations: [
    CandidatesListComponent, 
  ],

  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    BsDatepickerModule,
    DynamicFormModule,
    DynamicNestedFormModule,
    ReactiveFormsModule,
    CandidatesListRoutingModule,

    TagInputModule,
    QuillModule,
    ChartsModule,
    NgxPrintModule,
    AccordionModule
  ]
})
export class CandidatesListModule { }


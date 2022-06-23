import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DynamicFormModule } from '../../dynamic-form/dynamic-form/dynamic-form.module';
import { DynamicNestedFormModule } from '../../dynamic-nested-form/dynamic-nested-form.module';
import { SharedModule } from '../../common-module/common-module/common-module.module';
import { PositionRoutingModule } from './positions-routing.module';

import { TagInputModule } from 'ngx-chips';
import { QuillModule } from 'ngx-quill'
import { ChartsModule } from 'ng2-charts';
import { NgxPrintModule } from 'ngx-print';
import { AccordionModule } from 'ngx-bootstrap/accordion'


import { PositionListComponent } from '../container/posions-list/position-list.component';
import { PositionViewComponent } from '../container/positions-view/position-view.component';

@NgModule({
  declarations: [
    PositionListComponent, 
    PositionViewComponent, 
  ],

  imports: [
    SharedModule,
    CommonModule,
    BsDatepickerModule,
    DynamicFormModule,
    DynamicNestedFormModule,
    PositionRoutingModule,

    TagInputModule,
    QuillModule,
    ChartsModule,
    NgxPrintModule,
    AccordionModule
  ]
})
export class PositionsModule { }


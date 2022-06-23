import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PositionListComponent } from '../container/posions-list/position-list.component';

import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { PositionViewComponent } from '../container/positions-view/position-view.component';

const routes: Routes = [

 
  {
    path: 'positions',
    component: PositionListComponent,
    data: {
      title: 'Candidate Positions',
      permissions: {
        only: ['CANDIDATE'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'applications',
    component: PositionViewComponent,
    data: {
      title: 'Candidate Applications',
      permissions: {
        only: ['USER_MANAGER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PositionRoutingModule { }

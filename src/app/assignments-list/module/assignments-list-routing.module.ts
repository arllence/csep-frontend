import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignmentListComponent } from '../container/assignments-list/assignment-list.component';

import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
// import { InnovationProfileComponent } from '../container/innovation-profile/innovation-profile.component';
import { VerifyEmailGuard } from '../../authentication/guards/verify-email.guard';
const routes: Routes = [

  {
    path: 'list',
    component: AssignmentListComponent,
    data: {
      title: 'List Assignments',
      permissions: {
        only: ['EVALUATOR', 'LEAD_INNOVATION_MANAGER', 'LEAD_INTERNAL_EVALUATOR'],
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
export class AssignmentListRoutingModule { }

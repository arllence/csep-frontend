import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAssignmentsComponent } from '../container/my-assignments/my-assignments.component';

import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
// import { InnovationProfileComponent } from '../container/innovation-profile/innovation-profile.component';
import { VerifyEmailGuard } from '../../authentication/guards/verify-email.guard';
const routes: Routes = [

 
  
  {
    path: 'list',
    component: MyAssignmentsComponent,
    data: {
      title: 'My Assignments',
      permissions: {
        only: ['INNOVATOR'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAssignmentModuleRoutingModule { }

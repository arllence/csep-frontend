import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnalyticsComponent } from '../container/analytics/analytics.component';

import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
import { VerifyEmailGuard } from '../../authentication/guards/verify-email.guard';
const routes: Routes = [

  {
    path: '',
    component: AnalyticsComponent,
    data: {
      title: 'Analytics',
      permissions: {
        only: ['LEAD_INNOVATION_MANAGER','USER_MANAGER'],
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
export class AnalyticsRoutingModule { }

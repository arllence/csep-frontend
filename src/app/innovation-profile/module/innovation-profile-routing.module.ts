import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
import { InnovationProfileComponent } from '../container/innovation-profile/innovation-profile.component';
import { VerifyEmailGuard } from '../../authentication/guards/verify-email.guard';
const routes: Routes = [

  {
    path: 'add-innovation',
    component: InnovationProfileComponent,
    data: {
      title: 'Add Innovation',
      permissions: {
        only: ['INNOVATOR'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard,VerifyEmailGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InnovationProfileRoutingModule { }

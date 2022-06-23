import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralReportsComponent } from '../general/container/general/general-report.component';

import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
// import { InnovationProfileComponent } from '../container/innovation-profile/innovation-profile.component';
import { VerifyEmailGuard } from '../../authentication/guards/verify-email.guard';
import { GeneralSubmissionComponent } from '../general/container/reports/submission-report.component';

const routes: Routes = [

 
  {
    path: 'analytics',
    component: GeneralReportsComponent,
    data: {
      title: 'General Analytics',
      permissions: {
        only: ['INTERNAL_EVALUATOR','LEAD_INNOVATION_MANAGER','SUBJECT_MATTER_EVALUATOR', 'EXTERNAL_EVALUATOR','CHIEF_EVALUATOR'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'submissions/:slug',
    component: GeneralReportsComponent,
    data: {
      title: 'General Analytics',
      permissions: {
        only: ['INTERNAL_EVALUATOR','LEAD_INNOVATION_MANAGER','SUBJECT_MATTER_EVALUATOR', 'EXTERNAL_EVALUATOR','CHIEF_EVALUATOR'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'view/:id',
    component: GeneralSubmissionComponent,
    data: {
      title: 'Submission Report',
      permissions: {
        only: ['LEAD_INNOVATION_MANAGER'],
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
export class GeneralRoutingModule { }

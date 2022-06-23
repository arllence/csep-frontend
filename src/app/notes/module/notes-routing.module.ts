import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvaluationNotesComponent } from '../container/notes/notes.component';

import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
// import { InnovationProfileComponent } from '../container/innovation-profile/innovation-profile.component';
import { VerifyEmailGuard } from '../../authentication/guards/verify-email.guard';
const routes: Routes = [

 
  {
    path: 'list',
    component: EvaluationNotesComponent,
    data: {
      title: 'Notes',
      permissions: {
        only: ['JUNIOR_OFFICER','INTERNAL_EVALUATOR','INNOVATION_MANAGER','LEAD_INNOVATION_MANAGER','SUBJECT_MATTER_EVALUATOR', 'EXTERNAL_EVALUATOR'],
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
export class NotesRoutingModule { }

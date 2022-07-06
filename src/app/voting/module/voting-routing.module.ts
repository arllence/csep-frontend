import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
import { ResultsComponent } from '../container/results/results.component';
import { VoteComponent } from '../container/vote/vote.component';
// import { InnovationProfileComponent } from '../container/innovation-profile/innovation-profile.component';
const routes: Routes = [

 
  
  {
    path: 'vote',
    component: VoteComponent,
    data: {
      title: 'Voting',
      permissions: {
        only: ['VOTER','CANDIDATE'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'results',
    component: ResultsComponent,
    data: {
      title: 'Results',
      permissions: {
        only: ['VOTER','CANDIDATE','USER_MANAGER'],
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
export class VotingModuleRoutingModule { }

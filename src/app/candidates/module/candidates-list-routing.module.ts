import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandidatesListComponent } from '../container/candidates-list/candidates-list.component';

import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
const routes: Routes = [

 
  {
    path: 'list',
    component: CandidatesListComponent,
    data: {
      title: 'Candidates',
      permissions: {
        // only: [''],
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
export class CandidatesListRoutingModule { }

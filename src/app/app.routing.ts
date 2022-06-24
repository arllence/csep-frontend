import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { P404Component } from './views/error/404.component';
import { P403Component } from './views/error/403.component';
import { CommonProfileComponent } from './containers/common-profile/common-profile.component';
import { AuthenticationGuard } from './authentication/guards/authguard.guard';
import { ChangePasswordGuard } from './authentication/guards/change-password.guard';
import { VerifyEmailGuard } from './authentication/guards/verify-email.guard';
import { CommonEmailComponent } from './containers/common-email/common-email.component';
import { CommonProfileViewComponent } from './containers/common-profile-view/common-profile-view.component';
import { GenericProfileViewComponent } from './containers/generic-profile-view/generic-profile-view.component';

export const routes: Routes = [
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P403Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication/authentication.module').then(m => m.AuthenticationModule
    )
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'profile',
        component: CommonProfileComponent,
        data: {
          title: 'Update Profile'
        },
        canActivate: [AuthenticationGuard,VerifyEmailGuard]
      },
      {
        path: 'user-profile',
        component: CommonProfileViewComponent,
        data: {
          title: 'Profile Details'
        },
        canActivate: [AuthenticationGuard,VerifyEmailGuard]
      },
      {
        path: 'candidate-profile/:id',
        component: GenericProfileViewComponent,
        data: {
          title: 'Candidate Profile Details'
        },
        canActivate: [AuthenticationGuard,VerifyEmailGuard]
      },
      {
        path: 'email',
        component: CommonEmailComponent,
        data: {
          title: 'Verify Email'
        }
      },
     
      {
        path: '',
        redirectTo: '/landing/home', pathMatch: 'full'
      },
      {
        path: 'candidate',
        loadChildren:
        () => import('./positions/module/positions.module').then(m => m.PositionsModule),
        canActivate: [AuthenticationGuard,VerifyEmailGuard],
        // canActivate: [AuthenticationGuard,VerifyEmailGuard, ChangePasswordGuard],
      },
      {
        path: 'candidates',
        loadChildren:
        () => import('./candidates/module/candidates-list.module').then(m => m.CandidatesListModule),
        canActivate: [AuthenticationGuard,VerifyEmailGuard],
        // canActivate: [AuthenticationGuard,VerifyEmailGuard, ChangePasswordGuard],
      },
      {
        path: 'profile',
        loadChildren:
        () => import('./innovation-profile/module/innovation-profile.module').then(m => m.InnovationProfileModule),
        canActivate: [AuthenticationGuard,VerifyEmailGuard],
        // canActivate: [AuthenticationGuard,VerifyEmailGuard, ChangePasswordGuard],
      },
      {
        path: 'dashboard',
        loadChildren:
        () => import('./innovation-dashboard/module/innovation-dashboard.module').then(m => m.InnovationDashboardModule),
        canActivate: [AuthenticationGuard,VerifyEmailGuard],
        // canActivate: [AuthenticationGuard,VerifyEmailGuard, ChangePasswordGuard],
      },
      {
        path: 'assignments',
        loadChildren:
        () => import('./assignments-list/module/assignments-list.module').then(m => m.AssignmentListModule),
        canActivate: [AuthenticationGuard,VerifyEmailGuard],
        // canActivate: [AuthenticationGuard,VerifyEmailGuard, ChangePasswordGuard],
      },
      {
        path: 'my-assignments',
        loadChildren:
        () => import('./my-assignments/module/my-assignments.module').then(m => m.MyAssignmentModule),
        canActivate: [AuthenticationGuard,VerifyEmailGuard],
        // canActivate: [AuthenticationGuard,VerifyEmailGuard, ChangePasswordGuard],
      },
      
      {
        path: 'analytics',
        loadChildren:
        () => import('./analytics/module/analytics.module').then(m => m.AnalyticsModule),
        canActivate: [AuthenticationGuard,VerifyEmailGuard],
        // canActivate: [AuthenticationGuard,VerifyEmailGuard, ChangePasswordGuard],
      },
      {
        path: 'reports',
        loadChildren:
        () => import('./reports/module/general.module').then(m => m.GeneralModule),
        canActivate: [AuthenticationGuard,VerifyEmailGuard],
        // canActivate: [AuthenticationGuard,VerifyEmailGuard, ChangePasswordGuard],
      },
      {
        path: 'landing',
        loadChildren:
        () => import('./landing/landing/landing.module').then(m => m.LandingModule),
        canActivate: [AuthenticationGuard,VerifyEmailGuard],
        // canActivate: [AuthenticationGuard,VerifyEmailGuard, ChangePasswordGuard],
      },
      {
        path: 'administration',
        loadChildren:
        () => import('./administration/administration/administration/administration.module').then(m => m.AdministrationModule),
        canActivate: [AuthenticationGuard, ChangePasswordGuard],
      },

        
    ]
  },
  





  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
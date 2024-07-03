import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/layouts/home.component';
import { Error404Component } from './home/views/error404/error404.component';
import { SignInComponent } from './home/views/sign-in/sign-in.component';

import { ForgotPasswordComponent } from './home/views/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './home/views/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SignInComponent },

  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'resetpassword/:passwordResetToken',
    component: ResetPasswordComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./modules/client/client.module').then((m) => m.ClientModule),
  },
  {
    path: 'agent',
    loadChildren: () =>
      import('./modules/agent/agent.module').then((m) => m.AgentModule),
  },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

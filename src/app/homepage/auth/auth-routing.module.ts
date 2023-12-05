import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { LayoutAuthComponent } from './layout-auth/layout-auth.component';

import { AuthGuard } from 'src/app/guard/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: LayoutAuthComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'login', component: SignInComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

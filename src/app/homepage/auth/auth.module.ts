import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutAuthComponent } from './layout-auth/layout-auth.component';
@NgModule({
  declarations: [SignInComponent, SignUpComponent, LayoutAuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    DividerModule,
    GoogleSigninButtonModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class AuthModule {}

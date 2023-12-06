import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ToastModule } from 'primeng/toast';
import { ToastService } from './service/ToastService.service';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DividerModule } from 'primeng/divider';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AvatarGroupModule,
    ButtonModule,
    FormsModule,
    CarouselModule,
    HttpClientModule,
    FontAwesomeModule,
    SocialLoginModule,
    ToastModule,
    BrowserAnimationsModule,
    DividerModule,
    ScrollTopModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '21862306402-emfpfrs5dbgqpg646d76120tc4lcojg1.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    ToastService,
    MessageService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

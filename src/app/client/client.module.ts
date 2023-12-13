import { NgModule } from '@angular/core';
import { ClientRoutingModule } from './client-routing.module';
import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { SharedModule } from '../shared';
import {
  CartComponent,
  CourseComponent,
  CourseDetailComponent,
  CourseLeanringSidebarComponent,
  CourseLearningContentComponent,
  CourseLearningLessonsComponent,
  LandingComponent,
  ProfileComponent,
  SignInComponent,
} from './pages';
import { SettingComponent } from './pages/setting/setting.component';

@NgModule({
  imports: [ClientRoutingModule, SharedModule],
  declarations: [
    LandingComponent,
    CourseComponent,
    CourseDetailComponent,
    CourseLearningLessonsComponent,
    CourseLeanringSidebarComponent,
    CourseLearningContentComponent,
    ProfileComponent,
    CartComponent,
    SignInComponent,
    SettingComponent,
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
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
})
export class ClientModule {}

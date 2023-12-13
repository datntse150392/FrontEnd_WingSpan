import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanLearnCourseGuard } from '../guards/can-learn-course.guard';
import { AuthorGuard } from '../guards/author.guard';
import {
  CartComponent,
  CourseComponent,
  CourseDetailComponent,
  CourseLearningContentComponent,
  LandingComponent,
  ProfileComponent,
  SettingComponent,
  SignInComponent,
} from './pages';
const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      { path: '', component: CourseComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        // canActivate: [AuthorGuard],
      },
      {
        path: 'settings',
        children: [{ path: 'personal', component: SettingComponent }],
        // canActivate: [AuthorGuard],
      },
      {
        path: 'detail/:id',
        component: CourseDetailComponent,
      },
      {
        path: 'myCart',
        component: CartComponent,
      },
      {
        path: 'learning/lessons-for-newbie/:courseId/:videoId',
        component: CourseLearningContentComponent,
        // canActivateChild: [CanLearnCourseGuard],
      },
    ],
  },
  {
    path: 'auth/signIn',
    component: SignInComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}

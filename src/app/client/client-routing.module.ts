import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  CartComponent,
  CourseComponent,
  CourseDetailComponent,
  CourseLearningContentComponent,
  LandingComponent,
  ProfileComponent,
  SettingComponent,
  SignInComponent,
  TransactionComponent,
  BlogComponent,
  NewBlogComponent,
  DetailBlogComponent,
} from './pages';
import { SignInGuard } from '../guards/signIn.guard';
import { AuthGuard } from '../guards/auth.guard';
import { CanLearnCourseGuard } from '../guards/can-learn-course.guard';
const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      { path: '', component: CourseComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'settings',
        children: [{ path: 'personal', component: SettingComponent }],
        canActivate: [AuthGuard],
      },
      {
        path: 'detail/:id',
        component: CourseDetailComponent,
      },
      {
        path: 'myCart',
        component: CartComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'learning/lessons-for-newbie/:courseId/:videoId',
        component: CourseLearningContentComponent,
        canActivate: [CanLearnCourseGuard],
      },
      {
        path: 'myTransaction',
        component: TransactionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'blog',
        component: BlogComponent,
      },
      {
        path: 'new-blog',
        component: NewBlogComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'blog/:id',
        component: DetailBlogComponent,
      },
    ],
  },
  {
    path: 'auth/signIn',
    component: SignInComponent,
    canActivate: [SignInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}

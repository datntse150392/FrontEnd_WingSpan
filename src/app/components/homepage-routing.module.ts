import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './wingspan/content/content.component';

import { CanLearnCourseGuard } from '../guards/can-learn-course.guard';
import { ProfileComponent } from './wingspan/profile/profile.component';
import { CourseComponent } from './wingspan/course/course.component';
import { CourseDetailComponent } from './wingspan/course/course-detail/course-detail.component';
import { CourseLearningContentComponent } from './wingspan/course/course-detail/course-leanring/course-leanring-content/content.component';
import { CourseLearningLessonsComponent } from './wingspan/course/course-detail/course-leanring/course-learning-lessons/lessons.component';
import { AuthorGuard } from '../guards/author.guard';
import { CartComponent } from './wingspan/cart/cart.component';
const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      { path: '', component: CourseComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthorGuard],
      },
      {
        path: 'detail/:id',
        component: CourseDetailComponent,
      },
    ],
  },
  {
    path: 'myCart',
    component: CartComponent,
  },
  {
    path: 'learning',
    component: CourseLearningContentComponent,
    // canActivateChild: [CanLearnCourseGuard],
    children: [
      {
        path: 'lessons-for-newbie/:courseId/:videoId',
        component: CourseLearningLessonsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepageRoutingModule {}

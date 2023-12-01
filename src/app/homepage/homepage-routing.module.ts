import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { CourseComponent } from './course/course.component';
import { CourseDetailComponent } from './course/course-detail/course-detail.component';
import { CourseLearningContentComponent } from './course/course-detail/course-leanring/course-leanring-content/content.component';
import { CourseLearningLessonsComponent } from './course/course-detail/course-leanring/course-learning-lessons/lessons.component';
import { CanLearnCourseGuard } from '../guard/can-learn-course.guard';
import { ProfileComponent } from './profile/profile.component';
const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      { path: '', component: CourseComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'detail/:id', component: CourseDetailComponent },
    ],
  },
  {
    path: 'learning',
    component: CourseLearningContentComponent,
    canActivateChild: [CanLearnCourseGuard],
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

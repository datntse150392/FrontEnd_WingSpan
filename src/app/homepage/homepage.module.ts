import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ContentComponent } from './content/content.component';
import { CommonModule } from '@angular/common';
import { HomepageRoutingModule } from './homepage-routing.module';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { CourseComponent } from './course/course.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TreeModule } from 'primeng/tree';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CourseDetailComponent } from './course/course-detail/course-detail.component';
import { CourseLearningContentComponent } from './course/course-detail/course-leanring/course-leanring-content/content.component';
import { CourseLeanringSidebarComponent } from './course/course-detail/course-leanring/course-learning-sidebar/sidebar.component';
import { CourseLearningLessonsComponent } from './course/course-detail/course-leanring/course-learning-lessons/lessons.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    HomepageRoutingModule,
    AvatarModule,
    AvatarGroupModule,
    ButtonModule,
    FormsModule,
    CarouselModule,
    CardModule,
    TagModule,
    TreeModule,
    InputTextModule,
    ToastModule,
    MenubarModule,
    BadgeModule,
    MenuModule,
    ConfirmDialogModule,
  ],
  declarations: [
    ContentComponent,
    CourseComponent,
    SidebarComponent,
    HeaderComponent,
    CourseDetailComponent,
    CourseLearningLessonsComponent,
    CourseLeanringSidebarComponent,
    CourseLearningContentComponent,
    FooterComponent,
  ],
  providers: [],
})
export class HomePageModule {}

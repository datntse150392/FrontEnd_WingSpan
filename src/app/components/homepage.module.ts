import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ContentComponent } from './wingspan/content/content.component';
import { CommonModule } from '@angular/common';
import { HomepageRoutingModule } from './homepage-routing.module';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
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
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SidebarModule } from 'primeng/sidebar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './wingspan/profile/profile.component';
import { CourseComponent } from './wingspan/course/course.component';
import { CourseDetailComponent } from './wingspan/course/course-detail/course-detail.component';
import { CourseLearningContentComponent } from './wingspan/course/course-detail/course-leanring/course-leanring-content/content.component';
import { CourseLeanringSidebarComponent } from './wingspan/course/course-detail/course-leanring/course-learning-sidebar/sidebar.component';
import { CourseLearningLessonsComponent } from './wingspan/course/course-detail/course-leanring/course-learning-lessons/lessons.component';
import { AuthorGuard } from '../guards/author.guard';
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
    DividerModule,
    ImageModule,
    FileUploadModule,
    ToggleButtonModule,
    SidebarModule,
    ScrollTopModule,
    OverlayPanelModule,
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
    ProfileComponent,
  ],
  providers: [],
})
export class HomePageModule {}

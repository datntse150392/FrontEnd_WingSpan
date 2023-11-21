import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ContentComponent } from './content/content.component';
import { CommonModule } from '@angular/common';
import { HomepageRoutingModule } from './homepage-routing.module';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { HomepageService } from './homepage.service';
import { CourseComponent } from './course/course.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TreeModule } from 'primeng/tree';
import { CourseDetailComponent } from './course/course-detail/course-detail.component';
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
  ],
  declarations: [
    ContentComponent,
    CourseComponent,
    SidebarComponent,
    HeaderComponent,
    CourseDetailComponent,
  ],
  providers: [HomepageService],
})
export class HomePageModule {}

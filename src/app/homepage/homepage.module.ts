import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './header/content/content.component';
import { CommonModule } from '@angular/common';
import { HomepageRoutingModule } from './homepage-routing.module';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { HomepageService } from './homepage.service';
@NgModule({
  imports: [
    CommonModule,
    HomepageRoutingModule,
    AvatarModule,
    AvatarGroupModule,
    ButtonModule,
    FormsModule,
    CarouselModule,
  ],
  declarations: [ContentComponent, HeaderComponent],
  providers: [HomepageService],
})
export class HomePageModule {}

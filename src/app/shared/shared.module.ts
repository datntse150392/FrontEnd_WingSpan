import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { DividerModule } from 'primeng/divider';
import { BlockUIModule } from 'primeng/blockui';
import { ImageModule } from 'primeng/image';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { NgxPayPalModule } from 'ngx-paypal';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { TreeModule } from 'primeng/tree';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FooterComponent, HeaderComponent, SidebarComponent } from './layout';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AvatarModule,
    AvatarGroupModule,
    ButtonModule,
    CarouselModule,
    CardModule,
    TagModule,
    TreeModule,
    DropdownModule,
    InputTextModule,
    ToastModule,
    MenubarModule,
    BadgeModule,
    MenuModule,
    DividerModule,
    BlockUIModule,
    ImageModule,
    ScrollTopModule,
    ConfirmDialogModule,
    FileUploadModule,
    ToggleButtonModule,
    ProgressSpinnerModule,
    SidebarModule,
    OverlayPanelModule,
    NgxPayPalModule,
    GoogleSigninButtonModule,
    ConfirmPopupModule,
    TooltipModule,
    DialogModule,
  ],
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AvatarModule,
    AvatarGroupModule,
    ButtonModule,
    CarouselModule,
    CardModule,
    TagModule,
    TreeModule,
    DropdownModule,
    InputTextModule,
    ToastModule,
    MenubarModule,
    BadgeModule,
    MenuModule,
    DividerModule,
    BlockUIModule,
    ImageModule,
    ScrollTopModule,
    ConfirmDialogModule,
    FileUploadModule,
    ToggleButtonModule,
    ProgressSpinnerModule,
    SidebarModule,
    OverlayPanelModule,
    NgxPayPalModule,
    GoogleSigninButtonModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ConfirmPopupModule,
    TooltipModule,
    DialogModule,
  ],
})
export class SharedModule {}

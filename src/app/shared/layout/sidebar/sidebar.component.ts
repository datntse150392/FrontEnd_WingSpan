// Trong component của sidebar
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  isHomePage(): boolean {
    return this.router.url === '/'; // hoặc đường dẫn tương ứng với trang chủ
  }
}

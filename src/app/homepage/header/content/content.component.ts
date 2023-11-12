import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent {
  // Fake data
  products = [
    {
      title: 'Học HTML CSS cho người mới',
      subTitle:
        'Thực hành dự án với Figma, hàng trăm bài tập và thử thách, hướng dẫn 100% bởi Sơn Đặng, tặng kèm Flashcards, v.v.',
      buttonDes: 'HỌC THỬ MIỄN PHÍ',
      rightImg:
        'https://files.fullstack.edu.vn/f8-prod/banners/20/6308a6bf603a4.png',
    },
  ];
}

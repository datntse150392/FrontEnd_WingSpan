import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  // Fake data
  responsiveOptions: any[] | undefined;
  products!: any[];
  ngOnInit() {
    this.products = [
      {
        title: 'Học FER201m cho người mới',
        subTitle:
          'Kết hợp giữa lý thuyết và thực hành là cách tốt để nắm vững ReactJS và trở thành một lập trình viên ReactJS có kỹ năng. Ở khóa này sẽ hướng dẫn bạn cách học cũng như cách làm bài thi và sẽ thực hành trên các bài thi của các kỳ trước.',
        buttonDes: 'HỌC THỬ MIỄN PHÍ',
        rightImg:
          'https://firebasestorage.googleapis.com/v0/b/ongbutdicode.appspot.com/o/Billboard%2Fimage_transparent_background.png?alt=media&token=21d703a2-c8ff-409e-9703-91516b15dff4',
        bgColor:
          'linear-gradient(to right, rgb(118, 18, 255),rgb(5, 178, 255))',
      },
      {
        title: 'Học HTML CSS cho người mới',
        subTitle:
          'Thực hành dự án với Figma, hàng trăm bài tập và thử thách, hướng dẫn 100% bởi Sơn Đặng, tặng kèm Flashcards, v.v.',
        buttonDes: 'HỌC THỬ MIỄN PHÍ',
        rightImg:
          'https://files.fullstack.edu.vn/f8-prod/banners/20/6308a6bf603a4.png',
      },
      {
        title: 'Học HTML CSS cho người mới',
        subTitle:
          'Thực hành dự án với Figma, hàng trăm bài tập và thử thách, hướng dẫn 100% bởi Sơn Đặng, tặng kèm Flashcards, v.v.',
        buttonDes: 'HỌC THỬ MIỄN PHÍ',
        rightImg:
          'https://files.fullstack.edu.vn/f8-prod/banners/20/6308a6bf603a4.png',
      },
    ];
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}

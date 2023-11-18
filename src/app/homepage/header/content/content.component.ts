import { Component, OnInit } from '@angular/core';
import { BillBoard } from 'src/app/models/BillboardModel';
import { HomepageService } from '../../homepage.service';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  // Fake data
  responsiveOptions: any[] | undefined;
  listBillBoard: BillBoard[] = [];
  constructor(private homepageService: HomepageService) {}

  ngOnInit() {
    this.getAllBillBoard();
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
  getAllBillBoard() {
    this.homepageService.getAllBillBoards().subscribe((res: any) => {
      this.listBillBoard = res.data;
      console.log(this.listBillBoard);
    });
  }
}

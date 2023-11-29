import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/CourseModel';
import { BillBoard } from 'src/app/models/BillboardModel';
import { APIService } from 'src/app/service/APIservice.service';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  listCourses: Course[] = []; // Danh sách gốc
  filteredCoursesFree: Course[] = []; // Danh sách đã được lọc và sắp xếp FREE
  filteredCoursesPE: Course[] = []; // Danh sách đã được lọc và sắp xếp PRO
  responsiveOptions: any[] | undefined;
  listBillBoard: BillBoard[] = [];
  hover: boolean = false;
  constructor(private APIservice: APIService) {}

  ngOnInit(): void {
    this.filterAndSortCoursesFree();
    this.filterAndSortCoursesPE();
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

  // Hàm để lọc và sắp xếp lại danh sách khóa học free
  filterAndSortCoursesFree() {
    this.APIservice.getAllCourses().subscribe((res: any) => {
      this.listCourses = res.data;
      this.filteredCoursesFree = this.listCourses
        .filter((course) => course.type === 'free')
        .sort((a, b) => a.enrollmentCount - b.enrollmentCount);
    });
  }

  // Hàm để lọc và sắp xếp lại danh sách khóa học PE Cấp tốc
  filterAndSortCoursesPE() {
    this.APIservice.getAllCourses().subscribe((res: any) => {
      this.listCourses = res.data;
      this.filteredCoursesPE = this.listCourses
        .filter((course) => course.type === 'PE')
        .sort((a, b) => a.enrollmentCount - b.enrollmentCount);
    });
  }

  getAllBillBoard() {
    this.APIservice.getAllBillBoards().subscribe((res: any) => {
      this.listBillBoard = res.data;
    });
  }
}

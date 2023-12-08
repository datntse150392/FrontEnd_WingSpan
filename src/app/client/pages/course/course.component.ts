import { Component, OnInit } from '@angular/core';
import { BillBoard, Course } from 'src/app/core/models';
import { APIService } from 'src/app/core/services';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  hover: boolean = false;

  listCourses: Course[] = []; // Danh sách gốc
  listBillBoard: BillBoard[] = [];
  filteredCoursesFree: Course[] = []; // Danh sách đã được lọc và sắp xếp FREE
  filteredCoursesPE: Course[] = []; // Danh sách đã được lọc và sắp xếp PRO
  responsiveOptions: any[] | undefined;

  constructor(private APIservice: APIService) {}

  ngOnInit(): void {
    // Scroll in the head page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.filterAndSortCoursesPEandFree();
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
    this.APIservice.getAllBillBoards().subscribe((res: any) => {
      this.listBillBoard = res.data;
    });
  }

  // Hàm để lọc và sắp xếp lại danh sách khóa học PE Cấp tốc và danh sách khóa học free
  filterAndSortCoursesPEandFree() {
    this.APIservice.getAllCourses().subscribe((res: any) => {
      this.listCourses = res.data;
      this.filteredCoursesPE = this.listCourses
        .filter((course) => course.type === 'PE')
        .sort((a, b) => a.enrollmentCount - b.enrollmentCount);
      this.filteredCoursesFree = this.listCourses
        .filter((course) => course.type === 'free')
        .sort((a, b) => a.enrollmentCount - b.enrollmentCount);
    });
  }
}

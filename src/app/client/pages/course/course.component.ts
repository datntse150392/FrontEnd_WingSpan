import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { BillBoard, Course, NewFeed, Video } from 'src/app/core/models';
import {
  APIService,
  CourseAPIService,
  ShareService,
} from 'src/app/core/services';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit, OnDestroy, AfterViewInit {
  filteredCoursesFree: Course[] = []; // Danh sách đã được lọc và sắp xếp FREE
  filteredCoursesPE: Course[] = []; // Danh sách đã được lọc và sắp xếp PRO
  hover: boolean = false;
  listBillBoard: BillBoard[] = [];
  listCourses: Course[] = []; // Danh sách gốc
  responsiveOptions: any[] | undefined;
  skeleton: boolean = false;
  newFeeds: NewFeed[] | any = {};
  visibleNewFeed: boolean = false;
  videos: Video[] | undefined;

  private destroy$ = new Subject<void>();

  constructor(
    private APIservice: APIService,
    private shareService: ShareService,
    private courseService: CourseAPIService
  ) {}

  ngOnInit(): void {
    this.shareService.showLoading();
    // Scroll in the head page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    /**
     * Call API Get New Feeds
     */
    const getNewFeed = this.shareService
      .getNewFeeds()
      .pipe(takeUntil(this.destroy$));
    getNewFeed.subscribe({
      next: (res: any) => {
        if (res) {
          this.newFeeds = res.data.newFeeds;
        }
      },
    });

    const filterCouse$ = this.APIservice.getAllCourses().pipe(
      takeUntil(this.destroy$)
    );

    const getAllBillBoard$ = this.APIservice.getAllBillBoards().pipe(
      takeUntil(this.destroy$)
    );

    const getVideo$ = this.courseService
      .getVideos()
      .pipe(takeUntil(this.destroy$));

    // Using forkJoin to get parallel api
    forkJoin([filterCouse$, getAllBillBoard$, getVideo$]).subscribe({
      next: ([filterCouseRes, getAllBillBoardRes, getVideoRes]: [
        any,
        any,
        any
      ]) => {
        this.listCourses = filterCouseRes.data;
        this.filteredCoursesPE = this.listCourses
          .filter((course) => course.type === 'PE')
          .sort((a, b) => a.enrollmentCount - b.enrollmentCount);
        this.filteredCoursesFree = this.listCourses
          .filter((course) => course.type === 'free')
          .sort((a, b) => a.enrollmentCount - b.enrollmentCount);

        this.listBillBoard = getAllBillBoardRes.data;
        this.videos = getVideoRes.data.videos;
      },
      error: (err: Error) => {
        console.log(err);
      },
      complete: () => {
        // If when loading api success full display, so should set skeleton = true
        this.skeleton = true;
      },
    });

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

  ngAfterViewInit(): void {
    this.shareService.hideLoading();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showDialogNewFeed() {
    this.visibleNewFeed = true;
  }
}

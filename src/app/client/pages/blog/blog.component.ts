import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { Blog } from 'src/app/core/models';
import { BlogService } from 'src/app/core/services';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  blogs: Blog[] | undefined;
  currentPage!: number;
  // Limit data per page
  limit: number = 5;
  totalBlogs!: number;
  items: MenuItem[] | undefined;

  private detroy$ = new Subject<void>();

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    // Scroll in the head page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Get Current Page
    this.currentPage = +this.activatedRoute.snapshot.queryParams['page'];

    // Config items menu
    this.items = [
      {
        label: '<span class="text-sm">Báo cáo bài viết</span>',
        escape: false,
        icon: 'pi pi-flag-fill',
        iconClass: 'text-sm',
      },
    ];

    // Get Blogs
    this.getBlogs(this.currentPage);
  }
  ngOnDestroy(): void {
    this.detroy$.next();
    this.detroy$.complete();
  }

  /**
   * Logic Call API: Get Blogs
   */
  getBlogs(currentPage: number) {
    this.blogService
      .getAllBlogs(currentPage)
      .pipe(takeUntil(this.detroy$))
      .subscribe({
        next: (res: any) => {
          if (res.status === 200) {
            this.blogs = res.data.blogs;
            this.totalBlogs = res.pageInfo.totalBlogs;
          }
        },
        error: (err: Error) => {
          console.log(err);
        },
        complete: () => {},
      });
  }

  /**
   * Logic: Calculate the time difference between the current time and the time the blog was created
   */
  calculateTimeDifference(createdAt: any) {
    // Convert createdAt to a JavaScript Date object
    const createdAtDate = new Date(createdAt);

    // Get the current time
    const currentTime = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentTime.getTime() - createdAtDate.getTime();

    // Convert the time difference to seconds
    var seconds = Math.floor(timeDifference / 1000);

    // Convert seconds to minutes
    var minutes = Math.floor(seconds / 60);

    // Convert minutes to hours
    var hours = Math.floor(minutes / 60);

    // Convert hours to days
    var days = Math.floor(hours / 24);

    // Convert days to months
    var months = Math.floor(days / 30); // Assuming an average month length of 30 days

    // Display the result based on the time difference
    if (months > 0) {
      return months === 1 ? '1 tháng trước' : months + 'tháng trước';
    } else if (days > 0) {
      return days === 1 ? '1 ngày trước' : days + ' ngày trước';
    } else if (hours > 0) {
      return hours === 1 ? '1 giờ trước' : hours + ' giờ trước';
    } else if (minutes > 0) {
      return minutes === 1 ? '1 phút trước' : minutes + ' phút trước';
    } else {
      return seconds === 1 ? '1 giây trước' : seconds + ' giây trước';
    }
  }

  /**
   * Logic Func: On Page Change [Pagination]
   */
  onPageChange(event: any) {
    const currentPage = event.page + 1;
    this.router.navigate(['/blog'], { queryParams: { page: currentPage } });
    this.getBlogs(currentPage);
    // Scroll in the head page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

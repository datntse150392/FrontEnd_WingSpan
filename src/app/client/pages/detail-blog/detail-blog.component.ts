import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Blog } from 'src/app/core/models';
import { BlogService } from 'src/app/core/services';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.scss'],
})
export class DetailBlogComponent implements OnInit, OnDestroy {
  blog: Blog | undefined;

  private detroy$ = new Subject<void>();

  constructor(
    private blogService: BlogService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const blogId = this.router.snapshot.params['id'];

    this.blogService
      .getDetailBlog(blogId)
      .pipe(takeUntil(this.detroy$))
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.blog = res.data.blog;
          }
        },
      });
  }
  ngOnDestroy(): void {
    this.detroy$.next();
    this.detroy$.complete();
  }

  sanitizeContent(content: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  calculateTimeDifference(createdAt: any) {
    // Check if createdAt is defined
    if (!createdAt === undefined) {
      return 'Invalid date'; // or some default value
    }

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
}

import { Component, OnDestroy, OnInit } from '@angular/core';
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

  private detroy$ = new Subject<void>();

  constructor(private blogService: BlogService) {}
  ngOnInit(): void {
    this.blogService
      .getAllBlogs()
      .pipe(takeUntil(this.detroy$))
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.blogs = res.data.blogs;
          }
        },
        error: (err: Error) => {
          console.log(err);
        },
        complete: () => {},
      });
  }
  ngOnDestroy(): void {
    this.detroy$.next();
    this.detroy$.complete();
  }

  calculateTimeDifference(createdAt: Date) {
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

import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ConfigLocal } from 'src/app/core/models';
import { BlogService, ShareService } from 'src/app/core/services';
@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.scss'],
})
export class NewBlogComponent implements OnDestroy {
  content: string | undefined;
  configLocal: ConfigLocal;
  title: string | undefined;
  preview: Boolean = false;

  private detroy$ = new Subject<void>();
  constructor(
    private sanitizer: DomSanitizer,
    private shareService: ShareService,
    private blogService: BlogService,
    private router: Router
  ) {
    this.configLocal = this.shareService.parseData();
  }

  ngOnDestroy(): void {
    this.detroy$.next();
    this.detroy$.complete();
  }

  sanitizeContent(content: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  /**
   * Logic Call API: Create Blog
   */
  createBlog = () => {
    this.blogService
      .createBlog(this.title, this.content, this.configLocal.userInfo)
      .pipe(takeUntil(this.detroy$))
      .subscribe({
        next: (res) => {
          if (res) {
            this.router.navigate(['/blog'], { queryParams: { page: 1 } });
          }
        },
        error: (err: Error) => console.log(err),
      });
  };

  /**
   * Logic Toggle Preview
   */
  togglePreview = () => {
    this.preview = !this.preview;
  };
}

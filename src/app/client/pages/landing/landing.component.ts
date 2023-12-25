import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NewFeed } from 'src/app/core/models';
import { ShareService } from 'src/app/core/services';

@Component({
  selector: 'app-content',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
  newFeeds: NewFeed[] | any = {};
  visibleNewFeed: boolean = false;

  // Private variable
  private destroy$ = new Subject<void>();

  constructor(public shareService: ShareService) {}
  ngOnInit() {
    this.visibleNewFeed = true;
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
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showDialogNewFeed() {
    this.visibleNewFeed = true;
  }
}

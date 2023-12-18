import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ConfigLocal, Transaction } from 'src/app/core/models';
import { ShareService, TransactionService } from 'src/app/core/services';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit, OnDestroy {
  // Declare variable
  public tranSaction!: Transaction[];
  private configLocal!: ConfigLocal;

  // Declare Subject
  private destroy$ = new Subject<void>();

  constructor(
    private transactionService: TransactionService,
    private shareService: ShareService
  ) {}

  ngOnInit(): void {
    this.configLocal = this.shareService.parseData();
    const userId = this.configLocal.userInfo._id;
    this.transactionService
      .getTransactionByUserId(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.tranSaction = res.data && res.data.transaction;
        },
        error: (err: Error) => {
          console.log('Error of transaction: ', err.message);
        },
        complete: () => {},
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

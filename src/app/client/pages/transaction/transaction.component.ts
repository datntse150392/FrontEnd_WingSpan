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
  detailTransaction!: Transaction;
  tranSaction!: Transaction[];
  visible: boolean = false;
  // Declare Subject
  private configLocal!: ConfigLocal;
  private destroy$ = new Subject<void>();

  constructor(
    private transactionService: TransactionService,
    private shareService: ShareService
  ) {}

  ngOnInit(): void {
    this.configLocal = this.shareService.parseData();
    const userId = this.configLocal.userInfo._id;

    // forkJoin is an operator that allows you to wait for multiple observables to complete and then emits their latest values as an array.
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

  /**
   * This function to handle show dialog of detail transaction && call API get detail transaction
   */
  showDialog(transactionId: any) {
    this.visible = true;

    // Call API
    this.transactionService
      .getDetailTransaction(transactionId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.detailTransaction = res.data && res.data.transaction;
        },
        error: (err: Error) => {
          console.error('Error of detail transaction: ', err.message);
        },
        complete: () => {},
      });
  }
}

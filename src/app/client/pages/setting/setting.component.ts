import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ConfigLocal, OperationType, User } from 'src/app/core/models';
import { CodeService, ShareService, ToastService } from 'src/app/core/services';
import { UserAPIService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnChanges {
  configLocal: ConfigLocal;
  formGroup!: FormGroup;
  toggleEditUserName: boolean = false;
  user!: User;
  newFullName!: string | undefined;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private userAPIService: UserAPIService,
    private toastService: ToastService,
    private codeService: CodeService,
    private router: Router,
    private shareService: ShareService
  ) {
    this.configLocal = { userInfo: {} };
  }

  activeForm = new FormGroup({
    code: new FormControl(''), // <== default value
  });

  ngOnInit(): void {
    this.configLocal.userInfo = this.parseData().userInfo;
    this.getUserAndSetFieldUpdate();

    this.formGroup = this.fb.group({
      checked: [false], // Initial state, you can set it to true if needed
    });
  }

  ngOnChanges(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  parseData() {
    const configLocalString = localStorage.getItem('configLocal');
    if (configLocalString) {
      const configLocal = JSON.parse(configLocalString);
      return configLocal;
    }
    return null;
  }

  toggleEditChange() {
    this.toggleEditUserName = !this.toggleEditUserName;
  }

  getUserAndSetFieldUpdate() {
    try {
      this.userAPIService
        .getUserByEmail(this.configLocal.userInfo.email)
        .subscribe((res: any) => {
          this.user = res.data.userInfo;
          // Set new full name if user click change info
          this.newFullName = this.user.fullName;
        });
    } catch (error) {}
  }

  updateInfo() {
    try {
      this.userAPIService
        .updateInfo(this.configLocal.userInfo.email, this.newFullName)
        .subscribe((res: any) => {
          if (res && res.status === 200) {
            this.toastService.setToastIsEditinfo(true);
            this.shareService.setIsUpdateConfigLocal({
              isUpdateConfigLocal: true,
              operationType: OperationType.Update,
            });
            this.user = res.data.userInfo;
            this.toggleEditUserName = !this.toggleEditUserName;
          } else {
            this.toastService.setToastIsEditinfo(false);
          }
        });
    } catch (error) {
      this.toastService.setToastIsEditinfo(false);
    }
  }

  /**
   * Logic Code: Actvie Course
   */
  activeCourse(code: any) {
    try {
      if (this.configLocal.userInfo._id) {
        this.codeService
          .activeCourse(code, this.configLocal.userInfo._id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (res: any) => {
              console.log(res);

              if (res && res.status === 200) {
                this.toastService.setMessageToastActiveCourse({
                  isActiveCourse: true,
                  operationType: 'success',
                });
                this.router.navigate(['/']);
              } else {
                if (res.message == 'Code was Actived') {
                  this.toastService.setMessageToastActiveCourse({
                    isActiveCourse: false,
                    operationType: 'Actived',
                  });
                } else if (res.message == 'Not Found Code') {
                  this.toastService.setMessageToastActiveCourse({
                    isActiveCourse: false,
                    operationType: 'Not Found',
                  });
                } else {
                  this.toastService.setMessageToastActiveCourse({
                    isActiveCourse: false,
                    operationType: 'Course was enrollmenteded',
                  });
                }
              }
            },
            error: (err: Error) => {
              console.log(err);
            },
            complete: () => {},
          });
      }
    } catch (error) {}
  }
}

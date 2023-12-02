import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfigLocal } from 'src/app/models/Config/localState';
import { User } from 'src/app/models/UserModel';
import { ToastService } from 'src/app/service/ToastService.service';
import { UserAPIService } from 'src/app/service/api/UserAPI.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  configLocal: ConfigLocal;
  formGroup!: FormGroup;
  toggleEditUserName: boolean = false;
  user!: User;

  newFullName!: string | undefined;
  constructor(
    private fb: FormBuilder,
    private userAPIService: UserAPIService,
    private toastService: ToastService
  ) {
    this.configLocal = { userInfo: {} };
  }

  ngOnInit(): void {
    this.configLocal.userInfo = this.parseData().userInfo;
    this.getUserAndSetFieldUpdate();

    this.formGroup = this.fb.group({
      checked: [false], // Initial state, you can set it to true if needed
    });
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
            this.user = res.data.userInfo;
            this.toggleEditUserName = !this.toggleEditUserName;
            window.location.reload();
          } else {
            this.toastService.setToastIsEditinfo(false);
          }
        });
    } catch (error) {
      this.toastService.setToastIsEditinfo(false);
    }
  }
}

import { Component, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfigLocal, Course, User } from 'src/app/core/models';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnChanges {
  configLocal: ConfigLocal;
  courses: Course[] | undefined;
  user: User | null = null;

  private destroy$ = new Subject<void>();

  constructor() {
    this.configLocal = { userInfo: {} };
  }

  ngOnInit(): void {
    this.configLocal.userInfo = this.parseData().userInfo;
    console.log(this.configLocal.userInfo.enrolledCourses);

    this.courses = this.configLocal.userInfo.enrolledCourses;
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
}

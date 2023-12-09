import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ConfigLocal, Course, User } from 'src/app/core/models';
import {
  APIService,
  CartService,
  CourseAPIService,
  ShareService,
  ToastService,
} from 'src/app/core/services';
import { UserAPIService } from 'src/app/core/services/user.service';
import { UpdateEventCart, OperationType } from 'src/app/core/models';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
  providers: [ConfirmationService],
})
export class CourseDetailComponent implements OnInit, OnDestroy {
  constLesson!: number;
  isExpand!: boolean;

  configLocal: ConfigLocal = {
    userInfo: {},
  };
  course!: Course;
  mainCourse!: TreeNode[];
  user!: User;

  // Check state change or update
  checkLog: boolean = false;

  DEFAULT: UpdateEventCart = {
    isUpdateConfigLocal: true,
    operationType: OperationType.Add,
  };

  private updateEventCart: UpdateEventCart = this.DEFAULT;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private APIservice: APIService,
    private courseAPIService: CourseAPIService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
    private userAPIService: UserAPIService,
    private cartService: CartService,
    private shareService: ShareService
  ) {}

  ngOnInit() {
    // Lấy giá trị của tham số 'id' từ URL
    const courseId = this.route.snapshot.params['id'];

    // Scroll in the head page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Lưu courseId vào configCourse và lưu vào localStorage
    localStorage.setItem('courseId', courseId);
    this.configLocal.userInfo = this.parseData().userInfo;
    this.getUserByUserId(this.configLocal.userInfo._id);

    const courseById$ = this.APIservice.getCoursebyId(courseId).pipe(
      takeUntil(this.destroy$)
    );
    const mainCourse$ = this.APIservice.tranferMainCourseById(courseId).pipe(
      takeUntil(this.destroy$)
    );
    forkJoin([courseById$, mainCourse$]).subscribe({
      next: ([courseByIdRes, mainCourseRes]: [any, TreeNode[]]) => {
        if (courseByIdRes && courseByIdRes.data) {
          this.course = courseByIdRes.data;
        }
        if (mainCourseRes) {
          this.mainCourse = mainCourseRes;
          this.constLesson = this.mainCourse.length;
        }
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {},
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  expandAll() {
    this.isExpand = true;
    this.mainCourse.forEach((node) => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.isExpand = false;
    this.mainCourse.forEach((node) => {
      this.expandRecursive(node, false);
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

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach((childNode) => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  isCheckContainCourse() {
    if (
      this.user &&
      this.user.enrolledCourses?.some(
        (course: Course) => this.course && this.course._id === course._id
      )
    ) {
      return true;
    }
    return false;
  }

  /*
    Logic handle when user enroll any course
  */
  confirmEnrollCourse(userId: any, courseId: any) {
    this.confirmationService.confirm({
      accept: () => {
        this.courseAPIService
          .enrollCourse(userId, courseId)
          .subscribe((res: any) => {
            try {
              if (res?.status === 200) {
                this.getUserByUserId(this.configLocal.userInfo._id);
                this.toastService.setToastIsEnrollCourse(true);
              } else if (res?.status === 400) {
                this.toastService.setToastIsEnrollCourse(false);
              }
            } catch (error) {
              this.toastService.setToastIsEnrollCourse(false);
            }
          });
      },
      reject: () => {
        this.toastService.setToastIsEnrollCourse(false);
      },
    });
  }

  /**
   * @parms userId from localStorage
   */
  getUserByUserId(userId: any) {
    this.userAPIService.getUserByUserId(userId).subscribe((res: any) => {
      this.user = res.data.user;
    });
  }

  /**
   * Logic Func: Add to cart
   */
  addToCart(userId: any, courseId: any) {
    try {
      this.cartService.addToCart(userId, courseId).subscribe((res) => {
        if (res && res.status === 200) {
          this.shareService.setIsUpdateConfigLocal(this.updateEventCart);
          this.toastService.setToastIsAddToCart(true);
        } else {
          this.toastService.setToastIsAddToCart(false);
        }
      });
    } catch (error) {}
  }
}

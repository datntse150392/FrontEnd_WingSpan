import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { HomepageService } from '../../homepage.service';
import { Course } from 'src/app/models/CourseModel';
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  course!: Course;
  mainCourse!: TreeNode[];
  isExpand!: boolean;
  constructor(
    private route: ActivatedRoute,
    private homepageService: HomepageService
  ) {}
  ngOnInit() {
    // Lấy giá trị của tham số 'id' từ URL
    const courseId = this.route.snapshot.params['id'];
    this.getCourseById(courseId);
    this.mainCourse = [
      {
        key: '0',
        label: '1. Khái niệm kỹ thuật cần biết',
        children: [
          {
            key: '0-0',
            label: '1. Mô hình Client - Server là gì?',
            icon: 'pi pi-fw pi-video',
            data: '#',
            type: 'url',
          },
          {
            key: '0-1',
            label: '2. Domain là gì? Tên miền là gì?',
            icon: 'pi pi-fw pi-video',
            data: '#',
            type: 'url',
          },
          {
            key: '0-2',
            label: '3. Lớp học Offline tại TP.HCM',
            icon: 'pi pi-fw pi-file',
            data: '#',
            type: 'url',
          },
        ],
      },
    ];
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
  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach((childNode) => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }
  // // this.homepageService.getAllCourses().subscribe((res: any) => {
  //   this.listCourses = res.data;
  //   console.log(this.listCourses);
  // });
  getCourseById(id: number) {
    this.homepageService.getCoursebyId(id).subscribe((res: any) => {
      this.course = res.data;
    });
  }
}

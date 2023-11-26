import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { Course } from 'src/app/models/CourseModel';
import { CourseServiceModule } from '../course.service';
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
    private courseService: CourseServiceModule
  ) {}
  ngOnInit() {
    // Lấy giá trị của tham số 'id' từ URL
    const courseId = this.route.snapshot.params['id'];
    // Subscribe to the Observable to get the Course data
    this.courseService.getCourseById(courseId).subscribe((res: any) => {
      this.course = res.data;
    });
    this.courseService
      .tranferMainCourseById(courseId)
      .subscribe((transformedData: TreeNode[]) => {
        this.mainCourse = transformedData;
      });
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
}

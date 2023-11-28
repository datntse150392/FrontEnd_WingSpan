import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { Course } from 'src/app/models/CourseModel';
import { ConfigLocal } from 'src/app/models/Config/localState';
import { APIService } from 'src/app/service/APIservice.service';
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  configLocal!: ConfigLocal;
  course!: Course;
  mainCourse!: TreeNode[];
  isExpand!: boolean;
  constructor(private route: ActivatedRoute, private APIservice: APIService) {}
  ngOnInit() {
    // Lấy giá trị của tham số 'id' từ URL
    const courseId = this.route.snapshot.params['id'];
    // Lưu courseId vào configCourse và lưu vào localStorage
    localStorage.setItem('courseId', courseId);
    // Subscribe to the Observable to get the Course data
    this.APIservice.getCoursebyId(courseId).subscribe((res: any) => {
      this.course = res.data;
    });
    this.APIservice.tranferMainCourseById(courseId).subscribe(
      (transformedData: TreeNode[]) => {
        this.mainCourse = transformedData;
      }
    );
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

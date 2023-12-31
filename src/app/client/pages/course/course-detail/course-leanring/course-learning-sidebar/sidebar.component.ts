import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { Course } from 'src/app/core/models';
import { APIService } from 'src/app/core/services';
@Component({
  selector: 'app-course-learning-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class CourseLeanringSidebarComponent implements OnInit {
  mainCourses!: TreeNode[];
  course!: Course;
  courseId: string | null = null;

  constructor(private route: ActivatedRoute, private APIservice: APIService) {}

  ngOnInit() {
    this.courseId = localStorage.getItem('courseId');
    this.APIservice.tranferMainCourseById(this.courseId).subscribe(
      (transformedData: TreeNode[]) => {
        this.mainCourses = transformedData;
      }
    );
    // Subscribe to the Observable to get the Course data
    this.APIservice.getCoursebyId(this.courseId).subscribe((res: any) => {
      if (res) {
        this.course = res.data;
      }
    });
  }
}

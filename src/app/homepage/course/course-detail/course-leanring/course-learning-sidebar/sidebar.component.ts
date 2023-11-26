import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { CourseServiceModule } from '../../../course.service';
@Component({
  selector: 'app-course-learning-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class CourseLeanringSidebarComponent {
  mainCourses!: TreeNode[];
  courseId!: string;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseServiceModule
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params);

      this.courseId = params['courseId'];
    });
    this.courseService
      .tranferMainCourseById(this.courseId)
      .subscribe((transformedData: TreeNode[]) => {
        this.mainCourses = transformedData;
        console.log(transformedData);
      });
  }
}

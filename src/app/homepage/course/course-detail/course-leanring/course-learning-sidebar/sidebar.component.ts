import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { CourseServiceModule } from '../../../course.service';
import { APIService } from 'src/app/service/APIservice.service';
@Component({
  selector: 'app-course-learning-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class CourseLeanringSidebarComponent {
  mainCourses!: TreeNode[];
  courseId: string | null = null;
  constructor(private route: ActivatedRoute, private APIservice: APIService) {}
  ngOnInit() {
    this.courseId = localStorage.getItem('courseId');
    this.APIservice.tranferMainCourseById(this.courseId).subscribe(
      (transformedData: TreeNode[]) => {
        this.mainCourses = transformedData;
        console.log(transformedData);
      }
    );
  }
}

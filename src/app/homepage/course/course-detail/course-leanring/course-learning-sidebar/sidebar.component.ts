import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { CourseServiceModule } from '../../../course.service';
import { APIService } from 'src/app/service/api/APIservice.service';
import { Course } from 'src/app/models/CourseModel';
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
        console.log(transformedData);
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

import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/CourseModel';
import { HomepageService } from '../homepage.service';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  listCourses: Course[] = [];
  constructor(private homepageService: HomepageService) {}

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.homepageService.getAllCourses().subscribe((res: any) => {
      this.listCourses = res.data;
    });
  }
}

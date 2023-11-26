import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { Course } from 'src/app/models/CourseModel';
import { APIService } from 'src/app/service/APIservice.service';
import { CourseServiceModule } from '../../../course.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
})
export class CourseLearningLessonsComponent {
  courseId!: string;
  videoId!: string;
  videoUrl!: SafeResourceUrl;
  isExpand!: boolean;
  course!: Course;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private courseService: CourseServiceModule
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.videoId = params['videoId'];
      this.courseId = params['courseId'];
    });
    // Thay thế "VIDEO_ID" bằng ID của video YouTube
    // Tạo URL an toàn
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.videoId}`
    );
    this.courseService.getCourseById(this.courseId).subscribe((res: any) => {
      this.course = res.data;
    });
  }
}

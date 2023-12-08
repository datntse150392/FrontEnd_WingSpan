import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { Course } from 'src/app/core/models';
import { APIService } from 'src/app/core/services';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss'],
})
export class CourseLearningLessonsComponent implements OnInit {
  courseId!: string;
  videoId!: string;
  videoUrl!: SafeResourceUrl;
  isExpand!: boolean;
  course!: Course;
  mainCourse!: TreeNode[];
  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private APIservice: APIService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // Scroll in the head page
      window.scrollTo({ top: 0, behavior: 'smooth' });

      this.videoId = params['videoId'];
      this.courseId = params['courseId'];
      // Thay thế "VIDEO_ID" bằng ID của video YouTube
      // Tạo URL an toàn
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${this.videoId}`
      );
    });

    this.APIservice.getCoursebyId(this.courseId).subscribe((res: any) => {
      this.course = res.data;
    });

    this.APIservice.tranferMainCourseById(this.courseId).subscribe(
      (transformedData: TreeNode[]) => {
        this.mainCourse = transformedData;
      }
    );
  }
}

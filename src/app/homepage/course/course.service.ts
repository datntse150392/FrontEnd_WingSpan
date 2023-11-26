import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable, map } from 'rxjs';
import { APIService } from 'src/app/service/APIservice.service';

@Injectable({ providedIn: 'root' })
export class CourseServiceModule {
  constructor(private APIservice: APIService) {}

  getCourseById(id: string): Observable<any> {
    return this.APIservice.getCoursebyId(id);
  }

  tranferMainCourseById(id: string) {
    return this.APIservice.getCoursebyId(id).pipe(
      map((res: any) => this.transformData(res.data.mainCourse))
    );
  }
  transformData(inputData: any[]): TreeNode<any>[] {
    return inputData.map((chapter, chapterIndex) => {
      return {
        key: chapterIndex.toString(),
        label: `${chapterIndex + 1}. ${chapter.chapterTitle}`,
        children: chapter.content.map((item: any, itemIndex: number) => {
          return {
            key: `${chapterIndex}-${itemIndex}`,
            label: `${itemIndex + 1}. ${item.title}`,
            icon: 'pi pi-fw pi-video',
            data: item.src,
            type: 'url',
          };
        }),
      };
    });
  }
}

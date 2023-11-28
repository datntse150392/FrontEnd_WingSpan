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
}

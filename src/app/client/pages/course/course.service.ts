import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from 'src/app/core/services';

@Injectable({ providedIn: 'root' })
export class CourseServiceModule {
  constructor(private APIservice: APIService) {}

  getCourseById(id: string): Observable<any> {
    return this.APIservice.getCoursebyId(id);
  }
}

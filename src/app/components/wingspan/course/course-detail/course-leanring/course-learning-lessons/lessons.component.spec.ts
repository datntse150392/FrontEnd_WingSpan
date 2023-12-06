import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLearningLessonsComponent } from './lessons.component';

describe('LessonsComponent', () => {
  let component: CourseLearningLessonsComponent;
  let fixture: ComponentFixture<CourseLearningLessonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseLearningLessonsComponent],
    });
    fixture = TestBed.createComponent(CourseLearningLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

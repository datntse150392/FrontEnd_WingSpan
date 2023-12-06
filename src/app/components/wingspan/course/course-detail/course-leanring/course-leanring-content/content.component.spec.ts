import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLearningContentComponent } from './content.component';

describe('ContentComponent', () => {
  let component: CourseLearningContentComponent;
  let fixture: ComponentFixture<CourseLearningContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseLearningContentComponent],
    });
    fixture = TestBed.createComponent(CourseLearningContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

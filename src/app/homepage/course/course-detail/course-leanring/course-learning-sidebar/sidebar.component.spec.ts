import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLeanringSidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: CourseLeanringSidebarComponent;
  let fixture: ComponentFixture<CourseLeanringSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseLeanringSidebarComponent],
    });
    fixture = TestBed.createComponent(CourseLeanringSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

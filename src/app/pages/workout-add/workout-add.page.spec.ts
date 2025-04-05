import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutAddPage } from './workout-add.page';

describe('WorkoutAddPage', () => {
  let component: WorkoutAddPage;
  let fixture: ComponentFixture<WorkoutAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

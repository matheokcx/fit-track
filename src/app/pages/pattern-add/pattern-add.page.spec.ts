import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatternAddPage } from './pattern-add.page';

describe('PatternAddPage', () => {
  let component: PatternAddPage;
  let fixture: ComponentFixture<PatternAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

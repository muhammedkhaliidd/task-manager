import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksCategoryContainer } from './tasks-category-container';

describe('TasksCategoryContainer', () => {
  let component: TasksCategoryContainer;
  let fixture: ComponentFixture<TasksCategoryContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksCategoryContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksCategoryContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

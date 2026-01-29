import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksCategorizedContainer } from './tasks-categorized-container';

describe('TasksCategorizedContainer', () => {
  let component: TasksCategorizedContainer;
  let fixture: ComponentFixture<TasksCategorizedContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksCategorizedContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksCategorizedContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

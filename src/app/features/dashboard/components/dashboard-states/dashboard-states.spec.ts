import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStates } from './dashboard-states';

describe('DashboardStates', () => {
  let component: DashboardStates;
  let fixture: ComponentFixture<DashboardStates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardStates],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardStates);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardState } from './dashboard-state';

describe('DashboardState', () => {
  let component: DashboardState;
  let fixture: ComponentFixture<DashboardState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardState],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

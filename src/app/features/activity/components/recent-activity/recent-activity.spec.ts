import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentActivity } from './recent-activity';
import { ActivityService } from '../../services/activity-service';

describe('RecentActivity', () => {
  let component: RecentActivity;
  let fixture: ComponentFixture<RecentActivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentActivity],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentActivity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display activity items when store has activities', () => {
    const activityService = TestBed.inject(ActivityService);
    activityService.recordCreated('t1', 'Task 1', 'John', 'u1');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Task 1');
    expect(el.textContent).toContain('John');
  });

  it('should display empty state when no activities', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('No recent activity');
  });
});

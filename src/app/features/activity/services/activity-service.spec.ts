import { TestBed } from '@angular/core/testing';
import { ActivityService } from './activity-service';
import { ACTIVITY_STORE } from '../store/activity-store';

describe('ActivityService', () => {
  let service: ActivityService;
  let store: InstanceType<typeof ACTIVITY_STORE>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivityService],
    });
    service = TestBed.inject(ActivityService);
    store = TestBed.inject(ACTIVITY_STORE);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add created activity when recordCreated is called', () => {
    const initialCount = store.activities().length;
    service.recordCreated('t1', 'Task 1', 'John', 'u1');
    expect(store.activities().length).toBe(initialCount + 1);
    const last = store.activities()[0];
    expect(last.action).toBe('created');
    expect(last.taskTitle).toBe('Task 1');
    expect(last.assigneeName).toBe('John');
  });

  it('should add updated activity when recordUpdated is called', () => {
    const initialCount = store.activities().length;
    service.recordUpdated('t1', 'Task 1', 'Jane', 'u2');
    expect(store.activities().length).toBe(initialCount + 1);
    expect(store.activities()[0].action).toBe('updated');
  });

  it('should add status_changed activity when recordStatusChanged is called', () => {
    const initialCount = store.activities().length;
    service.recordStatusChanged('t1', 'Task 1', 'Bob', 'u3', 'in_progress');
    expect(store.activities().length).toBe(initialCount + 1);
    const last = store.activities()[0];
    expect(last.action).toBe('status_changed');
    expect(last.details).toBe('In Progress');
  });

  it('should add deleted activity when recordDeleted is called', () => {
    const initialCount = store.activities().length;
    service.recordDeleted('t1', 'Task 1', 'Alice', 'u4');
    expect(store.activities().length).toBe(initialCount + 1);
    expect(store.activities()[0].action).toBe('deleted');
  });
});

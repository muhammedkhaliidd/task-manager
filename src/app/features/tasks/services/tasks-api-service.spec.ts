import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { TasksApiService } from './tasks-api-service';
import { APIS } from '../../../constants/apis';
import { Task } from '../models/tasks.model';

const mockTask: Task = {
  id: 't1',
  title: 'Test',
  description: 'Desc',
  dueDate: '2026-02-01',
  assignee: { id: 'u1', name: 'John', avatar: 'J', email: 'j@x.com' },
  tags: [],
  createdAt: '',
  updatedAt: '',
  priority: 'medium',
  status: 'todo',
};

describe('TasksApiService', () => {
  let service: TasksApiService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TasksApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(TasksApiService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have tasksResource', () => {
    expect(service.tasksResource).toBeDefined();
  });

  it('should create task via POST', () => {
    service.createTask(mockTask).subscribe((t) => {
      expect(t).toEqual(mockTask);
    });
    const req = controller.expectOne(APIS.tasks);
    expect(req.request.method).toBe('POST');
    req.flush(mockTask);
  });

  it('should replace task via PUT', () => {
    service.replaceTask('t1', mockTask).subscribe((t) => {
      expect(t).toEqual(mockTask);
    });
    const req = controller.expectOne(APIS.tasks + '/t1');
    expect(req.request.method).toBe('PUT');
    req.flush(mockTask);
  });

  it('should delete task via DELETE', () => {
    service.deleteTask('t1').subscribe();
    const req = controller.expectOne(APIS.tasks + '/t1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});

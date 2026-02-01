import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TasksService } from './tasks-service';
import { DialogService } from '../../../shared/services/dialog-service';
import { TasksApiService } from './tasks-api-service';
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

describe('TasksService', () => {
  let service: TasksService;
  let dialogService: jasmine.SpyObj<DialogService>;
  let tasksApiService: jasmine.SpyObj<TasksApiService>;

  beforeEach(() => {
    dialogService = jasmine.createSpyObj('DialogService', ['openDialog']);
    tasksApiService = jasmine.createSpyObj('TasksApiService', [
      'replaceTask',
      'deleteTask',
    ]);
    tasksApiService.replaceTask.and.returnValue(of(mockTask));
    tasksApiService.deleteTask.and.returnValue(of(undefined));

    TestBed.configureTestingModule({
      providers: [
        TasksService,
        { provide: DialogService, useValue: dialogService },
        { provide: TasksApiService, useValue: tasksApiService },
      ],
    });
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open task form modal when openTaskFormModal is called', () => {
    service.openTaskFormModal();
    expect(dialogService.openDialog).toHaveBeenCalled();
  });

  it('should open task form modal with task data when editing', () => {
    service.openTaskFormModal(mockTask);
    expect(dialogService.openDialog).toHaveBeenCalledWith(
      jasmine.anything(),
      jasmine.objectContaining({ data: mockTask }),
    );
  });
});

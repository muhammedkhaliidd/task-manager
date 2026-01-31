import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { CustomInput } from '../../../../shared/components/custom-input/custom-input';
import { CustomButton } from '../../../../shared/components/custom-button/custom-button';
import { TasksApiService } from '../../services/tasks-api-service';
import { ToastService } from '../../../../shared/services/toast-service';
import {
  Assignee,
  Task,
  TaskPriority,
  TaskState,
} from '../../models/tasks.model';
import { take } from 'rxjs';
import { CustomTextarea } from '../../../../shared/components/custom-textarea/custom-textarea';
import {
  CustomSelect,
  CustomSelectOption,
} from '../../../../shared/components/custom-select/custom-select';

const DEFAULT_ASSIGNEE: Assignee = {
  id: 'user-001',
  name: 'John Doe',
  avatar: 'JD',
  email: 'john.doe@company.com',
};

const PRIORITIES: TaskPriority[] = ['low', 'medium', 'high'];
const STATUSES: TaskState[] = ['todo', 'in_progress', 'done'];

const PRIORITY_OPTIONS: CustomSelectOption<TaskPriority>[] = PRIORITIES.map(
  (p) => ({ value: p, label: p.charAt(0).toUpperCase() + p.slice(1) }),
);

const STATUS_OPTIONS: CustomSelectOption<TaskState>[] = STATUSES.map((s) => ({
  value: s,
  label: s.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
}));

/**
 * Task form component for creating and editing tasks.
 * Uses reactive forms, custom-input, and custom-button.
 */
@Component({
  selector: 'app-task-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatDividerModule,
    CustomInput,
    CustomButton,
    CustomTextarea,
    CustomSelect,
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskForm implements OnInit {
  readonly form: FormGroup;
  readonly priorityOptions = PRIORITY_OPTIONS;
  readonly statusOptions = STATUS_OPTIONS;

  private readonly _dialogRef = inject(MatDialogRef<TaskForm>);
  private readonly _data = inject<{ task?: Task }>(MAT_DIALOG_DATA);
  private readonly _fb = inject(FormBuilder);
  private readonly _tasksApi = inject(TasksApiService);
  private readonly _toast = inject(ToastService);

  /**
   * Constructor
   */
  constructor() {
    this.form = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      dueDate: ['', Validators.required],
      priority: ['medium' as TaskPriority, Validators.required],
      status: ['todo' as TaskState, Validators.required],
    });
  }

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * It is called after the constructor and called  before the first ngOnChanges()
   */
  ngOnInit(): void {
    if (this._data) {
      this.form.patchValue({
        title: this._data.task?.title,
        description: this._data.task?.description,
        dueDate: this._data.task?.dueDate,
        priority: this._data.task?.priority,
        status: this._data.task?.status,
      });
    }
  }

  /**
   * Get the title control
   *
   * @returns The title control
   */
  get titleControl(): FormControl {
    return this.form.get('title') as FormControl;
  }

  /**
   * Get the description control
   *
   * @returns The description control
   */
  get descriptionControl(): FormControl {
    return this.form.get('description') as FormControl;
  }

  /**
   * Get the due date control
   *
   * @returns The due date control
   */
  get dueDateControl(): FormControl {
    return this.form.get('dueDate') as FormControl;
  }

  /**
   * Get the priority control
   *
   * @returns The priority control
   */
  get priorityControl(): FormControl {
    return this.form.get('priority') as FormControl;
  }

  /**
   * Get the status control
   *
   * @returns The status control
   */
  get statusControl(): FormControl {
    return this.form.get('status') as FormControl;
  }

  /**
   * Get the edit mode
   *
   * @returns The edit mode
   */
  get isEditMode(): boolean {
    return !!this._data;
  }

  /**
   * Submit the form
   */
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    if (this._data) {
      this._tasksApi
        .replaceTask(this._data.task?.id as string, {
          ...this._data,
          ...value,
          updatedAt: new Date().toISOString(),
        })
        .pipe(take(1))
        .subscribe({
          next: () => {
            this._toast.showToast('Task updated successfully');
            this._dialogRef.close(true);
          },
          error: () => {
            this._toast.showToast('Failed to update task', 4000);
          },
        });
    } else {
      const task: Task = {
        id: this.idGenerator(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...value,
        assignee: DEFAULT_ASSIGNEE,
        tags: [],
      };
      this._tasksApi
        .createTask(task)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this._toast.showToast('Task created successfully');
            this._dialogRef.close(true);
          },
          error: () => {
            this._toast.showToast('Failed to create task', 4000);
          },
        });
    }
  }

  /**
   * Generate a unique id for a task
   *
   * @returns The random id
   */
  idGenerator(): string {
    return 'task-' + Math.random().toString(36).substring(2, 15);
  }

  /**
   * Cancel the form
   */
  onCancel(): void {
    this._dialogRef.close(false);
  }
}

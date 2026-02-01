import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  FilterTaskState,
  FilterTaskStateItem,
  filterTaskStateItems,
} from '../../models/dashboard-filter.model';
import { TitleCasePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TASKS_STORE } from '../../../tasks/store/tasks-store';
import { TEAM_STORE } from '../../../team/store/team-store';
import { CustomButton } from '../../../../shared/components/custom-button/custom-button';
import { CustomSelect } from '../../../../shared/components/custom-select/custom-select';
import { TasksService } from '../../../tasks/services/tasks-service';
import { TaskPriority } from '../../../tasks/models/tasks.model';
import { CustomSelectOption } from '../../../../shared/components/custom-select/custom-select';

const PRIORITY_OPTIONS: CustomSelectOption<TaskPriority>[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

/**
 * Dashboard filter component
 */
@Component({
  selector: 'app-dashboard-filter',
  imports: [
    MatButtonToggleModule,
    ReactiveFormsModule,
    TitleCasePipe,
    CustomButton,
    CustomSelect,
  ],
  templateUrl: './dashboard-filter.html',
  styleUrl: './dashboard-filter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFilter implements OnInit {
  private readonly _destroyRef = inject(DestroyRef);
  protected readonly filterTaskStateItems: FilterTaskStateItem[] =
    filterTaskStateItems;
  protected readonly priorityOptions = PRIORITY_OPTIONS;
  protected readonly priorityControl = new FormControl<TaskPriority[]>([], {
    nonNullable: true,
  });
  protected readonly assigneeControl = new FormControl<string[]>([], {
    nonNullable: true,
  });
  filterType: FilterTaskState = 'all';
  private readonly _tasksStore = inject(TASKS_STORE);
  private readonly _teamStore = inject(TEAM_STORE);
  private readonly _tasksService = inject(TasksService);

  protected readonly assigneeOptions = computed<CustomSelectOption<string>[]>(
    () =>
      this._teamStore.members().map((m) => ({
        value: m.id,
        label: m.name,
      })),
  );

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * It is called after the constructor and called  before the first ngOnChanges()
   */
  ngOnInit(): void {
    this.listenToPriorityChanges();
    this.listenToAssigneeChanges();
  }

  /**
   * Listen to priority changes
   */
  listenToPriorityChanges(): void {
    this.priorityControl.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((p) => {
        const current = this._tasksStore.filter();
        this._tasksStore.setFilter({ ...current, priority: p });
      });
  }

  /**
   * Listen to assignee changes
   */
  listenToAssigneeChanges(): void {
    this.assigneeControl.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((assigneeIds) => {
        const current = this._tasksStore.filter();
        this._tasksStore.setFilter({ ...current, assigneeIds });
      });
  }

  /**
   * On filter type change
   *
   * @param event - Filter task state
   */
  onFilterTypeChange(event: FilterTaskState): void {
    const currentFilter = this._tasksStore.filter();
    this._tasksStore.setFilter({ ...currentFilter, state: event });
  }

  /**
   * Open the task form modal
   */
  onOpenTaskFormModal(): void {
    this._tasksService.openTaskFormModal();
  }
}

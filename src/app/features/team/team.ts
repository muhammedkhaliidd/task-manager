import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LettersCircleContainerComponent } from '../../shared/components/letters-circle-container/letters-circle-container.component';
import { TEAM_STORE } from './store/team-store';

/**
 * Team component
 */
@Component({
  selector: 'app-team',
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    LettersCircleContainerComponent,
  ],
  templateUrl: './team.html',
  styleUrl: './team.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Team {
  private readonly _teamStore = inject(TEAM_STORE);

  protected readonly members = this._teamStore.members;
  protected readonly membersLoading = this._teamStore.membersLoading;
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Team component
 */
@Component({
  selector: 'app-team',
  imports: [],
  templateUrl: './team.html',
  styleUrl: './team.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Team {}

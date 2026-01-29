import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Settings component
 */
@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings {}

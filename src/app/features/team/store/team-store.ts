import { signalStore, withMethods, withState, patchState } from '@ngrx/signals';
import { initialTeamState } from './team-store.model';
import { Assignee } from '../../tasks/models/tasks.model';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

export const TEAM_STORE = signalStore(
  { providedIn: 'root' },
  withDevtools('Team Store'),
  withState(initialTeamState),
  withMethods((teamStore) => ({
    setMembers: (members: Assignee[]) => {
      patchState(teamStore, { members });
    },
    setMembersLoading: (membersLoading: boolean) => {
      patchState(teamStore, { membersLoading });
    },
  })),
);

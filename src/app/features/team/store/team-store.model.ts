import { Assignee } from '../../tasks/models/tasks.model';

/**
 * Initial members extracted from db.json (unique assignees from tasks)
 */
const INITIAL_MEMBERS: Assignee[] = [
  {
    id: 'user-001',
    name: 'John Doe',
    avatar: 'JD',
    email: 'john.doe@company.com',
  },
  {
    id: 'user-002',
    name: 'Sarah Smith',
    avatar: 'SS',
    email: 'sarah.smith@company.com',
  },
  {
    id: 'user-003',
    name: 'Mike Johnson',
    avatar: 'MJ',
    email: 'mike.johnson@company.com',
  },
  {
    id: 'user-004',
    name: 'Emily Davis',
    avatar: 'ED',
    email: 'emily.davis@company.com',
  },
];

/**
 * Team state interface
 */
export interface TeamState {
  members: Assignee[];
  membersLoading: boolean;
}

/**
 * Initial team state
 */
export const initialTeamState: TeamState = {
  members: INITIAL_MEMBERS,
  membersLoading: false,
};

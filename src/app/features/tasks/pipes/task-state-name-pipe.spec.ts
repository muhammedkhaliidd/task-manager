import { TaskStateNamePipe } from './task-state-name-pipe';

describe('TaskStateNamePipe', () => {
  it('create an instance', () => {
    const pipe = new TaskStateNamePipe();
    expect(pipe).toBeTruthy();
  });
});

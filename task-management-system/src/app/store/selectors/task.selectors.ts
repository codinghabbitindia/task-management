import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from 'src/app/shared/models/task';

export const selectTaskState = createFeatureSelector<TaskState>('taskState');
export const selectAllTasks = createSelector(selectTaskState, state => state.tasks);

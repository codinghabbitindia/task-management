import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskActions from '../actions/task.actions';
import { mergeMap, map } from 'rxjs/operators';
import { TaskService } from 'src/app/task/task.service';

@Injectable()
export class TaskEffects {

    constructor(private actions$: Actions, private taskService: TaskService) { }

    loadTasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.loadTasks),
            mergeMap(() => this.taskService.getTasks().pipe(
                map(tasks => TaskActions.loadTasksSuccess({ tasks }))
            ))
        )
    );

    addTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.addTask),
            mergeMap(action => this.taskService.addTask(action.task).pipe(
                map(task => TaskActions.addTaskSuccess({ task }))
            ))
        )
    );

    updateTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.updateTask),
            mergeMap(action => this.taskService.updateTask(action.task).pipe(
                map(task => TaskActions.updateTaskSuccess({ task }))
            ))
        )
    );

    deleteTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.deleteTask),
            mergeMap(action => this.taskService.deleteTask(action.id).pipe(
                map(id => TaskActions.deleteTaskSuccess({ id }))
            ))
        )
    );
}
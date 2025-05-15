import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Task } from 'src/app/shared/models/task';
import { selectAllTasks } from 'src/app/store/selectors/task.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { updateTask, addTask, addTaskSuccess, updateTaskSuccess } from 'src/app/store/actions/task.actions';
import { Actions, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/shared/services/user.service';
import { TASK_PRIORITIES, TASK_STATUS } from 'src/app/shared/utils/constants';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent implements OnInit, OnDestroy {
  taskForm!: FormGroup;
  priorities = TASK_PRIORITIES;
  statuses = TASK_STATUS;
  users: string[] = [];
  taskId: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store,
    private snackBar: MatSnackBar,
    private router: Router,
    private actions: Actions,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllUsers();
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.taskId = params.get('id');
      if (this.taskId) {
        this.patchFormForEdit(this.taskId);
      }
    });

    this.actions.pipe(
      ofType(addTaskSuccess, updateTaskSuccess),
      takeUntil(this.destroy$)
    ).subscribe(action => {
      const msg = action.type === addTaskSuccess.type ? 'Task added successfully!' : 'Task updated successfully!';
      this.snackBar.open(msg, 'Close', { duration: 2000 });
      this.router.navigate(['/tasks']);
    });
  }

  private initForm() {
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(200)]],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      assignedTo: ['', Validators.required],
      dueDate: ['', [Validators.required, this.futureDateValidator]]
    });
  }

  private patchFormForEdit(id: string) {
    this.store.select(selectAllTasks).pipe(
      map(tasks => tasks.find(task => task.id === id)),
      takeUntil(this.destroy$)
    ).subscribe(task => {
      if (task) {
        this.taskForm.patchValue({
          taskName: task.taskName,
          description: task.description,
          priority: task.priority,
          status: task.status,
          assignedTo: task.assignedTo,
          dueDate: task.dueDate
        });
      }
    });
  }

  getAllUsers() {
    this.userService.getUsers().pipe(takeUntil(this.destroy$)).subscribe(users => {
      this.users = users;
    });
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    const selectedDate = new Date(value);
    const today = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return selectedDate < today ? { pastDate: true } : null;
  }

  get f() {
    return this.taskForm.controls;
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const task: Task = {
        ...formValue,
        id: this.taskId ? this.taskId : Date.now().toString()
      };
      if (this.taskId) {
        this.store.dispatch(updateTask({ task }));
      } else {
        this.store.dispatch(addTask({ task }));
      }
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.router.navigate(['/tasks']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
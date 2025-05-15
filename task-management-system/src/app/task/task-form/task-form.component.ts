import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Task } from 'src/app/shared/models/task';
import { selectAllTasks } from 'src/app/store/selectors/task.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { updateTask, addTask, addTaskSuccess, updateTaskSuccess } from 'src/app/store/actions/task.actions';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  priorities = ['Low', 'Medium', 'High'];
  statuses = ['Pending', 'In Progress', 'Completed'];
  users = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Charlie Green'];
  taskDetails!: Observable<Task | undefined>;
  taskId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store,
    private snackBar: MatSnackBar,
    private router: Router,
    private actions: Actions,
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(200)]],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      assignedTo: ['', Validators.required],
      dueDate: ['', [Validators.required, this.futureDateValidator]]
    });

    this.route.paramMap.subscribe(params => {
      this.taskId = params.get('id');
    });

    this.taskDetails = this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id =>
        this.store.select(selectAllTasks).pipe(
          map(tasks => tasks.find(task => task.id === id))
        )
      )
    );

    this.taskDetails.subscribe(task => {
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

    this.actions.pipe(
      ofType(addTaskSuccess, updateTaskSuccess)
    ).subscribe(action => {
      const msg = action.type === addTaskSuccess.type ? 'Task added successfully!' : 'Task updated successfully!';
      this.snackBar.open(msg, 'Close', { duration: 2000 });
      this.router.navigate(['/tasks']);
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
      console.log('Task:', task);
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
}
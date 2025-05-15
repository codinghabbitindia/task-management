import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { Task } from 'src/app/shared/models/task';
import { UserService } from 'src/app/shared/services/user.service';
import { TASK_PRIORITIES, TASK_STATUS } from 'src/app/shared/utils/constants';
import { deleteTask, deleteTaskSuccess, loadTasks, updateTask } from 'src/app/store/actions/task.actions';
import { selectAllTasks } from 'src/app/store/selectors/task.selectors';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  priorities = TASK_PRIORITIES;
  statuses = TASK_STATUS;
  tasks: Observable<Task[]> = this.store.select(selectAllTasks);
  displayedColumns: string[] = ['taskName', 'description', 'priority', 'status', 'assignedTo', 'dueDate'];
  actionConfig = { isEdit: true, isView: true, isDelete: true };
  columnHeaders: { [key: string]: string } = {
    taskName: 'Task Name',
    description: 'Description',
    priority: 'Priority',
    status: 'Status',
    assignedTo: 'Assigned To',
    dueDate: 'Due Date'
  };
  users: string[] = [];
  searchText: string = '';
  selectedPriority: string = '';
  selectedStatus: string = '';
  selectedUser: string = '';
  pendingTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];
  filteredTasks: Task[] = [];

  constructor(
    private store: Store,
    private router: Router,
    private dialog: MatDialog,
    private actions: Actions,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.store.dispatch(loadTasks());
    this.tasks.subscribe(tasks => {
      this.filterAndGroupTasks(tasks);
    });

    this.actions.pipe(
      ofType(deleteTaskSuccess)
    ).subscribe(() => {
      this.snackBar.open('Task deleted successfully!', 'Close', { duration: 2000 });
    });
  }

  filterAndGroupTasks(tasks: Task[]) {
    let filtered = tasks.filter(task => {
      const matchesSearch =
        !this.searchText ||
        task.taskName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        (task.description || '').toLowerCase().includes(this.searchText.toLowerCase());
      const matchesPriority = !this.selectedPriority || task.priority === this.selectedPriority;
      const matchesStatus = !this.selectedStatus || task.status === this.selectedStatus;
      const matchesUser = !this.selectedUser || task.assignedTo === this.selectedUser;
      return matchesSearch && matchesPriority && matchesStatus && matchesUser;
    });
    this.filteredTasks = filtered;
    this.pendingTasks = filtered.filter(task => task.status === 'Pending');
    this.inProgressTasks = filtered.filter(task => task.status === 'In Progress');
    this.completedTasks = filtered.filter(task => task.status === 'Completed');
  }

  applyFilters() {
    this.tasks.subscribe(tasks => {
      this.filterAndGroupTasks(tasks);
    });
  }

  onTaskDrop(event: CdkDragDrop<Task[]>, newStatus: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      const updatedTask = { ...task, status: newStatus };
      this.store.dispatch(updateTask({ task: updatedTask }));
    }
  }

  editTask(task: Task) {
    this.router.navigate(['/tasks', task.id, 'edit']);
  }

  viewTask(task: Task) {
    this.router.navigate(['/tasks', task.id]);
  }

  deleteTask(task: Task) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '450px',
      height: '300px',
      data: { itemName: task.taskName }
    });

    dialogRef.componentInstance.confirm.subscribe(() => {
      this.store.dispatch(deleteTask({ id: task.id }));
      dialogRef.close();
    });

    dialogRef.componentInstance.cancel.subscribe(() => {
      dialogRef.close();
    });
  }
}
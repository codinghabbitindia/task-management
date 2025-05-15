import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/shared/models/task';
import { TASK_PRIORITIES, TASK_STATUS } from 'src/app/shared/utils/constants';
import { loadTasks, updateTask } from 'src/app/store/actions/task.actions';
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
  users = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Charlie Green'];
  searchText: string = '';
  selectedPriority: string = '';
  selectedStatus: string = '';
  selectedUser: string = '';
  pendingTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];
  filteredTasks: Task[] = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadTasks());
    this.tasks.subscribe(tasks => {
      this.filterAndGroupTasks(tasks);
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
    // Implement edit logic
    console.log('Edit Task:', task);
  }

  viewTask(task: Task) {
    // Implement view logic
    console.log('View Task:', task);
  }

  deleteTask(task: Task) {
    // Implement delete logic (dispatch deleteTask action)
    console.log('Delete Task:', task);
  }
}
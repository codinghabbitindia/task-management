import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../shared/models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];

  getTasks(): Observable<Task[]> {
    return of([...this.tasks]);
  }

  addTask(task: Task): Observable<Task> {
    this.tasks.push(task);
    return of(task);
  }

  updateTask(updated: Task): Observable<Task> {
    this.tasks = this.tasks.map(t => t.id === updated.id ? updated : t);
    return of(updated);
  }

  deleteTask(id: string): Observable<string> {
    this.tasks = this.tasks.filter(t => t.id !== id);
    return of(id);
  }
}

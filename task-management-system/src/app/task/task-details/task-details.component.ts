import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Task } from 'src/app/shared/models/task';
import { selectAllTasks } from 'src/app/store/selectors/task.selectors';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  task!: Observable<Task | undefined>;

  constructor(private route: ActivatedRoute, private store: Store, private location: Location) { }

  ngOnInit() {
    this.task = this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id =>
        this.store.select(selectAllTasks).pipe(
          map(tasks => tasks.find(task => task.id === id))
        )
      )
    );
  }

  goBack() {
    this.location.back();
  }
}
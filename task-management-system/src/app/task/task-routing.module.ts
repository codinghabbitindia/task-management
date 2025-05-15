import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

const routes: Routes = [
    {path: '', redirectTo: '', pathMatch: 'full'},
    {path: '', component: TaskListComponent},
    {path: 'add', component: TaskFormComponent},
    {path: ':id/edit', component: TaskFormComponent},
    {path: ':id', component: TaskDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class TaskRoutingModule { }

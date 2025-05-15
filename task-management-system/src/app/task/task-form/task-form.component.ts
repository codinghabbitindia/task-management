import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(200)]],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      assignedTo: ['', Validators.required],
      dueDate: ['', [Validators.required, this.futureDateValidator]]
    });
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    const selectedDate = new Date(value);
    const today = new Date();
    // Set time to 00:00:00 for comparison
    selectedDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    return selectedDate < today ? { pastDate: true } : null;
  }

  get f() {
    return this.taskForm.controls;
  }

  onSubmit() {
    if (this.taskForm.valid) {
      // Handle form submission
      console.log(this.taskForm.value);
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
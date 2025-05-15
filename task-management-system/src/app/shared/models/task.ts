export interface Task {
  id: string;
  taskName: string;
  description?: string;
  priority: string;
  status: string;
  assignedTo: string;
  dueDate: string;
}

export interface TaskState {
  tasks: Task[];
}
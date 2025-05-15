export const NAV_ITEMS = [
    { label: 'Tasks', icon: 'list', route: '/tasks', ariaLabel: 'Show list of all the tasks' },
    { label: 'New Task', icon: 'add', route: '/tasks/add', ariaLabel: 'Add new task' },
    { label: 'Edit Task', icon: 'edit', route: '/tasks/:id/edit', ariaLabel: 'Edit task' },
    { label: 'View Task', icon: 'visibility', route: '/tasks/:id', ariaLabel: 'View task' },
];

export const TASK_PRIORITIES = [
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' }
];

export const TASK_STATUS = [
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' }
];
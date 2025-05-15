# TaskManagementSystem

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.7.

## 🚀 Features

- **Task Board:** View tasks grouped by status (Pending, In Progress, Completed) in a Kanban-style board.
- **Add/Edit Task:** Create new tasks or edit existing ones with validation.
- **Delete Task:** Delete tasks with confirmation modal.
- **View Task Details:** See all details of a task in a card view.
- **Filtering:** Search and filter tasks by name, description, priority, status, and assigned user.
- **Drag & Drop:** Move tasks between statuses using drag-and-drop.
- **State Management:** Uses NgRx for robust state handling.
- **Responsive UI:** Built with Angular Material for a clean, responsive interface.
- **Success Messages:** Snackbar notifications for add/edit/delete actions.
- **Empty State:** Friendly watermark and icon when no tasks are present.

## 🛠️ Setup & Running the Project

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Angular CLI](https://angular.io/cli) (v16+)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd task-management-system

2. **Install Dependencies**
   npm install

3. **Run the development server**
   ng serve

📝 Usage

**Add Task:** Click the "Add Task" button, fill out the form, and submit.

**Edit Task:** Click the edit icon on a task row.

**Delete Task:** Click the delete icon and confirm in the modal.

**View Details:** Click the view icon to see task details.

**Filter/Search:** Use the search box and dropdowns at the top to filter tasks.

**Drag & Drop:** Move tasks between columns to change their status.

⚠️ Assumptions & Limitations

**Data Persistence:** Tasks are stored in-memory (using a local JSON file as initial data). Changes are not persisted after a browser refresh.

**Authentication:** No user authentication or authorization is implemented.

**Users List:** The list of users for assignment is hardcoded.

**No Backend:** This project is frontend-only. To persist data, integration with a backend API is required.

**Testing:** Basic Angular/Karma setup is present, but test coverage may be minimal.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() dataSource: any[] = []; // Data to populate the table
  @Input() displayedColumns: string[] = []; // Column keys
  @Input() columnHeaders: { [key: string]: string } = {}; // Mapping of column keys to display names
  @Input() showActions: boolean = true; // Whether to show the actions column
  @Input() actions: { isEdit?: boolean; isView?: boolean; isDelete?: boolean } = { isEdit: true, isView: true, isDelete: true };
  @Output() onEdit = new EventEmitter<any>(); // Event for edit action
  @Output() onView = new EventEmitter<any>(); // Event for view action
  @Output() onDelete = new EventEmitter<any>(); // Event for delete action

  handleEdit(row: any) {
    this.onEdit.emit(row);
  }

  handleView(row: any) {
    this.onView.emit(row);
  }

  handleDelete(row: any) {
    this.onDelete.emit(row);
  }

  get tableColumns(): string[] {
    return this.showActions ? [...this.displayedColumns, 'actions'] : this.displayedColumns;
  }
}
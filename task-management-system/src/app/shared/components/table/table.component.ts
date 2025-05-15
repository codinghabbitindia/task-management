import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() dataSource: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() columnHeaders: { [key: string]: string } = {};
  @Input() showActions: boolean = true;
  @Input() actions: { isEdit?: boolean; isView?: boolean; isDelete?: boolean } = { isEdit: true, isView: true, isDelete: true };
  @Output() onEdit = new EventEmitter<any>();
  @Output() onView = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

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
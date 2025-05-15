import { NgModule } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { TableComponent } from '../components/table/table.component';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        HeaderComponent,
        TableComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        HeaderComponent,
        TableComponent,
        MaterialModule
    ]
})
export class SharedModule { }

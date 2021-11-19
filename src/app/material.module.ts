import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatCheckboxModule,  MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
@NgModule({
    imports: [MatInputModule, MatFormFieldModule,MatProgressSpinnerModule, MatButtonToggleModule, MatCardModule,MatExpansionModule, MatChipsModule, MatButtonModule, MatSidenavModule, MatToolbarModule, MatDividerModule, MatIconModule, MatMenuModule, MatListModule, MatRippleModule, MatTabsModule, MatTooltipModule, MatTableModule, MatPaginatorModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatSortModule, MatRadioModule, MatDialogModule, MatCheckboxModule, MatAutocompleteModule, MatSlideToggleModule, DragDropModule],
    exports: [MatInputModule, MatFormFieldModule,MatProgressSpinnerModule, MatButtonToggleModule,MatExpansionModule, MatCardModule, MatChipsModule, MatButtonModule, MatSidenavModule, MatToolbarModule, MatDividerModule, MatIconModule, MatMenuModule, MatListModule, MatRippleModule, MatTabsModule, MatTooltipModule, MatTableModule, MatPaginatorModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatSortModule, MatRadioModule, MatDialogModule, MatCheckboxModule, MatAutocompleteModule, MatSlideToggleModule, DragDropModule],
    providers: [
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true, disableClose: true } },
       // { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check' }
    ]
})

export class MaterialModule { }

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from '@app/_services/toastr.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  message = 'Are you sure you want to Delete ';
  confirmButtonText = 'Yes';
  title = '';
  taskId = '';
  constructor(public dialog: MatDialog, private toast: ToastrService,
    private dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
      this.title = data.headerName;
      this.taskId = data.taskId;
     }

  ngOnInit(): void {
  }

  closewindow(){
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

}

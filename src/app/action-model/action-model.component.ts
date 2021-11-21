import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/* Common model for all the components CURD operations */
@Component({
  selector: 'app-action-model',
  templateUrl: './action-model.component.html',
  styleUrls: ['./action-model.component.scss']
})
export class ActionModelComponent implements OnInit {
  /* Manager Form (Used Reactive forms)  */
  taskForm: any = new FormGroup({
    taskId: new FormControl({ value: '', disabled: false }, [Validators.required as any, Validators.pattern('^[0-9-\\s]*$')]),
    taskName: new FormControl('', Validators.required),
    assignTo: new FormControl({ value: '', disabled: false }, [Validators.required as any, Validators.pattern('^[a-zA-Z-\\s]*$')]),
    points: new FormControl({ value: '', disabled: false }, [Validators.required as any, Validators.pattern('^[0-9-\\s]*$'), Validators.min(1), Validators.max(500)]),
    status: new FormControl('', Validators.required)
  });

  /* Worker Form (Used Reactive forms)  */

  workerForm: any = new FormGroup({
    status: new FormControl('', Validators.required)
  });
  taskDetails = [];
  statusData = ['Assigned', 'Pending', 'Resloved'];
  headerName = '';
  constructor(public dialog: MatDialog,
    private dialogRef: MatDialogRef<ActionModelComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.headerName = data.headerName;
    if (data.headerName === 'Update Task') {
      this.taskForm.patchValue({
        taskId: data.ele.taskId,
        taskName: data.ele.taskName,
        assignTo: data.ele.assignTo,
        points: data.ele.points,
        status: data.ele.status,
      })
    }
    if (this.headerName === 'Update Worker Task') {
      this.workerForm.patchValue({
        status: data.ele.status
      });
    }
    if (this.headerName === 'Task Details') {
      this.taskDetails.push(data.ele);
    }


  }


  ngOnInit(): void {
  }
  closewindow() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.taskForm.value);
  }

  onSubmitWorker() {
    this.dialogRef.close(this.workerForm.value);
  }

}

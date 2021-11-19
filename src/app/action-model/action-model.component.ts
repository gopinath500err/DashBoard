import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-action-model',
  templateUrl: './action-model.component.html',
  styleUrls: ['./action-model.component.scss']
})
export class ActionModelComponent implements OnInit {

  taskForm: any = new FormGroup({
    taskId: new FormControl('', Validators.required),
    taskName: new FormControl('', Validators.required),
    assignTo: new FormControl('', Validators.required),
    points: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  });
  statusData = ['Assigned','Pending','Resloved'];
  headerName = '';
  constructor(public dialog: MatDialog,
    private dialogRef: MatDialogRef<ActionModelComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) { 
      this.headerName = data.headerName;
      if( data.headerName === 'Update Task'){
        this.taskForm.patchValue({
          taskId: data.ele.taskId,
          taskName: data.ele.taskName,
          assignTo: data.ele.assignTo,
          points: data.ele.points,
          status: data.ele.status,
        })
      }

    }


  ngOnInit(): void {
  }
  closewindow(){
    this.dialogRef.close();
  }

  onSubmit() {
      this.dialogRef.close(this.taskForm.value);
    }
  
}

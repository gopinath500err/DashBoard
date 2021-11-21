import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActionModelComponent } from '@app/action-model/action-model.component';
import { ApiService } from '@app/_services/apiservice.service';
import { ToastrService } from '@app/_services/toastr.service';

/* This component will be rendered by all authenticated Managers and respective Worker. */
@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['index', 'taskId', 'taskName', 'assignTo', 'points', 'status', 'actions'];
  dataSource: any;
  filteredSource: any;
  dialogConfig: MatDialogConfig;
  schdlKeyword: any = undefined;
  loading = false;
  constructor(private dialog: MatDialog,
    private api: ApiService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.gettaskList();
    this.loading = true;
    //this.dataSource = [];
  }

  gettaskList() {
    this.api.httpGet('/getWorkerList')
      .subscribe((res: any) => {
        if (res.err === null && res.data) {
          this.dataSource = res.data;
          this.filteredSource = new MatTableDataSource(this.dataSource);
          this.filteredSource.sort = this.sort;
          this.filteredSource.paginator = this.paginator;
        } else {
          console.log(res.err);
        }
      });
  }


 // Filter by dataSource
 applyFilter(filterValue: any) {
  this.filteredSource.filter = filterValue.trim().toLowerCase();
}   

/* Update Worker Status */

  editTask(ele) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ActionModelComponent, {
      autoFocus: false,
      maxHeight: '650px',
      width: '830px',
      panelClass: ['overflow-auto'],
      data: {
        headerName: 'Update Worker Task', ele
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let data = {
          "id" : ele._id,
          "status":result.status
        }
        this.api.httpPost('/updateWTask', data)
          .subscribe(
            response => {
              if (response.data !== undefined) {
                this.toast.open('success', 'SUCCESS', 'updated successfully');
                this.gettaskList();
              }
            });

      }
    })
  }

  details(ele){
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ActionModelComponent, {
      autoFocus: false,
      maxHeight: '650px',
      width: '830px',
      panelClass: ['overflow-auto'],
      data: {
        headerName: 'Task Details', ele
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {


      }
    })
  }

}

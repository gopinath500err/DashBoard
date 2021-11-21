import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActionModelComponent } from '@app/action-model/action-model.component';
import { ApiService } from '@app/_services/apiservice.service';
import { ToastrService } from '@app/_services/toastr.service';
import { ConfirmationComponent } from '@app/confirmation/confirmation.component';

@Component({
  templateUrl: 'admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['index', 'taskId', 'taskName', 'assignTo', 'createdAt', 'points', 'status', 'actions'];
  dataSource: any;
  filteredSource: any;
  dialogConfig: MatDialogConfig;
  schdlKeyword: any = undefined;
  loading = false;
  users: User[] = [];

  constructor(private userService: UserService, private dialog: MatDialog,
    private api: ApiService, private toast: ToastrService) {

    this.filteredSource = new MatTableDataSource(this.dataSource);
    this.filteredSource.sort = this.sort;
    this.filteredSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.loading = true;
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    });
    this.gettaskList();
  }

  /* Task List */

  gettaskList() {
    this.api.httpGet('/getTaskList')
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

  // Filter by dataSource data

  applyFilter(filterValue: any) {
    this.filteredSource.filter = filterValue.trim().toLowerCase();
  }

  /* Create Task */

  createTask() {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ActionModelComponent, {
      autoFocus: false,
      maxHeight: '650px',
      width: '830px',
      panelClass: ['overflow-auto'],
      data: {
        headerName: 'Create Task'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.api.httpPost('/createTask', result)
          .subscribe(
            response => {
              if (response.data !== undefined) {
                this.toast.open('success', 'SUCCESS', 'created successfully');
                this.gettaskList();
              }
            });
      }
    })
  }

  /* Update Task */

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
        headerName: 'Update Task', ele
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        result._id = ele._id;
        this.api.httpPost('/updateTask', result)
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

  /* Delete Task */

  deleteTask(ele) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ConfirmationComponent, {
      autoFocus: false,
      maxHeight: '400px',
      width: '500px',
      panelClass: ['overflow-auto'],
      data: {
        headerName: 'Delete Task', "taskId": ele.taskId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        let id = { _Id: ele._id };
        this.api.httpPost('/remove', id)
          .subscribe(
            response => {
              if (response.data !== undefined) {
                this.toast.open('success', 'SUCCESS', 'Deleted successfully');
                this.gettaskList();
              }
            });

      }
    })


  }

}
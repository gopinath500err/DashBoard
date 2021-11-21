import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable, Subject } from 'rxjs';
import { ToastrService } from './toastr.service';
@Injectable({
    providedIn: 'root'
})
export class ApiService {
       apiEndPoint = window.location.protocol + '//' + window.location.hostname + ':4000/api';

    constructor(private http: HttpClient, private toastr: ToastrService ) {
     }

    // Post Method
    httpPost(url, reqData) {
       
        return this.http.post(`${this.apiEndPoint}${url}`, reqData)
        .pipe(
            map((res: any) => {
                const resData: { err, data } = res;
               // console.log(resData.err)
                return resData;
            }),
            catchError((err: any) => {
                if (err === 'Conflict'){
                this.toastr.open('warning', `WARNING-409`, err);
                return throwError(err);
                }else{
                this.toastr.open('error', `ERROR-${err.status}`, err.statusText);
                return throwError(err);
                }
            })
            );
        }

    // Get Method
    httpGet(url) {
       
        return this.http.get(`${this.apiEndPoint}${url}`)
        .pipe(
            map((res: any) => {
                const resData: { err, data } = res;
                return resData;
            }),
            catchError((err: any) => {
                this.toastr.open('error', `ERROR-${err.status}`, err.statusText);
                return throwError(err);
            })
            );
        }

      

    

}

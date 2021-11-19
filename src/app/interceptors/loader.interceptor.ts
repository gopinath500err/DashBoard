import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';
import { LoaderService } from '../_services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  counter = 0;
  constructor(private loaderService: LoaderService) {

  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.requests.push(req);

    this.beginRequest();
    return next.handle(req).pipe(
      delay(800),
      finalize(() => this.endRequest())
    );
  }

  beginRequest() {
    this.requests.forEach(req => {
      if (req.url.endsWith('product/mapping/update') && req.body.hideLoader === true) {
        this.loaderService.isLoading.next(false);
      }
      else {
        this.loaderService.isLoading.next(true);
      }
    });
  }

  endRequest() {
    this.loaderService.isLoading.next(false);
  }

}

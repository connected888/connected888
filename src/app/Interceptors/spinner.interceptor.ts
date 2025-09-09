import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  private requests = 0;

  constructor(private spinner: NgxSpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // first request → show spinner
    if (this.requests === 0) {
      this.spinner.show();
    }
    this.requests++;

    return next.handle(req).pipe(
     delay(2000),
      finalize(() => {
        this.requests--;
        if (this.requests === 0) {
          // all requests done → hide spinner
          this.spinner.hide();
        }
      })
    );
  }
}

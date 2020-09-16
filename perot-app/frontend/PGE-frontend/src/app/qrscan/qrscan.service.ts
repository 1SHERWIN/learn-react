import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable()
export class QrscanService {
  springApiUrl = 'http://127.0.0.1:8080/'

  constructor(private http: HttpClient) { }

  updateProgress(data) {
    return this.http.put(this.springApiUrl + 'updateProgress', data, {responseType: 'text'}).subscribe(
        res => {
          console.log(res);
        });
    }
}
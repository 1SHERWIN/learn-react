import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ExitService {
  springApiUrl = 'http://127.0.0.1:8080/updateEmail'

  constructor(private http: HttpClient) { }

  updateEmail(data) {
    return this.http.put<any>(this.springApiUrl, data).subscribe(
        res => {
            console.log(res);
        });
    }

}
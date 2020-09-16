import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // For a new user
  springApiUrl = 'http://127.0.0.1:8080/createUser'  
  getNickname(data) {
    return this.http.post(this.springApiUrl, data, { responseType: 'text' });
  }

  // For a returning user
  springApiUrlRet = 'http://localhost:8080/getUser'
  // Function to get make REST API call
  getUserData(data) {
    return this.http.get(this.springApiUrlRet + "?nickname=" + data);
  }

}
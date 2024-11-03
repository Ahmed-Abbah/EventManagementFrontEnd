import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {User} from "../entities/User";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private eventsApiUrl:string = 'https://localhost:8080/api';
  constructor(private http:HttpClient) { }


  register(userData: User): Observable<any> {
    const url = `${this.eventsApiUrl}/register`; // Endpoint for registration
    return this.http.post(url, userData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMsg = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMsg));
  }
}

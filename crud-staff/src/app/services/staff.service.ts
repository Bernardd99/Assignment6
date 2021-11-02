import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http'; 
import { Staff } from '../models/Staff'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  endpoint: string = `http://localhost:4000`

  constructor(private http: HttpClient) { }

  addStaff(staff: Staff): Observable<any> {
    const api = `${this.endpoint}/users`;
    return this.http.post(api, staff).pipe(
      catchError(this.handleError)
    )
  }

  getStaffs(): Observable<any>{
    const api = `${this.endpoint}/users`;
    return this.http.get(api).pipe(
      catchError(this.handleError)
    )
  }

  deleteStaff(id: number): Observable<any>{
    const api = `${this.endpoint}/users/${id}`;
    return this.http.delete(api).pipe(
      catchError(this.handleError)
    )
  }

  updateData(staff: Staff, id: number): Observable<any>{
    const api =`${this.endpoint}/users/${id}`;
    return this.http.put(api, staff).pipe(
      catchError(this.handleError)
    )
  }

  //Error Handling
  handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      return throwError(err.error.message)
    } else {
      return throwError(`Server-side error code: ${err.status}\nMessage: ${err.message}`)
    }
  }
}

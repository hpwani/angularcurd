import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url = 'http://localhost:61103/api/Employeemasters';

  constructor(private http: HttpClient) { }

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }
  getEmployeeById(employeeid: string): Observable<Employee> {
    return this.http.get<Employee>(this.url + '/' + employeeid);
  }
}

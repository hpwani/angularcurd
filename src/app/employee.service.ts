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

  /*================GET All EMPLOYEE DATA===============*/
  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url);
  }

  /*================GET EACH EMPLOYEE DATA FOR EDIT================*/
  getEmployeeById(employeeid: string): Observable<Employee> {
    return this.http.get<Employee>(this.url + '/' + employeeid);
  }

  /*=================INSERT DATA IN DATABASE==================*/
  createEmployee(employee: Employee): Observable<Employee> {
    const httpHeaders = new HttpHeaders()
      .set('content-type', 'application/json');
    const options = {
      headers: httpHeaders
    };
    return this.http.post<Employee>(this.url, employee, options);
  }

  /*=================UPDATE DATA IN DATABASE==================*/
  updateEmployee(employee: Employee): Observable<number> {
    const httpHeaders = new HttpHeaders()
      .set('content-type', 'application/json');
    const options = {
      headers: httpHeaders
    };
    return this.http.put<number>(this.url + '/' + employee.ID, employee, options);
  }

  /*=================DELETE DATA IN DATABASE==================*/
  deleteEmployee(employeeid: Employee): Observable<number> {
    const httpHeaders = new HttpHeaders()
      .set('content-type', 'application/json');
    return this.http.delete<number>(this.url + '/' + employeeid);
  }
}

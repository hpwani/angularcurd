import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  dataSaved = false;
  employeeForm: FormGroup;
  allEmployees: Observable<Employee[]>;
  employeeIdToUpdate = null;
  massage = null;

  constructor(private fb: FormBuilder,
              private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      EmailId: ['', [Validators.required]],
      Designation: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      Address: ['', [Validators.required]],
    });

    this.loadAllEmployees();
  }

  loadAllEmployees() {
    this.allEmployees = this.employeeService.getAllEmployee();
    console.log(this.allEmployees);
  }

  onFormSubmit() {
    this.dataSaved = false;
    const employee = this.employeeForm.value;
    console.log(employee);
    this.createEmployee(employee);
    this.employeeForm.reset();
  }

  createEmployee(employee: Employee) {
    if (this.employeeIdToUpdate == null) {
      this.employeeService.createEmployee(employee).subscribe((emp) => {
        console.log(emp);
        this.dataSaved = true;
        this.massage = 'Record Saved Successfully..!';
        this.loadAllEmployees();
        this.employeeIdToUpdate = null;
        this.employeeForm.reset();
      });
    } else {
      employee.ID = this.employeeIdToUpdate;
      this.employeeService.updateEmployee(employee).subscribe(() => {
        this.dataSaved = true;
        this.massage = 'Record Updated Successfully..!';
        this.loadAllEmployees();
        this.employeeIdToUpdate = null;
        this.employeeForm.reset();
      });
    }
  }

  loadEmployeeToEdit(employeeId: string) {
    this.employeeService.getEmployeeById(employeeId).subscribe(employee => {
      this.massage = null;
      this.dataSaved = false;
      this.employeeIdToUpdate = employee.ID;
      this.employeeForm.controls.FirstName.setValue(employee.FirstName);
      this.employeeForm.controls.LastName.setValue(employee.LastName);
      this.employeeForm.controls.EmailId.setValue(employee.EmailId);
      this.employeeForm.controls.Designation.setValue(employee.Designation);
      this.employeeForm.controls.Gender.setValue(employee.Gender);
      this.employeeForm.controls.Address.setValue(employee.Address);
    });
  }

  deleteEmployee(employeeId: any) {
    this.employeeService.deleteEmployee(employeeId).subscribe(() => {
      this.massage = 'Record Deleted Successfully..!';
      this.loadAllEmployees();
      this.employeeIdToUpdate = null;
      this.employeeForm.reset();
    });
  }

  resetForm() {
    this.employeeForm.reset();
    this.massage = null;
    this.dataSaved = false;
  }
}

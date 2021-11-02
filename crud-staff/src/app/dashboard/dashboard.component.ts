import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Staff } from '../models/Staff';
import { StaffService } from '../services/staff.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Staffs: Staff[] = [];

  staffId: number = 0;

  InputData = new FormGroup({
    FirstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    LastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    Email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    Title: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    Role: new FormControl('', [
      Validators.required,
      Validators.maxLength(1),
      Validators.pattern("^[0|1]$")
    ]),
    Password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    ConfirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
  })

  updateData = new FormGroup({
    FirstNameUpdate: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    LastNameUpdate: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    EmailUpdate: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    TitleUpdate: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    RoleUpdate: new FormControl('', [
      Validators.required,
      Validators.maxLength(1),
      Validators.pattern("^[0|1]$")
    ])
  })

  isSubmitted = false;

  constructor(public staffService: StaffService) {


  }


  get FirstName() {
    return this.InputData.get('FirstName')
  }
  get LastName() {
    return this.InputData.get('LastName')
  }
  get Email() {
    return this.InputData.get('Email')
  }
  get Title() {
    return this.InputData.get('Title')
  }
  get Role() {
    return this.InputData.get('Role')
  }
  get Password() {
    return this.InputData.get('Password')
  }
  get ConfirmPassword() {
    return this.InputData.get('ConfirmPassword')
  }
  get FirstNameUpdate() {
    return this.updateData.get('FirstNameUpdate')
  }
  get LastNameUpdate() {
    return this.updateData.get('LastNameUpdate')
  }
  get EmailUpdate() {
    return this.updateData.get('EmailUpdate')
  }
  get TitleUpdate() {
    return this.updateData.get('TitleUpdate')
  }
  get RoleUpdate() {
    return this.updateData.get('RoleUpdate')
  }

  ngOnInit(): void {
    this.getStaffs();
  }

  onSubmitState() {
    if (this.isSubmitted == true) {
      this.isSubmitted = false;
    }
  }

  resetForm() {
    this.InputData.reset();
    this.isSubmitted = false;
  }

  addStaff() {
    this.isSubmitted = true
    if (!this.InputData.invalid) {
      this.isSubmitted = false;
      this.staffService.addStaff(this.InputData.value)
        .subscribe((res) => {
          if (res) {
            alert("Data Has Been Added!")
            let ref = document.getElementById('closeAdd')
            ref?.click();
            this.InputData.reset();
            this.getStaffs();

          }
        },
          (err) => {
            console.log(err);
            // alert(err.error.message);
          });
    }
  }

  getStaffs() {
    this.staffService.getStaffs()
      .subscribe((res) => {
        console.log(res)
        this.Staffs = res;
      })
  }

  deleteStaff(id: number) {
    this.staffService.deleteStaff(id)
      .subscribe((res) => {
        alert("Data Has Been Deleted!")
        this.getStaffs();
      })
  }

  updateStaff() {
    this.isSubmitted = true
    console.log(this.updateData)
    if (!this.updateData.invalid) {
      this.isSubmitted = false;
      this.staffService.updateData(this.updateData.value, this.staffId)
        .subscribe((res) => {
          if (res) {
            alert("Data Has Been Updated!")
            let ref = document.getElementById('closeUpdate')
            ref?.click();
            this.updateData.reset();
            this.getStaffs();

          }
        },
          (err) => {
            console.log(err);
            // alert(err.error.message);
          });
    }
  }

  onUpdate(staff: any) {
    this.staffId = staff.id
    this.updateData.controls['TitleUpdate'].setValue(staff.title)
    this.updateData.controls['FirstNameUpdate'].setValue(staff.firstName)
    this.updateData.controls['LastNameUpdate'].setValue(staff.lastName)
    this.updateData.controls['EmailUpdate'].setValue(staff.email)
    if (staff.role == 'User') {
      this.updateData.controls['RoleUpdate'].setValue('1')
    } else {
      this.updateData.controls['RoleUpdate'].setValue('0')
    }
  }
}

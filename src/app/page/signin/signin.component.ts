import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, EmailValidator, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'environments/environment';
import { StorageService } from 'app/shared/service/storage.service';
import { SubjectService } from 'app/shared/service/subject.service';
import { AdminService } from 'app/system/service/admin.service';
import { ShipperService } from 'app/shipper/service/shipper.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, AfterViewInit {
  test : Date = new Date();
  focus;
  focus1;
  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    isAdmin: new FormControl(true, [Validators.required]),
  });

  constructor(
    private router:Router, 
    private adminService: AdminService,
    private shipperService: ShipperService,
    private toastr: ToastrService,
    private subjectService: SubjectService
  ) { }

  ngAfterViewInit() {
    this.subjectService.isAdminLoggedIn.subscribe(loggedIn => {
      if(loggedIn){
        this.router.navigate(['/system']);
      } 
    });
    this.subjectService.isshipperLoggedIn.subscribe(loggedIn => {
      if(loggedIn){
        this.router.navigate(['/shipper']);
      } 
    });
  }

  ngOnInit() {
    
  }

  onSubmit() {
    if (this.signinForm.valid) {
      let formData = this.signinForm.value;
      let payload = {
        email: formData.email,
        matKhau: formData.password
      };
      if(formData.isAdmin){
        this.adminService.login(payload).subscribe(
          response => {
            this.adminService.loginSuccess(response);
            this.subjectService.adminLogin();
  
            this.toastr.success('Đăng nhập thành công','Thông báo'); 
            this.router.navigate(['/system']);
          },
          error => {
            this.toastr.error('Đăng nhập không thành công','Thông báo');
            console.error('There was an error!', error);
          }
        );
      } else{
        this.shipperService.login(payload).subscribe(
          response => {
            this.shipperService.loginSuccess(response);
            this.subjectService.shiperLogin();
  
            this.toastr.success('Đăng nhập thành công','Thông báo'); 
            this.router.navigate(['/shipper']);
          },
          error => {
            this.toastr.error('Đăng nhập không thành công','Thông báo');
            console.error('There was an error!', error);
          }
        );
      }
      
    } else {
      this.toastr.error('Thông tin đăng nhập không hợp lệ!','Thông báo');
    }
  }
  
}

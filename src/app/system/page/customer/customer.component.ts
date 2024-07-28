import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StatusTransitionService } from 'app/shared/service/status-transition.service';
import { StorageService } from 'app/shared/service/storage.service';
import { SubjectService } from 'app/shared/service/subject.service';
import { AdminService } from 'app/system/service/admin.service';
import { Select2OptionData } from 'ng-select2';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ToastrService } from 'ngx-toastr';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { error } from 'console';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public exampleData: Array<Select2OptionData>;
  data: any[] = [];
  selectedOrderId: number = -1;
  action:string = 'add';
  page: any;
  // scrollbar
  scrollbarConfig: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    minScrollbarLength: 20,
    wheelSpeed: 0.2,
    swipeEasing: true
  };

  //approve
  @ViewChild('updateModal') updateModal: any;
  @ViewChild('deleteModal') deleteModal: any;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private toastr: ToastrService,
    private statusService: StatusTransitionService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  // Init Data
  loadData() {
    this.adminService.getListCustomer().subscribe(
      response => {
        this.data = response as any[];
      },
      error => {
        this.data = [];
        this.toastr.error('Lấy danh sách khách hàng không thành công', 'Thông báo');
        console.error('There was an error!', error);
      }
    )
  }

  getClassByStatusId(id) {
    return this.statusService.getClassById(id);
  }

  // delete
  openDeleteModal(id) {
    this.deleteModal.openDeleteModal(id);
  }

  confirmDelete($event) {
    this.adminService.deleteCustomer($event).subscribe(
      response => {
        this.toastr.success('Xóa khách hàng thành công', 'Thông báo');
        this.loadData();
      },
      error => {
        this.toastr.error('Xóa khách hàng không thành công', 'Thông báo');
        console.error('There was an error!', error);
      }
    )
  }
    // update
    openUpdateModal(row, action) {
      this.action = action;
      this.updateModal.openUpdateModal(row, action);
    }
  
    confirmUpdate($event) {
      console.log($event);
      if(this.action == 'add'){
        this.adminService.createCustomer($event).subscribe(
          response => {
            this.toastr.success('Thêm khách hàng thành công', 'Thông báo');
            this.loadData();
          },
          error => {
            this.toastr.error('Thêm khách hàng không thành công', 'Thông báo');
            console.error('There was an error!', error);
          }
        )
      }else{
        this.adminService.updateCustomer($event).subscribe(
          response => {
            this.toastr.success('Sửa thông tin khách hàng thành công', 'Thông báo');
            this.loadData();
          },
          error => {
            this.toastr.error('Sửa thông khách hàng không thành công', 'Thông báo');
            console.error('There was an error!', error);
          }
        )
      }
      
    }

  
}

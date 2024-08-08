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
  selector: 'app-shipper-system',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.css']
})
export class ShipperComponent implements OnInit {

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
  searchControl = new FormControl();
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
    this.searchControl.valueChanges
      .pipe(
        debounceTime(2000) // Chờ 300ms sau khi người dùng ngừng nhập
      )
      .subscribe(value => {
        this.loadData(value);
      });
    this.loadData();
  }

  // Init Data
  loadData(search = '') {
    this.adminService.getListShipper(search).subscribe(
      response => {
        this.data = response as any[];
      },
      error => {
        this.data = [];
        this.toastr.error('Lấy danh sách người giao hàng không thành công', 'Thông báo');
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
    this.adminService.deleteShipper($event).subscribe(
      response => {
        this.toastr.success('Xóa shipper thành công', 'Thông báo');
        this.loadData();
      },
      error => {
        this.toastr.error('Xóa shipper không thành công', 'Thông báo');
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
        this.adminService.createShipper($event).subscribe(
          response => {
            this.toastr.success('Thêm shipper thành công', 'Thông báo');
            this.loadData();
          },
          error => {
            this.toastr.error('Thêm shipper không thành công', 'Thông báo');
            console.error('There was an error!', error);
          }
        )
      }else{
        this.adminService.updateShipper($event).subscribe(
          response => {
            this.toastr.success('Sửa thông tin shipper thành công', 'Thông báo');
            this.loadData();
          },
          error => {
            this.toastr.error('Sửa thông shipper không thành công', 'Thông báo');
            console.error('There was an error!', error);
          }
        )
      }
      
    }

  
}

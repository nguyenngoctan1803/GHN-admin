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
import { ApproveModalComponent } from './approve-modal/approve-modal.component';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { error } from 'console';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public exampleData: Array<Select2OptionData>;
  data: any[] = [];
  listStatus: any[] = [];
  selectedStatus: any = -1;
  select2Options: any = {
    placeholder: 'Chọn trạng thái',
    language: {
      noResults: function() {
        return "Không có kết quả";
      }
    }
  };
  selectedOrderId: number = -1;
  page: any;
  searchControl = new FormControl();
  // scrollbar
  scrollbarConfig: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    minScrollbarLength: 20,
    wheelSpeed: 0.2,
    swipeEasing: true
  };

  //approve
  @ViewChild('approveModal') approveModal: any;
  @ViewChild('refundModal') refundModal: any;
  @ViewChild('deleteModal') deleteModal: any;
  @ViewChild('detailModal') detailModal: any;

  constructor(
    private router: Router,
    private adminService: AdminService,
    private toastr: ToastrService,
    private statusService: StatusTransitionService,
  ) { }

  ngOnInit(): void {
    this.loadData('','');
    this.loadStatus();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(2000) // Chờ 300ms sau khi người dùng ngừng nhập
      )
      .subscribe(value => {
        this.onSearch(value);
      });
  }

  // Init Data
  loadData(search, trangthaiId) {
    this.adminService.getListOrder(search, trangthaiId).subscribe(
      response => {
        this.data = response as any[];
      },
      error => {
        this.data = [];
        this.toastr.error('Lấy danh sách đơn hàng không thành công', 'Thông báo');
        console.error('There was an error!', error);
      }
    )
  }
  loadStatus() {
    this.adminService.getListStatus().subscribe(
      response => {
        this.listStatus = [{
          id: this.selectedStatus,         // Giá trị id của phần tử mặc định
          text: 'Tất cả' // Giá trị text của phần tử mặc định
        },
        ... (response as any[]).map(r => {
          return {
            id: r.trangThaiID,
            text: r.moTaTrangThai
          }
        })];

      },
      error => {
        this.listStatus = [];
        this.toastr.error('Lấy danh sách đơn hàng không thành công', 'Thông báo');
        console.error('There was an error!', error);
      }
    )
  }
  getClassByStatusId(id) {
    return this.statusService.getClassById(id);
  }

  // filter
  onStatusChanged($event) {
    this.selectedStatus = $event;
    this.loadData(this.searchControl.value, this.selectedStatus != -1 ? this.selectedStatus : '');
  }
  onSearch(value: string) {
    this.loadData(value, this.selectedStatus != -1 ? this.selectedStatus : '');
  }

  // approve
  openApproveModal(id) {
    this.approveModal.openApproveModal(id);
  }

  confirmApprove($event) {
    this.adminService.approveOrder($event).subscribe(
      response => {
        this.toastr.success('Duyệt đơn hàng thành công', 'Thông báo');
        this.loadData(this.searchControl.value, this.selectedStatus != -1 ? this.selectedStatus : '');
      },
      error => {
        this.toastr.error('Duyệt đơn hàng không thành công', 'Thông báo');
        console.error('There was an error!', error);
      }
    )
  }
  // refund
  openRefundModal(id) {
    this.refundModal.openRefundModal(id);
  }

  confirmRefund($event) {
    this.adminService.refundOrder($event).subscribe(
      response => {
        this.toastr.success('Hoàn đơn hàng thành công', 'Thông báo');
        this.loadData(this.searchControl.value, this.selectedStatus != -1 ? this.selectedStatus : '');
      },
      error => {
        this.toastr.error('Xác nhận hoàn đơn hàng không thành công', 'Thông báo');
        console.error('There was an error!', error);
      }
    )
  }
  // delete
  openDeleteModal(id) {
    this.deleteModal.openDeleteModal(id);
  }

  confirmDelete($event) {
    this.adminService.deleteOrder($event).subscribe(
      response => {
        this.toastr.success('Xóa đơn hàng thành công', 'Thông báo');
        this.loadData(this.searchControl.value, this.selectedStatus != -1 ? this.selectedStatus : '');
      },
      error => {
        this.toastr.error('Xóa đơn hàng không thành công', 'Thông báo');
        console.error('There was an error!', error);
      }
    )
  }
    // detail
    openDetailModal(id) {
      this.detailModal.openDetailModal(id);
    }
  
}

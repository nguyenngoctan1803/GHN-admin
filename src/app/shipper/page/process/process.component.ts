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
import { DoneModalComponent } from './done-modal/done-modal.component';
import { RefundModalComponent } from './refund-modal/refund-modal.component';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { error } from 'console';
import { ShipperService } from 'app/shipper/service/shipper.service';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

  public exampleData: Array<Select2OptionData>;
  data: any[] = [];
  selectedOrderId: number = -1;
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
  @ViewChild('doneModal') doneModal: any;
  @ViewChild('refundModal') refundModal: any;
  @ViewChild('detailModal') detailModal: any;
  
  constructor(
    private router: Router,
    private shipperService: ShipperService,
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
    this.shipperService.getListProcess(search).subscribe(
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

  getClassByStatusId(id) {
    return this.statusService.getClassById(id);
  }

  // approve
  openDoneModal(id) {
    this.doneModal.openDoneModal(id);
  }

  confirmDone($event) {
    this.shipperService.doneOrder($event).subscribe(
      response => {
        this.toastr.success('Xác nhận giao đơn hàng thành công', 'Thông báo');
        this.loadData();
      },
      error => {
        this.toastr.error('Xác nhận giao đơn hàng không thành công', 'Thông báo');
        console.error('There was an error!', error);
      }
    )
  }
  // approve
  openRefundModal(id) {
    this.refundModal.openRefundModal(id);
  }

  confirmRefund($event) {
    this.shipperService.refundOrder($event.orderId, $event.reason).subscribe(
      response => {
        this.toastr.success('Hoàn hàng đang chờ xử lý', 'Thông báo');
        this.loadData();
      },
      error => {
        this.toastr.error('Đăng ký hoàn hàng không thành công', 'Thông báo');
        console.error('There was an error!', error);
      }
    )
  }

        // detail
        openDetailModal(id) {
          this.detailModal.openDetailModal(id);
        }
}


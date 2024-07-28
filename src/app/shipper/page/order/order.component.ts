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
import { ShipperService } from 'app/shipper/service/shipper.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public exampleData: Array<Select2OptionData>;
  data: any[] = [];
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
  @ViewChild('detailModal') detailModal: any;
  
  constructor(
    private router: Router,
    private shipperService: ShipperService,
    private toastr: ToastrService,
    private statusService: StatusTransitionService,
  ) { }

  ngOnInit(): void {
    this.loadData();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(2000) // Chờ 300ms sau khi người dùng ngừng nhập
      )
      .subscribe(value => {
        this.onSearch(value);
      });
  }

  // Init Data
  loadData(search= '') {
    this.shipperService.getListOrder(search).subscribe(
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

  // filter
  onSearch(value: string) {
    this.loadData(value);
  }

  // approve
  openApproveModal(id) {
    this.approveModal.openApproveModal(id);
  }

  confirmApprove($event) {
    this.shipperService.approveOrder($event).subscribe(
      response => {
        this.toastr.success('Nhận đơn hàng thành công', 'Thông báo');
        this.loadData(this.searchControl.value);
      },
      error => {
        this.toastr.error('Nhận đơn hàng không thành công', 'Thông báo');
        console.error('There was an error!', error);
      }
    )
  }
      // detail
      openDetailModal(id) {
        this.detailModal.openDetailModal(id);
      }
}

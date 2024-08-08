import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { StatusTransitionService } from "app/shared/service/status-transition.service";
import { StorageService } from "app/shared/service/storage.service";
import { SubjectService } from "app/shared/service/subject.service";
import { AdminService } from "app/system/service/admin.service";
import { Select2OptionData } from "ng-select2";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { ToastrService } from "ngx-toastr";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { ReactiveFormsModule } from "@angular/forms"; // Import ReactiveFormsModule
import { error } from "console";
import { ShipperService } from "app/shipper/service/shipper.service";

@Component({
  selector: "app-success-order",
  templateUrl: "./success-order.component.html",
  styleUrls: ["./success-order.component.css"],
})
export class SuccessOrderComponent implements OnInit {
  public exampleData: Array<Select2OptionData>;
  data: any[] = [];
  selectedOrderId: number = -1;
  page: any;
  // scrollbar
  scrollbarConfig: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    minScrollbarLength: 20,
    wheelSpeed: 0.2,
    swipeEasing: true,
  };
  searchControl = new FormControl();
  //approve
  @ViewChild("detailModal") detailModal: any;
  @ViewChild("chargeModal") chargeModal: any;

  constructor(
    private router: Router,
    private shipperService: ShipperService,
    private toastr: ToastrService,
    private statusService: StatusTransitionService
  ) {}

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
    this.shipperService.getListSuccess(search).subscribe(
      (response) => {
        this.data = response as any[];
      },
      (error) => {
        this.data = [];
        this.toastr.error(
          "Lấy danh sách đơn hàng không thành công",
          "Thông báo"
        );
        console.error("There was an error!", error);
      }
    );
  }
  // detail
  openDetailModal(id) {
    this.detailModal.openDetailModal(id);
  }
  // charge
  openChargeFeeModal(id, fee){
    this.chargeModal.openChargeModal(id, fee);
  }
  confirmCharge($event){
    this.shipperService.chargeOrder($event).subscribe(
      response => {
        if(response.code == 1){
          this.toastr.error('Đơn hàng đã được đăng ký thanh toán phí trước đó!', 'Thông báo');
        }
        else if(response.code == 2){
          this.toastr.error('Đơn hàng đã được xác nhận thanh toán phí trước đó!', 'Thông báo');
        }
        else{
          this.toastr.success('Đăng ký thanh toán phí đơn hàng thành công', 'Thông báo');
        }
        this.loadData();
      },
      error => {
        this.toastr.error('Đăng ký thanh toán phí đơn hàng không thành công', 'Thông báo');
        this.loadData();
        console.error('There was an error!', error);
      }
    )
  }
}

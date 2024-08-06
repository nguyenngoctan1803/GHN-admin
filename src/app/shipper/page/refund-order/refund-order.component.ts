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
  selector: 'app-refund-order',
  templateUrl: './refund-order.component.html',
  styleUrls: ['./refund-order.component.css']
})
export class RefundOrderComponent implements OnInit {
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

  //approve
  @ViewChild("detailModal") detailModal: any;

  constructor(
    private router: Router,
    private shipperService: ShipperService,
    private toastr: ToastrService,
    private statusService: StatusTransitionService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  // Init Data
  loadData() {
    this.shipperService.getListRefund().subscribe(
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
}

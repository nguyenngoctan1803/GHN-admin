import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { StatusTransitionService } from 'app/shared/service/status-transition.service';
import { AdminService } from 'app/system/service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'detail-process-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.css']
})
export class DetailProcessModalComponent implements OnInit {

  // modal
  @ViewChild('modal') detailModal: any;
  orderId = -1;
  order: any;
  customer: any;
  shipper: any;
  orderDetail: any = [];
  closeResult: string = '';
  modalRef: NgbModalRef;
  
  constructor(
    private modalService: NgbModal,
    private adminService: AdminService,
    private toastr: ToastrService,
    private statusService: StatusTransitionService,
  ) { }

  ngOnInit(): void {
  }
  openDetailModal(id) {
    this.orderId = id;
    this.loadData();
  }
  
  loadData() {
    this.adminService.getOrderById(this.orderId).subscribe(
      response => {
        this.order = response;
        const orderId = this.order.donHangId;
        const customerId = this.order.khachHangId;
        if(this.order.shipperId){
          this.loadShipper(this.order.shipperId);
        }
        forkJoin({
          orderDetail: this.adminService.getDetailOrderByOrderId(orderId).pipe(
            catchError(error => {
              this.toastr.error('Lấy thông tin chi tiết đơn hàng không thành công', 'Thông báo');
              console.error('There was an error!', error);
              return of(null);
            })
          ),
          customer: this.adminService.getDetailCustomerByCusId(customerId).pipe(
            catchError(error => {
              this.toastr.error('Lấy thông tin khách hàng không thành công', 'Thông báo');
              console.error('There was an error!', error);
              return of(null);
            })
          ),
        }).subscribe(
          ({ orderDetail, customer }) => {
            if (orderDetail && customer) {
              this.orderDetail = orderDetail;
              this.customer = customer;
              console.table(this.orderDetail);
              console.table(this.customer);
              this.showModal();
            } else {
              this.toastr.error('Lấy thông tin đơn hàng không thành công', 'Thông báo');
            }
          },
          error => {
            this.toastr.error('Lấy thông tin đơn hàng không thành công', 'Thông báo');
            console.error('There was an error!', error);
          }
        );
      },
      error => {
        this.toastr.error('Lấy thông tin đơn hàng không thành công', 'Thông báo');
        console.error('There was an error!', error);
      }
    );
  }
  
  loadShipper(id){
    this.adminService.getDetailShipperByCusId(id).subscribe(
      response => {
        this.shipper = response;
      },
      error => {
        this.toastr.error('Lấy thông tin người giao hàng không thành công', 'Thông báo');
        console.error('There was an error!', error);
      }
    )
  }
  
  showModal(){
    this.modalRef = this.modalService.open(this.detailModal, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
      windowClass: 'fade', // This ensures the modal window has the fade effect
      backdropClass: 'fade' // This ensures the backdrop has the fade effect
    });
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
  getClassByStatusId(id) {
    return this.statusService.getClassById(id);
  }
  getNameByStatusId(id) {
    return this.statusService.getNameById(id);
  }
}

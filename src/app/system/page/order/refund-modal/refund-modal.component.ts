import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'refund-modal',
  templateUrl: './refund-modal.component.html',
  styleUrls: ['./refund-modal.component.css']
})
export class RefundModalComponent implements OnInit {

  // modal
  @ViewChild('modal') refundModal: any;
  orderId = -1;
  @Output() outputEvent = new EventEmitter<number>();
  closeResult: string = '';
  modalRef: NgbModalRef;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {

  }
  openRefundModal(id) {
    this.orderId = id;
    this.modalRef = this.modalService.open(this.refundModal, {ariaLabelledBy: 'modal-basic-title'});
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

  confirm(){
    this.outputEvent.emit(this.orderId);
    this.modalRef.close();
  }
}

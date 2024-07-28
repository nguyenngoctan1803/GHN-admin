import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'refund-modal',
  templateUrl: './refund-modal.component.html',
  styleUrls: ['./refund-modal.component.css']
})
export class RefundModalComponent implements OnInit {

  // modal
  @ViewChild('modal') refundModal: any;
  @Output() outputEvent = new EventEmitter<any>();
  closeResult: string = '';
  modalRef: NgbModalRef;
  orderId: number = -1;
  refundForm = new FormGroup({
    reason: new FormControl('', [Validators.required]),
  });

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {

  }
  openRefundModal(orderId) {
    this.orderId = orderId;
    this.modalRef = this.modalService.open(this.refundModal, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
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

  confirm() {
    let obj1 = this.refundForm.value;
    let obj = {
      orderId: this.orderId,
      reason: obj1.reason,
    }
    this.outputEvent.emit(obj);
    this.modalRef.close();
  }
}

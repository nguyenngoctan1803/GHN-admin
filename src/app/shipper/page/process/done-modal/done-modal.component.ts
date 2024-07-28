import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'done-modal',
  templateUrl: './done-modal.component.html',
  styleUrls: ['./done-modal.component.css']
})
export class DoneModalComponent implements OnInit {

  // modal
  @ViewChild('modal') doneModal: any;
  orderId = -1;
  @Output() outputEvent = new EventEmitter<number>();
  closeResult:string = '';
  modalRef: NgbModalRef;
  
  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {

  }
  openDoneModal(id) {
    this.orderId = id;
    this.modalRef = this.modalService.open(this.doneModal, {
      ariaLabelledBy: 'modal-basic-title',
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

  confirm(){
    this.outputEvent.emit(this.orderId);
    this.modalRef.close();
  }
  
}


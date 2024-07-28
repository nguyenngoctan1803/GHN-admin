import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  // modal
  @ViewChild('modal') deleteModal: any;
  orderId = -1;
  @Output() outputEvent = new EventEmitter<number>();
  closeResult:string = '';
  modalRef: NgbModalRef;
  
  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {

  }
  openDeleteModal(id) {
    this.orderId = id;
    this.modalRef = this.modalService.open(this.deleteModal, {
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

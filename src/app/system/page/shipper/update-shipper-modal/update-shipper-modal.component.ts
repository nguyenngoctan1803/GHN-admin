import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'update-shipper-modal',
  templateUrl: './update-shipper-modal.component.html',
  styleUrls: ['./update-shipper-modal.component.css']
})
export class UpdateShipperModalComponent implements OnInit {

  // modal
  @ViewChild('modal') updateModal: any;
  shipper: any;
  action:string = 'add';
  @Output() outputEvent = new EventEmitter<any>();
  closeResult: string = '';
  modalRef: NgbModalRef;
  updateModel = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    hoTen: new FormControl('', [Validators.required]),
    matKhau: new FormControl('', [Validators.required]),
  });

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {

  }
  openUpdateModal(shipper, action) {
    this.action = action;
    this.shipper = {};
    if(this.action == 'edit'){
      this.shipper = shipper;
      this.updateModel.controls.email.setValue(shipper.email); 
      this.updateModel.controls.hoTen.setValue(shipper.hoTen); 
      this.updateModel.controls.matKhau.setValue("temp"); 
    }else{
      this.updateModel.reset();
    }
    this.modalRef = this.modalService.open(this.updateModal, {
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
    let obj1 = this.updateModel.value;
    let obj = {
      shipperId: this.shipper.shipperID,
      hoTen: obj1.hoTen,
      email: obj1.email,
      matKhau:obj1.matKhau
    }
    this.outputEvent.emit(obj);
    this.modalRef.close();
  }
}

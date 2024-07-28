import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'update-customer-modal',
  templateUrl: './update-customer-modal.component.html',
  styleUrls: ['./update-customer-modal.component.css']
})
export class UpdateCustomerModalComponent implements OnInit {

  // modal
  @ViewChild('modal') updateModal: any;
  khachhang: any;
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
  openUpdateModal(khachhang, action) {
    this.action = action;
    this.khachhang = {};
    if(this.action == 'edit'){
      this.khachhang = khachhang;
      this.updateModel.controls.email.setValue(khachhang.email); 
      this.updateModel.controls.hoTen.setValue(khachhang.hoTen); 
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
      khachHangId: this.khachhang.khachHangID,
      hoTen: obj1.hoTen,
      email: obj1.email,
      matKhau:obj1.matKhau
    }
    this.outputEvent.emit(obj);
    this.modalRef.close();
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectService } from 'app/shared/service/subject.service';
import { AdminService } from 'app/system/service/admin.service';

@Component({
  selector: "app-modal-content",
  template: `
            <div class="modal-header modal-colored-header bg-danger">
              <h5 class="modal-title text-center text-white">Đăng xuất</h5>
              <button type="button" class="btn-close btn-close-white" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
              </button>
            </div>
            <div class="modal-body">Bạn có chắc chắn muốn đăng xuất?</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-light" (click)="activeModal.close('Close click')">
                Đóng
              </button>
              <button type="button" class="btn bg-danger-subtle text-danger" (click)="confirmLogout()">
                Xác nhận
              </button>
            </div>
  `,
})
export class NgbdModalContent {
  constructor(
    public activeModal: NgbActiveModal,
    private adminService: AdminService,
    private subjectService: SubjectService
  ) {}

  confirmLogout() {
    this.adminService.logout();
    this.subjectService.adminLogout();
    this.activeModal.close();
    window.location.reload();
  }
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  onLogout() {
    const modalRef = this.modalService.open(NgbdModalContent);
  }
}

import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private adminLoggedIn = new BehaviorSubject<boolean>(this.checkAdminLoginStatus());
  private shipperLoggedIn = new BehaviorSubject<boolean>(this.checkShipperLoginStatus());

  constructor(
    private cookieService: StorageService
  ) { }

  // Observable để các component khác có thể subscribe vào
  get isAdminLoggedIn() {
    return this.adminLoggedIn.asObservable();
  }
  // Observable để các component khác có thể subscribe vào
  get isshipperLoggedIn() {
    return this.shipperLoggedIn.asObservable();
  }

  // Phương thức để cập nhật trạng thái đăng nhập
  adminLogin() {
    this.adminLoggedIn.next(true);
  }

  adminLogout() {
    this.adminLoggedIn.next(false);
  }
  // Phương thức để cập nhật trạng thái đăng nhập
  shiperLogin() {
    this.shipperLoggedIn.next(true);
  }

  shiperLogout() {
    this.shipperLoggedIn.next(false);
  }
    // Kiểm tra trạng thái đăng nhập dựa trên giá trị của cookie
  private checkAdminLoginStatus(): boolean {
    const token = this.cookieService.getCookie(environment.tokenAdmin);
    return token !== null; // Hoặc thêm logic kiểm tra token hợp lệ
  }
  private checkShipperLoginStatus(): boolean {
    const token = this.cookieService.getCookie(environment.tokenShipper);
    return token !== null; // Hoặc thêm logic kiểm tra token hợp lệ
  }
}

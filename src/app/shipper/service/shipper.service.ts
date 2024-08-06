import { Injectable } from '@angular/core';
import { ApiService } from 'app/shared/service/api.service';
import { StorageService } from 'app/shared/service/storage.service';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ShipperService {

  constructor(
    public apiService: ApiService,
    private cookieService: StorageService
  ) { }
  
  login(body: any){
    return this.apiService.post('Shipper/login', body);
  }

  loginSuccess(data){
    this.cookieService.clearCookie();
    this.cookieService.setCookie(environment.tokenShipper, data.token);
    this.cookieService.setCookie(environment.idShipper, data.id);
    this.cookieService.setCookie(environment.shipper, JSON.stringify(data));
  }

  logout(){
    this.cookieService.deleteCookie(environment.tokenShipper);
    this.cookieService.deleteCookie(environment.idShipper);
    this.cookieService.deleteCookie(environment.shipper);
  }

  getListOrder(search = ''){
    let url = search ? `?search=${search}` : '';
    return this.apiService.get('Shipper/don-hang-co-the-nhan' + url); 
  }
  getListProcess(){
    let shipperId = this.cookieService.getCookie(environment.idShipper);
    let url = `?shipperId=${shipperId}`;
    return this.apiService.get('Shipper/don-hang-dang-thuc-hien' + url); 
  }
  getListSuccess(){
    let shipperId = this.cookieService.getCookie(environment.idShipper);
    let url = `?shipperId=${shipperId}`;
    return this.apiService.get('Shipper/don-hang-thanh-cong' + url); 
  }
  getListRefund(){
    let shipperId = this.cookieService.getCookie(environment.idShipper);
    let url = `?shipperId=${shipperId}`;
    return this.apiService.get('Shipper/don-hang-hoan' + url); 
  }
  approveOrder(orderId){ // nhận đơn hàng
    let shipperId = this.cookieService.getCookie(environment.idShipper);
    return this.apiService.post(`Shipper/nhan-don-hang?donHangId=${orderId}&shipperId=${shipperId}`, {});
  }
  doneOrder(orderId){
    let shipperId = this.cookieService.getCookie(environment.idShipper);
    return this.apiService.post(`Shipper/xac-nhan-giao-hang?donHangId=${orderId}`, {});
  }
  refundOrder(orderId, reason){
    let payload = {
      donHangId: orderId,
      lyDo: reason
    }
    return this.apiService.post(`Shipper/hoan-hang`, payload);
  }
    // profile
    updateProfile(body){
      return this.apiService.put(`Shipper/update`, body);
    }
    changePassword(body){
      return this.apiService.put(`Shipper/changepassword`, body);
    }
}

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
  getListProcess(search = ''){
    let shipperId = this.cookieService.getCookie(environment.idShipper);
    return this.apiService.get(`Shipper/don-hang-dang-thuc-hien/${shipperId}?search=${search}`); 
  }
  getListSuccess(search = ''){
    let shipperId = this.cookieService.getCookie(environment.idShipper);
    return this.apiService.get(`Shipper/don-hang-thanh-cong/${shipperId}?search=${search}`); 
  }
  getListRefund(search = ''){
    let shipperId = this.cookieService.getCookie(environment.idShipper);
    return this.apiService.get(`Shipper/don-hang-hoan/${shipperId}?search=${search}`); 
  }
  approveOrder(orderId){ // nhận đơn hàng
    let shipperId = this.cookieService.getCookie(environment.idShipper);
    return this.apiService.post(`Shipper/nhan-don-hang?donHangId=${orderId}&shipperId=${shipperId}`, {});
  }
  doneOrder(orderId){
    return this.apiService.post(`Shipper/xac-nhan-giao-hang?donHangId=${orderId}`, {});
  }
  chargeOrder(orderId){
    return this.apiService.post(`Shipper/dang-ky-tra-phi/${orderId}`, {});
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
    //thong ke
    statistic(){
      let shipperId = this.cookieService.getCookie(environment.idShipper);
      return this.apiService.get(`Shipper/thong-ke/${shipperId}`);
    }
}

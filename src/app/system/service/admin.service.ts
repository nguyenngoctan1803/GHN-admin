import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/shared/service/api.service';
import { StorageService } from 'app/shared/service/storage.service';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    public apiService: ApiService,
    private cookieService: StorageService,
    private http: HttpClient
  ) { }
  
  login(body: any){
    return this.apiService.post('Admin/login', body);
  }

  loginSuccess(data){
    this.cookieService.clearCookie();
    this.cookieService.setCookie(environment.tokenAdmin, data.token);
    this.cookieService.setCookie(environment.idAdmin, data.id);
    this.cookieService.setCookie(environment.admin, JSON.stringify(data));
  }

  logout(){
    this.cookieService.deleteCookie(environment.tokenAdmin);
    this.cookieService.deleteCookie(environment.idAdmin);
    this.cookieService.deleteCookie(environment.admin);
  }

  getListOrder(search, trangThaiId){
    console.log(search, trangThaiId);
    let url = '';
    url += (search || trangThaiId) ? '?' : '';
    url += search ? `search=${search}` : '';
    url += trangThaiId ? (search ? `&trangThaiId=${trangThaiId}` : `trangThaiId=${trangThaiId}`) : '';

    return this.apiService.get(`Admin/tat-ca-don-hang${url}`);
  }

  getOrderById(id){
    return this.apiService.get(`DonHang/${id}`);
  }
  getDetailOrderByOrderId(orderId){
    return this.apiService.get(`Donhang/chitietdonhang/${orderId}`);
  }
  getDetailCustomerByCusId(khId){
    return this.apiService.get(`Khachhang/${khId}`);
  }
  getDetailShipperByCusId(id){
    return this.apiService.get(`Shipper/${id}`);
  }
  getReasonOrderByOrderId(orderId){
    return this.apiService.get(`Donhang/lydohoanhang/${orderId}`);
  }
  getListStatus(){
    return this.apiService.get('Admin/tat-ca-trang-thai');
  }
  approveOrder(orderId){
    let adminId = this.cookieService.getCookie(environment.idAdmin);
    return this.apiService.post(`Admin/duyet-don-hang?donHangId=${orderId}&adminId=${adminId}`,{});
  }
  refundOrder(orderId){
    let adminId = this.cookieService.getCookie(environment.idAdmin);
    return this.apiService.post(`Admin/xac-nhan-hoan-hang?donHangId=${orderId}&adminId=${adminId}`,{});
  }
  deleteOrder(orderId){
    return this.apiService.delete(`DonHang/${orderId}`);
  }

  chargeOrder(orderId){
    return this.apiService.post(`Admin/xac-nhan-phi/${orderId}`, {});
  }

  getListShipper(search = ''){
    return this.apiService.get(`Admin/danh-sach-shipper?search=${search}`);
  }
  createShipper(body){
    return this.apiService.post(`Admin/create-shipper`, body);
  }
  updateShipper(body){
    return this.apiService.put(`Admin/update-shipper`, body);
  }
  deleteShipper(id){
    return this.apiService.delete(`Shipper/${id}`);
  }

  getListCustomer(search = ''){
    return this.apiService.get(`Admin/danh-sach-khach-hang?search=${search}`);
  }
  createCustomer(body){
    return this.apiService.post(`Admin/create-customer`, body);
  }
  updateCustomer(body){
    return this.apiService.put(`Admin/update-customer`, body);
  }
  deleteCustomer(id){
    return this.apiService.delete(`KhachHang/${id}`);
  }

  // profile
  updateProfile(body){
    return this.apiService.put(`Admin/update`, body);
  }
  changePassword(body){
    return this.apiService.put(`Admin/changepassword`, body);
  }

  //thong ke
  statistic(){
    return this.apiService.get(`Admin/thong-ke`);
  }
}

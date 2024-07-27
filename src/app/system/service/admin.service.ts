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
}

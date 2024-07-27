import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { StorageService } from 'app/shared/service/storage.service';
import { environment } from 'environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShipperGuard implements CanActivate, CanLoad {

  constructor(private cookieService: StorageService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const cookieValue = this.cookieService.getCookie(environment.tokenShipper);
      if (cookieValue) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const cookieValue = this.cookieService.getCookie(environment.tokenShipper);
      if (cookieValue) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
}

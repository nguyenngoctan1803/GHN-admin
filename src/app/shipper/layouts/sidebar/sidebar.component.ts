import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems: any[] = [
    {
      isTitle: true,
      title: 'Trang chủ',
      classTitle: 'nav-small-cap',
      icon: 'ti ti-dots nav-small-cap-icon fs-4',
      url: ''
    },
    {
      isTitle: false,
      title: 'Dashboard',
      classTitle: 'sidebar-item',
      icon: 'ti ti-layout-dashboard',
      url: '/system/dashboard'
    },
    {
      isTitle: true,
      title: 'Hệ thống',
      classTitle: 'nav-small-cap',
      icon: 'ti ti-dots nav-small-cap-icon fs-4',
      url: ''
    },
    {
      isTitle: false,
      title: 'Đơn hàng có thể nhận',
      classTitle: 'sidebar-item',
      icon: 'ti ti-article',
      url: '/shipper/order'
    },
    {
      isTitle: false,
      title: 'Đơn hàng đang thực hiện',
      classTitle: 'sidebar-item',
      icon: 'ti ti-loader',
      url: '/shipper/process'
    },
    {
      isTitle: false,
      title: 'Đơn hàng thành công',
      classTitle: 'sidebar-item',
      icon: 'ti ti-checklist',
      url: '/shipper/success'
    },
    {
      isTitle: false,
      title: 'Đơn hàng bị hoàn trả',
      classTitle: 'sidebar-item',
      icon: 'ti ti-refresh',
      url: '/shipper/refund'
    }
  ]
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  isSelected(url: string): boolean {
    return this.router.url === url;
  }
}

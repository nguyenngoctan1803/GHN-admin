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
      title: 'Đơn hàng',
      classTitle: 'sidebar-item',
      icon: 'ti ti-article',
      url: '/system/order'
    },
    {
      isTitle: false,
      title: 'Shipper',
      classTitle: 'sidebar-item',
      icon: 'ti ti-bike',
      url: '/system/shipper'
    },
    {
      isTitle: false,
      title: 'Khách hàng',
      classTitle: 'sidebar-item',
      icon: 'ti ti-users',
      url: '/system/customer'
    }
  ]
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  isSelected(url: string): boolean {
    return this.router.url === url;
  }
}

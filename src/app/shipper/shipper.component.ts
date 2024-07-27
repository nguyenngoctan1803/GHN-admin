import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.scss']
})
export class ShipperComponent implements OnInit {

  constructor(
    private titleService:Title
  ) {
    this.titleService.setTitle("Shipper - Dịch vụ giao hàng nhanh");
  }

  ngOnInit(): void {
  }

}

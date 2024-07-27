import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  constructor(
    private titleService:Title
  ) {
    this.titleService.setTitle("Admin - Dịch vụ giao hàng nhanh");
   }

  ngOnInit(): void {
    
  }

}

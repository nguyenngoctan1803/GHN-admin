import { Component, OnInit } from '@angular/core';
import { ShipperService } from 'app/shipper/service/shipper.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: any;
  constructor(
    private shipperService: ShipperService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  // Init Data
  loadData(search = '') {
    this.shipperService.statistic().subscribe(
      response => {
        this.data = response;
      },
      error => {
        this.data = {};
        this.toastr.error('Thống kê thất bại', 'Thông báo');
        console.error('There was an error!', error);
      }
    )
  }
}

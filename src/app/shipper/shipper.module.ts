import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipperRoutingModule } from './shipper-routing.module';
import { ShipperComponent } from './shipper.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelect2Module } from 'ng-select2';
import { NgxPaginationModule } from 'ngx-pagination';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { OrderComponent } from './page/order/order.component';
import { ApproveModalComponent } from './page/order/approve-modal/approve-modal.component';
import { ProcessComponent } from './page/process/process.component';
import { DoneModalComponent } from './page/process/done-modal/done-modal.component';
import { RefundModalComponent } from './page/process/refund-modal/refund-modal.component';


@NgModule({
  declarations: [
    ShipperComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    OrderComponent,
    ApproveModalComponent,
    ProcessComponent,
    DoneModalComponent,
    RefundModalComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelect2Module,
    NgxPaginationModule,
    PerfectScrollbarModule,
    ShipperRoutingModule
  ]
})
export class ShipperModule { }

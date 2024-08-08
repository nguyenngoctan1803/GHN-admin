import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { ShipperRoutingModule } from './shipper-routing.module';
import { ShipperComponent } from './shipper.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelect2Module } from 'ng-select2';
import { NgxPaginationModule } from 'ngx-pagination';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { OrderComponent } from './page/order/order.component';
import { ApproveModalComponent } from './page/order/approve-modal/approve-modal.component';
import { ProcessComponent } from './page/process/process.component';
import { DoneModalComponent } from './page/process/done-modal/done-modal.component';
import { RefundModalComponent } from './page/process/refund-modal/refund-modal.component';
import { DetailModalComponent } from './page/order/detail-modal/detail-modal.component';
import { DetailProcessModalComponent } from './page/process/detail-modal/detail-modal.component';
import { ProfileComponent } from './page/profile/profile.component';
import { EditProfileComponent } from './page/profile/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './page/profile/change-password/change-password.component';
import { SuccessOrderComponent } from './page/success-order/success-order.component';
import { DetailSuccessModalComponent } from './page/success-order/detail-success-modal/detail-success-modal.component';
import { RefundOrderComponent } from './page/refund-order/refund-order.component';
import { DetailRefundModalComponent } from './page/refund-order/detail-refund-modal/detail-refund-modal.component';
import {  CustomCurrencyPipe } from 'app/shared/service/currency.pipe';
import { PipeModule } from 'app/shared/module/pipe/pipe.module';
import { ChargeModalComponent } from './page/success-order/charge-modal/charge-modal.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

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
    DetailModalComponent,
    DetailProcessModalComponent,
    ProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    SuccessOrderComponent,
    DetailSuccessModalComponent,
    RefundOrderComponent,
    DetailRefundModalComponent,
    ChargeModalComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelect2Module,
    NgxPaginationModule,
    PerfectScrollbarModule,
    PipeModule,
    ShipperRoutingModule,
  ],
  providers:[
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
  ]
})
export class ShipperModule { }

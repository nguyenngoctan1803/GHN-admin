import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { OrderComponent } from './page/order/order.component';
import { NgSelect2Module } from 'ng-select2';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ApproveModalComponent } from './page/order/approve-modal/approve-modal.component';
import { RefundModalComponent } from './page/order/refund-modal/refund-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailModalComponent } from './page/order/detail-modal/detail-modal.component';
import { DeleteModalComponent } from './page/order/delete-modal/delete-modal.component';
import { ShipperComponent } from './page/shipper/shipper.component';
import { UpdateShipperModalComponent } from './page/shipper/update-shipper-modal/update-shipper-modal.component';
import { DeleteShipperModalComponent } from './page/shipper/delete-shipper-modal/delete-shipper-modal.component';
import { CustomerComponent } from './page/customer/customer.component';
import { UpdateCustomerModalComponent } from './page/customer/update-customer-modal/update-customer-modal.component';
import { DeleteCustomerModalComponent } from './page/customer/delete-customer-modal/delete-customer-modal.component';
import { ProfileComponent } from './page/profile/profile.component';
import { EditProfileComponent } from './page/profile/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './page/profile/change-password/change-password.component';
import {  CustomCurrencyPipe } from 'app/shared/service/currency.pipe';
import { PipeModule } from 'app/shared/module/pipe/pipe.module';
import { ConfirmChargeModalComponent } from './page/order/confirm-charge-modal/confirm-charge-modal.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [
    SystemComponent,
    SidebarComponent,
    NavbarComponent,
    DashboardComponent,
    OrderComponent,
    ApproveModalComponent,
    RefundModalComponent,
    DetailModalComponent,
    DeleteModalComponent,
    ShipperComponent,
    UpdateShipperModalComponent,
    DeleteShipperModalComponent,
    CustomerComponent,
    UpdateCustomerModalComponent,
    DeleteCustomerModalComponent,
    ProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    ConfirmChargeModalComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelect2Module,
    NgxPaginationModule,
    PerfectScrollbarModule,
    PipeModule,
    SystemRoutingModule
  ],
  providers:[
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
  ]
})
export class SystemModule { }

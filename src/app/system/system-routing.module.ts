import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './system.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { OrderComponent } from './page/order/order.component';
import { ShipperComponent } from './page/shipper/shipper.component';
import { CustomerComponent } from './page/customer/customer.component';
import { ProfileComponent } from './page/profile/profile.component';

const routes: Routes = [
  { path: "", children:[
    { path: "", redirectTo: "dashboard", pathMatch: "full" },
    { path: "dashboard", component: DashboardComponent },
    { path: "order", component: OrderComponent },
    { path: "shipper", component: ShipperComponent },
    { path: "customer", component: CustomerComponent },
    { path: "profile", component: ProfileComponent },
  ], component: SystemComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }

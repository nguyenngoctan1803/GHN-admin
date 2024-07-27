import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipperComponent } from './shipper.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { OrderComponent } from './page/order/order.component';
import { ProcessComponent } from './page/process/process.component';

const routes: Routes = [
  { path: "", children:[
    { path: "", redirectTo: "dashboard", pathMatch: "full" },
    { path: "dashboard", component: DashboardComponent },
    { path: "order", component: OrderComponent },
    { path: "process", component: ProcessComponent },
  ], component: ShipperComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipperRoutingModule { }

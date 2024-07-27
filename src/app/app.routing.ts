import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './page/signin/signin.component';
import { AdminGuard } from './system/guard/admin.guard';
import { ShipperGuard } from './shipper/guard/shipper.guard';
import { NotfoundComponent } from'./page/notfound/notfound.component';

const routes: Routes =[
    { path: '', redirectTo: 'system', pathMatch: 'full' },
    { path: 'system', loadChildren: () => import('./system/system.module').then(m => m.SystemModule), canLoad: [AdminGuard] },
    { path: 'shipper', loadChildren: () => import('./shipper/shipper.module').then(m => m.ShipperModule), canLoad: [ShipperGuard] },
    { path: 'login', component: SigninComponent },
    { path: '**', redirectTo: 'notfound' },
    { path: 'notfound', component: NotfoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './Components/home/home.component';
import {AuthGuard} from './guards/auth.guard';
import {ProfileComponent} from './Components/profile/profile.component';

const routes: Routes = [
  {path: '' , component: HomeComponent, canActivate: [AuthGuard] , data: {roles: ['USER']}},
  {path: 'Profile' , component: ProfileComponent, canActivate: [AuthGuard] , data: {roles: ['USER']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

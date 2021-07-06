import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './Components/home/home.component';
import {AuthGuard} from './guards/auth.guard';
import {ProfileComponent} from './Components/profile/profile.component';
import {AllByUserComponent} from './Components/Mission/all-by-user/all-by-user.component';
import {AllCandidaturesByUserComponent} from './Components/Mission/all-candidatures-by-user/all-candidatures-by-user.component';
import {ChatComponent} from './Components/chat/chat.component';

const routes: Routes = [
  {path: '' , component: HomeComponent, canActivate: [AuthGuard] , data: {roles: ['USER']}},
  {path: 'Profile' , component: ProfileComponent, canActivate: [AuthGuard] , data: {roles: ['USER']}},
  {path: 'MyMission' , component: AllByUserComponent, canActivate: [AuthGuard] , data: {roles: ['USER']}},
  {path: 'MyCandidatures' , component: AllCandidaturesByUserComponent, canActivate: [AuthGuard] , data: {roles: ['USER']}},
  {path: 'Chat' , component: ChatComponent, canActivate: [AuthGuard] , data: {roles: ['USER']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

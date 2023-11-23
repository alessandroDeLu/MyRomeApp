import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSignComponent } from './user-sign/user-sign.component';
import { HomeComponent } from './home/home.component';
import { EatAndDrinkComponent } from './home/eat-and-drink/eat-and-drink.component';
import { PartyAndFunComponent } from './home/party-and-fun/party-and-fun.component';
import { MyProfileComponent } from './home/navbar/my-profile/my-profile.component';

const routes: Routes = [
  { path: '' , component: UserSignComponent },
  { path: 'login' , component: UserSignComponent },
  { path: 'log' , component: UserSignComponent },
  { path: 'home' , component: HomeComponent },
  { path: 'home/MangiareBere' , component: EatAndDrinkComponent },
  { path: 'home/PartyAttivita' , component: PartyAndFunComponent },
  { path: 'home/myProfile' , component: MyProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

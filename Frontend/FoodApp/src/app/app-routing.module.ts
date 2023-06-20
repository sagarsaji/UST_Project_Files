import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddtocartComponent } from './addtocart/addtocart.component';
import { AddkitchenstaffComponent } from './admin-dashboard/addkitchenstaff/addkitchenstaff.component';
import { AddmenuComponent } from './admin-dashboard/addmenu/addmenu.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminloginComponent } from './admin-dashboard/adminlogin/adminlogin.component';
import { CreateComponent } from './admin-dashboard/create/create.component';
import { ListComponent } from './admin-dashboard/list/list.component';
import { MenuupdateComponent } from './admin-dashboard/menuupdate/menuupdate.component';
import { SpecificmenuComponent } from './admin-dashboard/specificmenu/specificmenu.component';
import { UpdateComponent } from './admin-dashboard/update/update.component';
import { KitchenstaffDashboardComponent } from './kitchenstaff-dashboard/kitchenstaff-dashboard.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { SignupComponent } from './signup/signup.component';
import { MenuuserComponent } from './user-dashboard/menuuser/menuuser.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserpageComponent } from './user-dashboard/userpage/userpage.component';



const routes: Routes = [
  {path:'',component:UserDashboardComponent},
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'admin', component: AdminDashboardComponent},
  {path:'user', component: UserpageComponent},
  {path:'kitchen', component: KitchenstaffDashboardComponent},
  {path:'create',component:CreateComponent},
  {path:'product',component:ListComponent},
  {path:'about',component:AboutComponent},
  {path:'addmenu',component:AddmenuComponent},
  {path:'menu',component:MenuComponent},
  {path:'viewmenu/:restname',component:SpecificmenuComponent},
  {path:'addtocart',component:AddtocartComponent},
  {path:'update/:id',component:UpdateComponent},
  {path:'addkitchenstaff',component:AddkitchenstaffComponent},
  {path:`menuupdate/:mid`,component:MenuupdateComponent},
  {path:`admin/login`,component:AdminloginComponent},
  {path:`viewmenuuser/:restname`,component:MenuuserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

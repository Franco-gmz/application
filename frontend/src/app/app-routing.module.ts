import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './views/account/account.component';
import { ContactComponent } from './views/contact/contact.component';
import { HomeComponent } from './views/home/home.component';
import { ProductsComponent } from './views/products/products.component';

const routes: Routes = [

  {path:'inicio', component:HomeComponent},
  {path:'productos', component:ProductsComponent},
  {path:'contacto',component:ContactComponent},
  {path:'cuenta', component:AccountComponent},
  {path:'profile',component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

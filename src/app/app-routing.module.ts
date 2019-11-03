import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateComponent } from './update/update.component';
import { ListCientistsComponent } from './list-cientists/list-cientists.component';
import { AuthGuard } from './auth.guard';
import { DetailsComponent } from './details/details.component';
import { UpdatePremiumComponent } from './update-premium/update-premium.component';
import { AddGlossaryComponent } from './add-glossary/add-glossary.component';
import { GlossaryComponent } from './glossary/glossary.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'register-success', component: RegisterSuccessComponent},
  {path: 'update', component: UpdateComponent, canActivate: [AuthGuard]},
  {path: 'details', component: DetailsComponent, canActivate: [AuthGuard]},
  {path: 'cientists', component: ListCientistsComponent, canActivate: [AuthGuard]},
  {path: 'premium', component: UpdatePremiumComponent, canActivate: [AuthGuard]},
  {path: 'glossary', component: GlossaryComponent, canActivate: [AuthGuard]},
  {path: 'add', component: AddGlossaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

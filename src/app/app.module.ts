import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { ProfileComponent } from './profile/profile.component';
import { ListCientistsComponent } from './list-cientists/list-cientists.component';
import { UpdateComponent } from './update/update.component';
import { DetailsComponent } from './details/details.component';
import { UpdatePremiumComponent } from './update-premium/update-premium.component';
import { MembersRecommendedComponent } from './members-recommended/members-recommended.component';
import { GlossaryComponent } from './glossary/glossary.component';
import { AddGlossaryComponent } from './add-glossary/add-glossary.component';
import { UpdateSuccessComponent } from './update-success/update-success.component';
import { GlossarySuccessComponent } from './glossary-success/glossary-success.component';
import { DesrecomendacaoComponent } from './desrecomendacao/desrecomendacao.component';
import { ListaAmigosComponent } from './lista-amigos/lista-amigos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MenuComponent,
    RegisterSuccessComponent,
    ProfileComponent,
    ListCientistsComponent,
    UpdateComponent,
    DetailsComponent,
    UpdatePremiumComponent,
    MembersRecommendedComponent,
    GlossaryComponent,
    AddGlossaryComponent,
    UpdateSuccessComponent,
    GlossarySuccessComponent,
    DesrecomendacaoComponent,
    ListaAmigosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

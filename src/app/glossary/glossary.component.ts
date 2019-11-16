import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../model/pessoa';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.css']
})
export class GlossaryComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();
  glossarios = [];
  selecionados = [];
  interesses = [];
  submitted = false;

  constructor(
    private authService: AuthService,
    private service: ServiceService,
    private router: Router) {    
    this.service.getCientist(localStorage.getItem("email")).subscribe(
      data => {
        this.interesses = data.interesse.split(",");        
      }
    );
    this.service.listaGlossary().subscribe(
      data => {      
        for (let i = 0; i < data.length; i++) {   
          var contem = 0;        
          for (let j = 0; j < this.interesses.length; j++) {               
            if (data[i] == this.interesses[j]) {
              contem = contem + 1;
            }
          }
          if(contem == 0){
            this.glossarios.push(data[i].nome);
          }
        }        
      }
    );
  }
  
  ngOnInit() {
    this.search();
  }

  search(){
    let email = localStorage.getItem("email");
    this.service.getCientist(email).subscribe(
      data => {
        this.pessoa = data;
      }
    );
  }

  onUnchangeCategory(event, g: any){
    if(event.target.checked){
      this.selecionados.push(g);
    }
  }

  onChangeCategory(event, g: any){
    if(event){
      this.selecionados.push(g);
    }
  }

  submit(pessoa: Pessoa){
    pessoa.interesse = this.selecionados.toString();
    this.service.atualizarPerfil(pessoa).subscribe();
    this.submitted = true;    
  }
  
  logout() {
    this.authService.logout();
  }
}

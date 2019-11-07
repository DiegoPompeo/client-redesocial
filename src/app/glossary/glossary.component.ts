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

  pessoa: Pessoa;
  glossarios = [];
  selecionados = [];
  submitted = false;

  constructor(
    private authService: AuthService,
    private service: ServiceService,
    private router: Router) {
    this.service.listaGlossary().subscribe(
      data => {
        data.forEach(x => {
          this.glossarios.push(x.nome);
        })
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
    )
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

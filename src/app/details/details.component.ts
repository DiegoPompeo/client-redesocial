import { Component, OnInit, Input } from '@angular/core';
import { Pessoa, Post, PessoaRecomendada, Amizade } from '../model/pessoa';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  pessoa: Pessoa;
  cientistas: Pessoa[];
  post: Post;
  posts: Post[];
  interesses: any;
  pessoaRecomendada: PessoaRecomendada;
  listaRecomendadas: PessoaRecomendada[];
  emailLogado: string;
  auth: boolean = false; 
  desabilitaSolicitacao = false; 
  desabilita: boolean;

  amizade: Amizade = new Amizade();

  constructor(
    private authService: AuthService,
    private service: ServiceService) {
  }

  Detalhe(){
    let email = localStorage.getItem("det_email");
    this.service.getCientist(email).subscribe(
      data => {
        this.pessoa = data;
        this.interesses = data.interesse.split(",");
        console.log(data.interesse.split(","));
      }
    )
  }

  solicitarAmizade(){
    this.amizade.emailMandatario = localStorage.getItem("email");
    this.amizade.emailRemetente = localStorage.getItem("det_email");
    this.amizade.aceite = false;
    this.amizade.recusado = false;
    this.amizade.solicitado = true;
    this.desabilitaSolicitacao = this.amizade.solicitado;

    this.service.solicitaAmizade(this.amizade).subscribe(data => {this.amizade = data});
  }

  recomendar(pessoa: Pessoa){
    pessoa.curtidas++;    
    this.service.atualizarPerfil(pessoa).subscribe(
      data => {
        this.pessoa = data;        
      }
    );
    this.service.addRecomendacao(this.pessoaRecomendada).subscribe(data => {
    });
  }

  ngOnInit() {
    this.Detalhe();
    this.searchPosts();
  }

  searchPosts() {
    this.service.verPost(localStorage.getItem("det_email")).subscribe(data => {
      this.posts = data;  
    });
  }

  logout() {
    this.authService.logout();
  }
}

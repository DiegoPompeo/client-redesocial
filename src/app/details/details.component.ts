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
  recomendou = false;
  curtidas: string;

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

  recomendar(){
    let curtidas_string = localStorage.getItem("curtidas");
    let curtidas_numero = (+curtidas_string);
    curtidas_numero++;
    localStorage.setItem("curtidas",curtidas_numero.toString());
    this.curtidas = localStorage.getItem("curtidas");
    this.recomendou = true;
    this.ngOnInit();
  }

  desrecomendar(){
    let curtidas_string = localStorage.getItem("curtidas");
    let curtidas_numero = (+curtidas_string);
    curtidas_numero--;
    localStorage.setItem("curtidas",curtidas_numero.toString());
    this.curtidas = localStorage.getItem("curtidas");
    this.recomendou = false;
    this.ngOnInit();
  }

  curtir(){

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
 
  verificaSolicitacao(){
    this.service.listaAmizade().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].emailRemetente == localStorage.getItem("det_email") 
          && data[i].emailMandatario == localStorage.getItem("email")
          && (data[i].solicitado == true || data[i].aceite == true || data[i].recusado == true)) {
            this.desabilitaSolicitacao = true;
          }          
        }
      }
    )
  }
 
  ngOnInit() {
    this.Detalhe();
    this.searchPosts();
    this.listaRecomendada();
    this.verificaSolicitacao();
 
    this.emailLogado = localStorage.getItem("email");
    if (!(this.emailLogado == localStorage.getItem("det_email"))) {
      this.auth = true;
    }
  }
 
  searchPosts() {
    this.service.verPost(localStorage.getItem("det_email")).subscribe(data => {
      this.posts = data.reverse();  
    });
  }
 
  listaRecomendada(){
    this.service.listaRecomendacao().subscribe(data => {
      this.listaRecomendadas = data;
      for (let i = 0; i < this.listaRecomendadas.length; i++) {
        if(this.listaRecomendadas[i].emailRecomendada ==  localStorage.getItem('email')
          && this.listaRecomendadas[i].emailRecomendou == localStorage.getItem("det_email")){
            this.desabilita = true;
        }        
      }
    });
  }
 
  logout() {
    this.authService.logout();
  }

}

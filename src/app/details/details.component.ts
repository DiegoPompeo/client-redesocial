import { Component, OnInit, Input } from '@angular/core';
import { Pessoa, Post, PessoaRecomendada } from '../model/pessoa';
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

  registerForm: FormGroup;
  pessoa: Pessoa;
  cientistas: Pessoa[];
  post: Post;
  posts: Post[];
  pessoaRecomendada: PessoaRecomendada;
  listaRecomendadas: PessoaRecomendada[];
  areas: any;
  emailLogado: string;
  auth: boolean = false;  
  desabilita: boolean;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private service: ServiceService,
    private router: Router) {
  }

  Detalhe(){
    let id = localStorage.getItem("det_id");
    this.service.verPerfil(+id).subscribe(
      data => {
        this.pessoa = data; 
        this.areas = data.qualidades.split(",");   
      }
    )
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
    this.listaRecomendada();

    this.emailLogado = localStorage.getItem('email');
    if (!(this.emailLogado == localStorage.getItem("det_email"))) {
      this.auth = true;
    }
  }

  searchPosts() {
    this.service.verPost(localStorage.getItem("det_email")).subscribe(data => {
      this.posts = data;  
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

import { Component, OnInit, Input, Output } from '@angular/core';
import { Pessoa, Post } from '../model/pessoa';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  registerForm: FormGroup;
  cientist: Pessoa = new Pessoa();
  pessoa: Pessoa = new Pessoa();
  cientistas: Pessoa[];
  post: Post;
  posts: Post[];
  atualiza = false;
  solicita: Pessoa[] = new Array<Pessoa>();
  mandatario: Pessoa = new Pessoa();  
  interesses: any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private service: ServiceService,
    private router: Router) {
    this.registerForm = this.formBuilder.group({
      conteudo: '',
      email: ''
    });
    this.post = {
      id: null,
      conteudo: '',
      email: '',
      curtidas: 0
    }
  }

  listaSolicitacao(){
    this.service.listaAmizade().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].emailRemetente == localStorage.getItem("email")
          && (data[i].aceite == false && data[i].recusado == false) && data[i].solicitado == true) {
            this.service.getCientist(data[i].emailMandatario).subscribe(
              x => {
                this.mandatario = x;
                this.solicita.push(this.mandatario);
              }
            )
          }          
        }
      }
    );
  }
 
  aceita(p: Pessoa){
    this.service.listaAmizade().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].aceite == false && data[i].recusado == false 
            && data[i].emailMandatario == p.email && data[i].emailRemetente == localStorage.getItem("email")
            && data[i].solicitado == true) {
            data[i].aceite = true;
            this.service.atualizaSolicitacao(data[i]).subscribe(data => {});
            this.solicita.splice(i);
          }
        }
      }
    );
  }
  
  recusa(p: Pessoa){
    this.service.listaAmizade().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].aceite == false 
            && data[i].recusado == false 
            && data[i].emailMandatario == p.email 
            && data[i].emailRemetente == localStorage.getItem("email")
            && data[i].solicitado == true) {
            data[i].recusado = true;
            this.solicita.splice(i);
            this.service.atualizaSolicitacao(data[i]).subscribe(data => {});            
          }
        }
      }
    );    
  }

  onSubmit() {
    this.post.conteudo = this.registerForm.get('conteudo').value;
    this.post.email = localStorage.getItem("email");    
    this.service.addPost(this.post).subscribe(data => { 
    });      
    this.atualiza = true;  
    this.registerForm.get('conteudo').setValue("");
  }

  msgAtualizaFeed(){
    this.ngOnInit();
    this.atualiza = false;
  }

  ngOnInit() {
    this.searchProfile();
    this.searchPosts();
    this.listaSolicitacao();
  }

  searchPosts() {
    this.service.verPost(localStorage.getItem("email"))
    .subscribe(data => {
      this.posts = data.reverse();
    });
  }

  searchProfile() {
    let email =localStorage.getItem("email")
    this.service.getCientist(email)
      .subscribe(data => {
        let str = data.dataNascimento.toString();
        let array = str.split("-");
        let final = array[2] + "/" + array[1] + "/" + array[0];
        this.pessoa.dataNascimento = final.toString();

        let str2 = data.inicioDaAtividade.toString();
        let array2 = str2.split("-");
        let final2 = array2[2] + "/" + array2[1] + "/" + array2[0];
        this.pessoa.inicioDaAtividade = data.inicioDaAtividade.toString();

        this.cientist = data;
        localStorage.setItem("profile_email", data.email);        
        this.interesses = data.interesse.split(",");
      });
  }

  gotoUpdate(cientist: Pessoa) {
    localStorage.setItem("id", cientist.id.toString());
    this.router.navigate(['update']);
  }

  logout() {
    this.authService.logout();
  }
}

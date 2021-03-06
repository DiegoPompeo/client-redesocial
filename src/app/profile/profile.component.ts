import { Component, OnInit, Input, Output } from '@angular/core';
import { Pessoa, Post, Amizade } from '../model/pessoa';
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
  atualizaAmigos = false;
  solicita: Pessoa[] = new Array<Pessoa>();
  mandatario: Pessoa = new Pessoa();  
  interesses: any;
  verifica = false;
  listaAmigos: Pessoa[] = new Array<Pessoa>();
  amizadeAux: Amizade = new Amizade();

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
      codPost: '',
      curtidas: 0
    }
  }
  
  ngOnInit() {
    this.searchProfile();
    this.searchPosts();
    this.listaSolicitacao();
  }

  gotoDetails(cientist: Pessoa){
    localStorage.setItem("det_email", cientist.email);
    this.router.navigate(['details']);
  }  

  gotoAmigos(){    
    this.router.navigate(['amigos']);
  }

  aceita(p: Pessoa){
    this.service.listaAmizade().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].aceite == false 
            && data[i].recusado == false 
            && data[i].emailMandatario == p.email 
            && data[i].emailRemetente == localStorage.getItem("email")
            && data[i].solicitado == true) {
            this.amizadeAux = data[i];
            
            this.service.aceitaSolicitacao(this.amizadeAux).subscribe(data => {}); 
          }
        }
      }
    );
    let numero = this.solicita.indexOf(p);
    this.solicita.splice(numero);
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
            this.amizadeAux = data[i];
            
            this.service.recusaSolicitacao(this.amizadeAux).subscribe(data => {});                      
          }
        }
      }
    ); 
    let numero = this.solicita.indexOf(p);
    this.solicita.splice(numero);
  }

  listaSolicitacao(){
    this.service.listaAmizade().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].emailRemetente == localStorage.getItem("email")
          && data[i].solicitado == true) {
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
        this.pessoa.inicioDaAtividade = final2.toString();

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

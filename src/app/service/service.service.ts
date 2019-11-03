import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa, PessoaLogin, Post, PessoaRecomendada, Glossario } from '../model/pessoa';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url = 'https://server-redesocial.herokuapp.com/redesocial'

  constructor(private http: HttpClient) { }

  //Read
  listar() {
    return this.http.get<Pessoa[]>(this.url);
  }

  //ReadById
  verPerfil(id: number) {
    return this.http.get<Pessoa>(this.url + "/" + id);
  }

  //Update
  atualizarPerfil(pessoa: Pessoa) {
    return this.http.put<Pessoa>(this.url + "/editar/" + pessoa.email, pessoa);
  }

  //ReadByEmail
  getCientist(email: string){
    return this.http.get<Pessoa>(this.url + "/buscar/" + email);
  }

  //AddPost
  addPost(post: Post){
    return this.http.post<Post>(this.url + "/addPost", post);
  }

  //ReadPostByEmail
  verPost(email: string){
    return this.http.get<Post[]>(this.url+ "/verPost/" + email);
  }

  //AddRecomendacao
  addRecomendacao(pessoaRecomendada: PessoaRecomendada){
    return this.http.post<PessoaRecomendada>(this.url + "/addRecomendacao", pessoaRecomendada);
  }

  //ListRecomendacao
  listaRecomendacao(){
    return this.http.get<PessoaRecomendada[]>(this.url + "/getRecomendacao");
  }

  //AddGlossary
  addGlossary(glossario: Glossario){
    return this.http.post<Glossario>(this.url + "/addGlossario", glossario);
  }

  //ListGlossary
  listaGlossary(){
    return this.http.get<Glossario[]>(this.url + "/glossario");
  }
  
}

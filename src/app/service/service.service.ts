import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pessoa, PessoaLogin, Post, PessoaRecomendada, Glossario, Amizade } from '../model/pessoa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url: string = 'https://server-redesocial.herokuapp.com/redesocial';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers':
        'Access-Control-Allow-Headers, Authorization,  Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    })
  }

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
  atualizarPerfil(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(this.url + "/editar/" + pessoa.email, pessoa, this.httpOptions);
  }

  //ReadByEmail
  getCientist(email: string){
    return this.http.get<Pessoa>(this.url + "/buscar/" + email);
  }

  //AddPost
  addPost(post: Post): Observable<Post>{
    return this.http.post<Post>(this.url + "/addPost", post, this.httpOptions);
  }

  //AtualizaPost
  atualizaPost(post: Post): Observable<Post>{
    return this.http.put<Post>(this.url + "/atualizaPost/" + post.codPost, post, this.httpOptions);
  }

  //ReadPostByEmail
  verPost(email: string){
    return this.http.get<Post[]>(this.url+ "/verPost/" + email);
  }

  //AddRecomendacao
  addRecomendacao(pessoaRecomendada: PessoaRecomendada): Observable<PessoaRecomendada>{
    return this.http.post<PessoaRecomendada>(this.url + "/addRecomendacao", pessoaRecomendada, this.httpOptions);
  }

  //EditRecomendacao
  recomenda(pessoaRecomendada: PessoaRecomendada): Observable<PessoaRecomendada>{
    return this.http.put<PessoaRecomendada>(this.url + "/recomendou/" + 
    pessoaRecomendada.emailRecomendou + "/" + pessoaRecomendada.emailRecomendada, 
    pessoaRecomendada, this.httpOptions);
  }

  //EditRecomendacao
  desrecomenda(pessoaRecomendada: PessoaRecomendada): Observable<PessoaRecomendada>{
    return this.http.put<PessoaRecomendada>(this.url + "/desrecomendou/" + 
    pessoaRecomendada.emailRecomendou + "/" + pessoaRecomendada.emailRecomendada, 
    pessoaRecomendada, this.httpOptions);
  }

  //ListRecomendacao
  listaRecomendacao(){
    return this.http.get<PessoaRecomendada[]>(this.url + "/getRecomendacao");
  }

  //AddGlossary
  addGlossary(glossario: Glossario){
    return this.http.post<Glossario>(this.url + "/addGlossario", glossario, this.httpOptions);
  }

  //ListGlossary
  listaGlossary(){
    return this.http.get<Glossario[]>(this.url + "/glossario");
  }

   
  //SolicitaAmizade
  solicitaAmizade(amizade: Amizade): Observable<Amizade> {
    return this.http.post<Amizade>(this.url + "/amizade", amizade, this.httpOptions);
  }
 
  //ListarAmizade
  listaAmizade(){
    return this.http.get<Amizade[]>(this.url + "/listaAmizade")
  }
 
  //AceitaSolicitacao
  aceitaSolicitacao(amizade: Amizade): Observable<Amizade>{
    return this.http.put<Amizade>(this.url + "/respostaSolicitacao/" 
    + amizade.emailMandatario + "/" + amizade.emailRemetente
    , amizade, this.httpOptions);
  }

  //RecusaSolicitacao
  recusaSolicitacao(amizade: Amizade): Observable<Amizade>{
    return this.http.put<Amizade>(this.url + "/respostaSolicitacao/" 
    + amizade.emailMandatario + "/" + amizade.emailRemetente
    , amizade, this.httpOptions);
  }
 
  //ReadByEmailMandatario
  findByEmailMandatario(email: string){
    return this.http.get<Amizade[]>(this.url + "/getAmizade/" + email)
  }

  
}

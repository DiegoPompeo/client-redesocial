import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa, PessoaLogin, Post, PessoaRecomendada, Glossario, Amizade } from '../model/pessoa';
import { Observable } from 'rxjs';
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
  atualizarPerfil(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(this.url + "/editar/" + pessoa.email, pessoa);
  }

  //ReadByEmail
  getCientist(email: string){
    return this.http.get<Pessoa>(this.url + "/buscar/" + email);
  }

  //AddPost
  addPost(post: Post): Observable<Post>{
    return this.http.post<Post>(this.url + "/addPost", post);
  }

  //ReadPostByEmail
  verPost(email: string){
    return this.http.get<Post[]>(this.url+ "/verPost/" + email);
  }

  //AddRecomendacao
  addRecomendacao(pessoaRecomendada: PessoaRecomendada): Observable<PessoaRecomendada>{
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

   
  //SolicitaAmizade
  solicitaAmizade(amizade: Amizade): Observable<Amizade> {
    return this.http.post<Amizade>(this.url + "/amizade", amizade);
  }
 
  //ListarAmizade
  listaAmizade(){
    return this.http.get<Amizade[]>(this.url + "/listaAmizade")
  }
 
  //AtualizaSolicitacao
  atualizaSolicitacao(amizade: Amizade): Observable<Amizade>{
    return this.http.put<Amizade>(this.url + "/respostaSolicitacao/" + amizade.emailMandatario, amizade);
  }
 
  //ReadByEmailMandatario
  findByEmailMandatario(email: string){
    return this.http.get<Amizade[]>(this.url + "/getAmizade/" + email)
  }

  
}

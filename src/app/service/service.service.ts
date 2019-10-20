import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa, PessoaLogin } from '../model/pessoa';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url = 'https://server-redesocial.herokuapp.com/redesocial/'

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
    return this.http.put<Pessoa>(this.url + "/" + pessoa.id, pessoa);
  }

  //ReadByEmail
  getCientist(email: string){
    return this.http.get<Pessoa>(this.url + "/buscar/" + email);
  }
}

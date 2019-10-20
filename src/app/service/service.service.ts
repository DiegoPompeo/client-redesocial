import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from '../model/pessoa';

@Injectable({
  providedIn: 'root'
})
export class ServiceService{

  constructor(private http: HttpClient) { }

  //Read
  listar() {
    return this.http.get<Pessoa[]>('https://server-redesocial.herokuapp.com/pessoas/');
  }

  //ReadById
  verPerfil(id: number) {
    return this.http.get<Pessoa>('https://server-redesocial.herokuapp.com/pessoas/' + id);
  }

  //Update
  atualizarPerfil(pessoa: Pessoa) {
    return this.http.put<Pessoa>('https://server-redesocial.herokuapp.com/pessoas/' + pessoa.id, pessoa);
  }

  //ReadByEmail
  getCientist(email: string){
    return this.http.get<Pessoa>('https://server-redesocial.herokuapp.com/pessoas/buscar/' + email);
  }
}

import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../model/pessoa';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-lista-amigos',
  templateUrl: './lista-amigos.component.html',
  styleUrls: ['./lista-amigos.component.css']
})
export class ListaAmigosComponent implements OnInit {

  cientist: Pessoa = new Pessoa();
  pessoa: Pessoa = new Pessoa();
  cientistas: Pessoa[];
  atualiza = false;
  atualizaAmigos = false;
  solicita: Pessoa[] = new Array<Pessoa>();
  mandatario: Pessoa = new Pessoa();  
  interesses: any;
  verifica = false;
  listaAmigos: Pessoa[] = new Array<Pessoa>();
  
  constructor(private service: ServiceService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.getAmigos();
  }

  gotoDetails(cientist: Pessoa){
    localStorage.setItem("det_email", cientist.email);
    this.router.navigate(['details']);
  }

  getAmigos(){
    this.service.listaAmizade().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].aceite == true) {
            if (data[i].emailMandatario == localStorage.getItem("email")
            && (data[i].aceite == true)) {
              this.service.getCientist(data[i].emailRemetente).subscribe(
                data => {
                  this.listaAmigos.push(data);
                }
              );
            } else if(data[i].emailRemetente == localStorage.getItem("email")
            && (data[i].aceite == true)){
              this.service.getCientist(data[i].emailMandatario).subscribe(
                data => {
                  this.listaAmigos.push(data);
                }
              );
            }
          }
        }
      }
    );
  }

  logout() {
    this.authService.logout();
  }

}

import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Pessoa } from '../model/pessoa';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  pessoa: Pessoa;
  submitted = false;

  constructor(private service: ServiceService, 
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.edit();
  }

  downgrade(pessoa: Pessoa){
    pessoa.paga = false;
    pessoa.codSeg = '';
    pessoa.dataValidade = '';
    pessoa.nomeNoCartao = '';
    pessoa.nroCartao = '';
    pessoa.curtir = pessoa.curtir - 150;
    this.service.atualizarPerfil(pessoa).subscribe(
      data => {
        this.pessoa = data;
      }
    );
  }

  Atualizar(pessoa: Pessoa){
    this.service.atualizarPerfil(pessoa).subscribe(
      data => {
        this.pessoa.dataNascimento = data.dataNascimento.toString();
        this.pessoa.inicioDaAtividade = data.inicioDaAtividade.toString();
        this.pessoa = data;
      }
    );
    this.submitted = true;
  }

  edit() {
    let email = localStorage.getItem("email");
    this.service.getCientist(email).subscribe(
      data => {
        this.pessoa = data;
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}

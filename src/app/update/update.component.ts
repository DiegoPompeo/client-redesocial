import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Pessoa } from '../model/pessoa';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  pessoa: Pessoa;
  msgSuccess = false;

  constructor(private service: ServiceService,
    private router: Router) { }

  ngOnInit() {
    this.edit();
  }

  downgrade(pessoa: Pessoa) {
    pessoa.paga = false;
    pessoa.codSeg = '';
    pessoa.dataValidade = '';
    pessoa.nomeNoCartao = '';
    pessoa.nroCartao = '';
    this.service.atualizarPerfil(pessoa).subscribe(
      data => {
        this.pessoa = data;
      }
    );
  }

  Atualizar(pessoa: Pessoa) {
    this.service.atualizarPerfil(pessoa).pipe(map(user => {
      JSON.stringify(user);
      return user;
    }));
    this.router.navigateByUrl("profile");
  }

  edit() {
    this.service.getCientist(localStorage.getItem("email"))
      .subscribe(data => {
        this.pessoa = data;
      });
  }
}

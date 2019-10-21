import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Pessoa } from '../model/pessoa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  pessoa: Pessoa;

  constructor(private service: ServiceService, 
    private router: Router) { }

  ngOnInit() {
    this.searchProfile();
  }

  downgrade(pessoa: Pessoa){
    pessoa.paga = false;
    pessoa.codSeg = '';
    pessoa.dataValidade = '';
    pessoa.nomeNoCartao = '';
    pessoa.nroCartao = '';
    this.service.atualizarPerfil(pessoa).subscribe(
      data => {
        this.pessoa = data;
        alert("Atualizado com sucesso!");
      }
    );
  }

  onSubmit(pessoa: Pessoa){
    this.service.atualizarPerfil(pessoa).subscribe(
      data => {
        this.pessoa = data;
      }
    );
  }

  searchProfile() {
    this.service.getCientist(localStorage.getItem("email"))
      .subscribe(data => {
        this.pessoa = data;
      });
  }
}

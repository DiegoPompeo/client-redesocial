import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Pessoa } from '../model/pessoa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-premium',
  templateUrl: './update-premium.component.html',
  styleUrls: ['./update-premium.component.css']
})
export class UpdatePremiumComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();

  constructor(private service: ServiceService,
    private router: Router) { }

  ngOnInit() {
    this.edit();
  }

  update(pessoa: Pessoa) {
    pessoa.paga = true;
    this.service.atualizarPerfil(pessoa).subscribe(
      data => {
        this.pessoa = data;
        this.router.navigate(['profile']);
      }
    );
  }

  Atualizar(pessoa: Pessoa) {
    this.service.atualizarPerfil(pessoa).subscribe(
      data => {
        this.pessoa = data;
        this.router.navigate(['profile']);
      }
    );
  }

  edit() {
    let email = localStorage.getItem("email");
    this.service.getCientist(email).subscribe(
      data => { this.pessoa = data }
    );
  }

}

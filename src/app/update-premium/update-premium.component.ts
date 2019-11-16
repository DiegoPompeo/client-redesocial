import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Pessoa } from '../model/pessoa';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-update-premium',
  templateUrl: './update-premium.component.html',
  styleUrls: ['./update-premium.component.css']
})
export class UpdatePremiumComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();

  constructor(private service: ServiceService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.edit();
  }

  update(pessoa: Pessoa) {
    pessoa.paga = true;
    this.service.atualizarPerfil(pessoa).subscribe(
      data => {
        this.pessoa = data;
      }
    );
  }

  Atualizar(pessoa: Pessoa) {
    this.service.atualizarPerfil(pessoa).subscribe(
      data => {
        this.pessoa = data;
      }
    );
  }

  edit() {
    let email = localStorage.getItem("email");
    this.service.getCientist(email).subscribe(
      data => { this.pessoa = data }
    );
  }
  
  logout() {
    this.authService.logout();
  }
}

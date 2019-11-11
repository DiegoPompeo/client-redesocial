import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';
import { Pessoa } from '../model/pessoa';

@Component({
  selector: 'app-list-cientists',
  templateUrl: './list-cientists.component.html',
  styleUrls: ['./list-cientists.component.css']
})
export class ListCientistsComponent implements OnInit {

  cientist: Pessoa;
  pessoa: Pessoa = new Pessoa();
  cientists: Pessoa[] = new Array<Pessoa>();

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.getPessoa();
  }

  listaRecomendado(){
    this.service.listar()
    .subscribe(
      data => {
        let qualidades = [];
        for (let i = 0; i < data.length; i++) {
          qualidades = data[i].interesse.split(",");
          for (let x = 0; x < qualidades.length; x++) {
            if (this.pessoa.interesse.indexOf(qualidades[x])) {
              this.cientists.push(data[i]);
            }
          }
        }
      }
    );
  }

  getPessoa(){
    this.service.getCientist(localStorage.getItem("email")).subscribe(data => {
      this.pessoa = data;
    });
  }

  gotoDetails(cientist: Pessoa){
    localStorage.setItem("det_email", cientist.email);
    this.router.navigate(['details']);
  }

}

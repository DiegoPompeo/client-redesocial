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
  mesmapessoa = false;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.listaRecomendado();
  }

  listaRecomendado(){
    this.service.listar()
    .subscribe(
      data => {
        this.cientists = data;        
      }
    );
  }

  gotoDetails(cientist: Pessoa){
    localStorage.setItem("det_email", cientist.email);
    this.router.navigate(['details']);
  }

}

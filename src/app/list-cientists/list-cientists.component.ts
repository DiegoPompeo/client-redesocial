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
  cientists: Pessoa[];

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.service.listar()
    .subscribe(
      data => {
        this.cientists = data;
      }
    );
  }

  gotoDetails(pessoa: Pessoa){
    localStorage.setItem("det_id", pessoa.id.toString());
    this.router.navigate(['details']);
  }

}

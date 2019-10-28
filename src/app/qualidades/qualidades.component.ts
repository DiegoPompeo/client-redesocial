import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Pessoa } from '../model/pessoa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qualidades',
  templateUrl: './qualidades.component.html',
  styleUrls: ['./qualidades.component.css']
})
export class QualidadesComponent implements OnInit {

  pessoa: Pessoa;
  
  constructor(private service: ServiceService, private router: Router) {
  }

  ngOnInit() {
    this.Detalhe();
  }

  Detalhe(){
    let id = localStorage.getItem("det_id");
    this.service.verPerfil(+id).subscribe(
      data => {
        this.pessoa = data;
      }
    )
  }

}

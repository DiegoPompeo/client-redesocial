import { Component, OnInit } from '@angular/core';
import { Glossario, Pessoa } from '../model/pessoa';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.css']
})
export class GlossaryComponent implements OnInit {

  pessoa: Pessoa;
  glossarios = [];
  selecionados = [];

  constructor(private service: ServiceService, private router: Router) {
    this.service.listaGlossary().subscribe(
      data => {
        data.forEach(x => {
          this.glossarios.push(x.nome);
        })
      }
    )
  }
  
  ngOnInit() {
    this.search();
  }

  search(){
    let email = localStorage.getItem("email");
    this.service.getCientist(email).subscribe(
      data => {
        this.pessoa = data;
      }
    )
  }

  onChangeCategory(event, o: any){
    this.selecionados.push(o);
  }

  submit(pessoa: Pessoa){
    pessoa.qualidades = this.selecionados.toString();
    this.service.atualizarPerfil(pessoa).subscribe(
      data => {
        this.pessoa = data;
        this.router.navigate(['profile']);
      }
    )
  }
}

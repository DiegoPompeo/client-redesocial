import { Component, OnInit, Input } from '@angular/core';
import { Pessoa } from '../model/pessoa';

@Component({
  selector: 'app-amigos-com',
  templateUrl: './amigos-com.component.html',
  styleUrls: ['./amigos-com.component.css']
})
export class AmigosComComponent implements OnInit {

  amigosEmComum: Pessoa[] = new Array<Pessoa>();

  @Input()
  listaAmigos: Pessoa[] = new Array<Pessoa>();

  @Input()
  listaAmigosDetails: Pessoa[] = new Array<Pessoa>();

  constructor() { }

  ngOnInit() {
    this.intersecao();
  }

  intersecao(){
    for (let i = 0; i < this.listaAmigos.length; i++) {
      for (let j = 0; j < this.listaAmigosDetails.length; j++) {
        if (this.listaAmigos[i].email == this.listaAmigosDetails[j].email) {
          this.amigosEmComum.push(this.listaAmigos[i]);
        }        
      }      
    }
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Pessoa } from '../model/pessoa';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  pessoa: Pessoa;

  constructor(private service: ServiceService, private router: Router) {
  }

  ngOnInit() {
    this.Detalhe();
  }

  Detalhe(){
    let email = localStorage.getItem("det_email");
    this.service.getCientist(email).subscribe(
      data => {
        this.pessoa = data;
      }
    )
  }

  gotoList(){
    this.router.navigateByUrl('/cientists');
  }

}

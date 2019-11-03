import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Glossario } from '../model/pessoa';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-add-glossary',
  templateUrl: './add-glossary.component.html',
  styleUrls: ['./add-glossary.component.css']
})
export class AddGlossaryComponent implements OnInit {

  glossario: Glossario;
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private service: ServiceService,
    private router: Router) {
    this.registerForm = this.formBuilder.group({      
      nome: '',
    });
    this.glossario = {
      id: null,
      nome: ''
    }
  }

  ngOnInit() {
  }

  onSubmit(){
    this.glossario.nome = this.registerForm.get('nome').value;
    this.service.addGlossary(this.glossario)
    .subscribe(
      data => {       
      }
    );
  }

  
}

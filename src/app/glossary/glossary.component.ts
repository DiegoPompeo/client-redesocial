import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { ServiceService } from '../service/service.service';
import { Pessoa } from '../model/pessoa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.css']
})
export class GlossaryComponent implements OnInit {

  pessoa: Pessoa;
  form: FormGroup;
  ordersData = [
    'Algoritmo','AngularJS','Inteligência Artificial','Retropropagação' ,
    'Teorema de Bayes','Rede bayesiana', 'Viés' ,'Big Data', 'Distribuição Binomial',
    'Teste Qui-Quadrado', 'Classificação', 'Agrupamento',' Coeficiente','Linguística Computacional',
    'Intervalo de Confiança', 'Variável Contínua', 'Correlação','Covariância', 'Validação Cruzada','D3',
    'Engenheiro de Dados', 'Mineração de Dados', 'Ciência de Dados', 'Estrutura de Dados', 'Disputa de Dados',
    'Árvores de Decisão', 'Aprendizagem Profunda', 'Variável Dependente','Redução de Dimensão','Variável Discreta',
    'Eeconometria', 'Característica', 'Engenharia de Recursos','PORTÃO','Aumento de Gradiente',
    'Gradiente Descendente', 'Histograma', 'Variável Independente', 'Javascript','Cluster de K-significa',
    'K Vizinhos mais Próximos','Variavel Latente', 'Lift', 'Álgebra Linear', 'Regressão Linear','Logaritmo',
    'Rregressão Logística', 'Aprendizado de Máquina', 'Modelo de Aprendizado de Máquina','Cadeia de Markov',
    'MATLAB', 'Matriz', 'Significar', 'Erro Absoluto Médio' , 'Erro Médio Quadrático', 'Mediana', 'Modo' ,
    'Modelo' ,'Método de Monte Carlo', 'Média Móvel', 'N-grama', 'Classificador Ingênuo de Bayes',
    'Rede Neural', 'Distribuição Normal', 'NoSQL', 'Hipótese Nula','Função Objetiva','Ponto Fora da Curva',
    'Overfitting','Valor P','Ranking da Página', 'Pandas', 'Pperceptron', 'Perl','Tabela Dinâmica',
    'Distribuição de Veneno' ,'Distribuição Posterior','Análise Preditiva','Modelagem Preditiva',
    'Análise do Componente Principal','Distribuição Prévia', 'Distribuição de Probabilidade',
    'Pitão', 'Quantil, Quartil','R', 'Floresta Aleatória', 'Regressão','Aprendizado por Reforço',
    'Erro Médio Quadrático da Raiz', 'Rubi', 'Curva S','SAS','Escalar','Scripting','Correlação Serial','Concha',
    'Dados Espaço-Temporais', 'SPSS','SQL','Desvio Padrão','Distribuição Normal Padrão','Pontuação Padronizada',
    'Stata','Estratos, Amostragem Estratificada', 'Aprendizado Supervisionado','Máquina de Vetor de Suporte',
    'Distribuição T','Quadro','Dados de Séries Temporais','UIMA','Aprendizado não Supervisionado','Variação',
    'Vetor', 'Espaço Vetorial','Weka' 
  ];

  constructor(private formBuilder: FormBuilder, private service: ServiceService, private router: Router) {
    this.form = this.formBuilder.group({
      orders: new FormArray([], minSelectedCheckboxes(1))
    });
    this.addCheckboxes();
  }

  ngOnInit() {
    this.search();
  }

  private addCheckboxes() {
    this.ordersData.forEach((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.form.controls.orders as FormArray).push(control);
    });
  }


  search() {
    let email = localStorage.getItem("email");
    this.service.getCientist(email).subscribe(
      data => {
        this.pessoa = data;
      }
    );
  }

  submit(pessoa: Pessoa) {
    const selectedOrder = this.form.value.orders
      .map((v, i) => v ? this.ordersData[i] : null)
      .filter(v => v !== null);
      pessoa.qualidades = selectedOrder.toString();
      this.service.atualizarPerfil(pessoa).subscribe(
        data => {          
          this.pessoa = data;
          this.router.navigate(['login']);
        }
      );
  }
}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}

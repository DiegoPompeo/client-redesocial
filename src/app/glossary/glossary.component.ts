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
    { id: 1, name: 'Algoritmo' },
    { id: 2, name: 'AngularJS' },
    { id: 3, name: 'Inteligência Artificial' },
    { id: 4, name: 'Retropropagação' },
    { id: 5, name: 'Teorema de Bayes' },
    { id: 6, name: 'Rede bayesiana' },
    { id: 7, name: 'Viés' },
    { id: 8, name: 'Big Data' },
    { id: 9, name: 'Distribuição Binomial' },
    { id: 10, name: 'Tteste Qui-Quadrado' },
    { id: 11, name: 'Classificação' },
    { id: 12, name: 'Agrupamento' },
    { id: 13, name: 'Coeficiente' },
    { id: 14, name: 'Linguística Computacional' },
    { id: 15, name: 'Intervalo de Confiança' },
    { id: 16, name: 'Variável Contínua' },
    { id: 17, name: 'Correlação' },
    { id: 18, name: 'Covariância' },
    { id: 19, name: 'Validação Cruzada' },
    { id: 20, name: 'D3' },
    { id: 21, name: 'Engenheiro de Dados' },
    { id: 22, name: 'Mineração de Dados' },
    { id: 23, name: 'Ciência de Dados' },
    { id: 24, name: 'Estrutura de Dados' },
    { id: 25, name: 'Disputa de Dados' },
    { id: 26, name: 'Árvores de Decisão' },
    { id: 27, name: 'Aprendizagem Profunda' },
    { id: 28, name: 'Variável Dependente' },
    { id: 29, name: 'Redução de Dimensão' },
    { id: 30, name: 'Variável Discreta' },
    { id: 31, name: 'Eeconometria' },
    { id: 32, name: 'Característica' },
    { id: 33, name: 'Engenharia de Recursos' },
    { id: 34, name: 'PORTÃO' },
    { id: 35, name: 'Aumento de Gradiente' },
    { id: 36, name: 'Gradiente Descendente' },
    { id: 37, name: 'Histograma' },
    { id: 38, name: 'Variável Independente' },
    { id: 39, name: 'Javascript' },
    { id: 40, name: 'Cluster de K-significa' },
    { id: 41, name: 'K Vizinhos mais Próximos' },
    { id: 42, name: 'Variavel Latente' },
    { id: 43, name: 'Lift' },
    { id: 44, name: 'Álgebra Linear' },
    { id: 45, name: 'Regressão Linear' },
    { id: 46, name: 'Logaritmo' },
    { id: 47, name: 'Rregressão Logística' },
    { id: 48, name: 'Aprendizado de Máquina' },
    { id: 49, name: 'Modelo de Aprendizado de Máquina' },
    { id: 50, name: 'Cadeia de Markov' },
    { id: 51, name: 'MATLAB' },
    { id: 52, name: 'Matriz' },
    { id: 53, name: 'Significar' },
    { id: 54, name: 'Erro Absoluto Médio' },
    { id: 55, name: 'Erro Médio Quadrático' },
    { id: 56, name: 'Mediana' },
    { id: 57, name: 'Modo' },
    { id: 58, name: 'Modelo' },
    { id: 59, name: 'Método de Monte Carlo' },
    { id: 60, name: 'Média Móvel' },
    { id: 61, name: 'N-grama' },
    { id: 62, name: 'Classificador Ingênuo de Bayes' },
    { id: 63, name: 'Rede Neural' },
    { id: 64, name: 'Distribuição Normal' },
    { id: 65, name: 'NoSQL' },
    { id: 66, name: 'Hipótese Nula' },
    { id: 67, name: 'Função Objetiva' },
    { id: 68, name: 'Ponto Fora da Curva' },
    { id: 69, name: 'Overfitting' },
    { id: 70, name: 'Valor P' },
    { id: 71, name: 'Ranking da Página' },
    { id: 72, name: 'Pandas' },
    { id: 73, name: 'Pperceptron' },
    { id: 74, name: 'Perl' },
    { id: 75, name: 'Tabela Dinâmica' },
    { id: 76, name: 'Distribuição de Veneno' },
    { id: 77, name: 'Distribuição Posterior' },
    { id: 78, name: 'Análise Preditiva' },
    { id: 79, name: 'Modelagem Preditiva' },
    { id: 80, name: 'Análise do Componente Principal' },
    { id: 81, name: 'Distribuição Prévia' },
    { id: 82, name: 'Distribuição de Probabilidade' },
    { id: 83, name: 'Pitão' },
    { id: 84, name: 'Quantil, Quartil' },
    { id: 85, name: 'R' },
    { id: 86, name: 'Floresta Aleatória' },
    { id: 87, name: 'Regressão' },
    { id: 88, name: 'Aprendizado por Reforço' },
    { id: 89, name: 'Erro Médio Quadrático da Raiz' },
    { id: 90, name: 'Rubi' },
    { id: 91, name: 'Curva S' },
    { id: 92, name: 'SAS' },
    { id: 93, name: 'Escalar' },
    { id: 94, name: 'Scripting' },
    { id: 95, name: 'Correlação Serial' },
    { id: 96, name: 'Concha' },
    { id: 97, name: 'Dados Espaço-Temporais' },
    { id: 98, name: 'SPSS' },
    { id: 99, name: 'SQL' },
    { id: 100, name: 'Desvio Padrão' },
    { id: 101, name: 'Distribuição Normal Padrão' },
    { id: 102, name: 'Pontuação Padronizada' },
    { id: 103, name: 'Stata' },
    { id: 104, name: 'Estratos, Amostragem Estratificada' },
    { id: 105, name: 'Aprendizado Supervisionado' },
    { id: 106, name: 'Máquina de Vetor de Suporte' },
    { id: 107, name: 'Distribuição T' },
    { id: 108, name: 'Quadro' },
    { id: 109, name: 'Dados de Séries Temporais' },
    { id: 110, name: 'UIMA' },
    { id: 111, name: 'Aprendizado não Supervisionado' },
    { id: 112, name: 'Variação' },
    { id: 113, name: 'Vetor' },
    { id: 114, name: 'Espaço Vetorial' },
    { id: 115, name: 'Weka' }
  ];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private service: ServiceService) {
    this.form = this.formBuilder.group({
    orders: new FormArray([])
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

  getOrders() {
    return [
      { id: 1, name: 'Algoritmo' },
      { id: 2, name: 'AngularJS' },
      { id: 3, name: 'Inteligência Artificial' },
      { id: 4, name: 'Retropropagação' },
      { id: 5, name: 'Teorema de Bayes' },
      { id: 6, name: 'Rede bayesiana' },
      { id: 7, name: 'Viés' },
      { id: 8, name: 'Big Data' },
      { id: 9, name: 'Distribuição Binomial' },
      { id: 10, name: 'Tteste Qui-Quadrado' },
      { id: 11, name: 'Classificação' },
      { id: 12, name: 'Agrupamento' },
      { id: 13, name: 'Coeficiente' },
      { id: 14, name: 'Linguística Computacional' },
      { id: 15, name: 'Intervalo de Confiança' },
      { id: 16, name: 'Variável Contínua' },
      { id: 17, name: 'Correlação' },
      { id: 18, name: 'Covariância' },
      { id: 19, name: 'Validação Cruzada' },
      { id: 20, name: 'D3' },
      { id: 21, name: 'Engenheiro de Dados' },
      { id: 22, name: 'Mineração de Dados' },
      { id: 23, name: 'Ciência de Dados' },
      { id: 24, name: 'Estrutura de Dados' },
      { id: 25, name: 'Disputa de Dados' },
      { id: 26, name: 'Árvores de Decisão' },
      { id: 27, name: 'Aprendizagem Profunda' },
      { id: 28, name: 'Variável Dependente' },
      { id: 29, name: 'Redução de Dimensão' },
      { id: 30, name: 'Variável Discreta' },
      { id: 31, name: 'Eeconometria' },
      { id: 32, name: 'Característica' },
      { id: 33, name: 'Engenharia de Recursos' },
      { id: 34, name: 'PORTÃO' },
      { id: 35, name: 'Aumento de Gradiente' },
      { id: 36, name: 'Gradiente Descendente' },
      { id: 37, name: 'Histograma' },
      { id: 38, name: 'Variável Independente' },
      { id: 39, name: 'Javascript' },
      { id: 40, name: 'Cluster de K-significa' },
      { id: 41, name: 'K Vizinhos mais Próximos' },
      { id: 42, name: 'Variavel Latente' },
      { id: 43, name: 'Lift' },
      { id: 44, name: 'Álgebra Linear' },
      { id: 45, name: 'Regressão Linear' },
      { id: 46, name: 'Logaritmo' },
      { id: 47, name: 'Rregressão Logística' },
      { id: 48, name: 'Aprendizado de Máquina' },
      { id: 49, name: 'Modelo de Aprendizado de Máquina' },
      { id: 50, name: 'Cadeia de Markov' },
      { id: 51, name: 'MATLAB' },
      { id: 52, name: 'Matriz' },
      { id: 53, name: 'Significar' },
      { id: 54, name: 'Erro Absoluto Médio' },
      { id: 55, name: 'Erro Médio Quadrático' },
      { id: 56, name: 'Mediana' },
      { id: 57, name: 'Modo' },
      { id: 58, name: 'Modelo' },
      { id: 59, name: 'Método de Monte Carlo' },
      { id: 60, name: 'Média Móvel' },
      { id: 61, name: 'N-grama' },
      { id: 62, name: 'Classificador Ingênuo de Bayes' },
      { id: 63, name: 'Rede Neural' },
      { id: 64, name: 'Distribuição Normal' },
      { id: 65, name: 'NoSQL' },
      { id: 66, name: 'Hipótese Nula' },
      { id: 67, name: 'Função Objetiva' },
      { id: 68, name: 'Ponto Fora da Curva' },
      { id: 69, name: 'Overfitting' },
      { id: 70, name: 'Valor P' },
      { id: 71, name: 'Ranking da Página' },
      { id: 72, name: 'Pandas' },
      { id: 73, name: 'Pperceptron' },
      { id: 74, name: 'Perl' },
      { id: 75, name: 'Tabela Dinâmica' },
      { id: 76, name: 'Distribuição de Veneno' },
      { id: 77, name: 'Distribuição Posterior' },
      { id: 78, name: 'Análise Preditiva' },
      { id: 79, name: 'Modelagem Preditiva' },
      { id: 80, name: 'Análise do Componente Principal' },
      { id: 81, name: 'Distribuição Prévia' },
      { id: 82, name: 'Distribuição de Probabilidade' },
      { id: 83, name: 'Pitão' },
      { id: 84, name: 'Quantil, Quartil' },
      { id: 85, name: 'R' },
      { id: 86, name: 'Floresta Aleatória' },
      { id: 87, name: 'Regressão' },
      { id: 88, name: 'Aprendizado por Reforço' },
      { id: 89, name: 'Erro Médio Quadrático da Raiz' },
      { id: 90, name: 'Rubi' },
      { id: 91, name: 'Curva S' },
      { id: 92, name: 'SAS' },
      { id: 93, name: 'Escalar' },
      { id: 94, name: 'Scripting' },
      { id: 95, name: 'Correlação Serial' },
      { id: 96, name: 'Concha' },
      { id: 97, name: 'Dados Espaço-Temporais' },
      { id: 98, name: 'SPSS' },
      { id: 99, name: 'SQL' },
      { id: 100, name: 'Desvio Padrão' },
      { id: 101, name: 'Distribuição Normal Padrão' },
      { id: 102, name: 'Pontuação Padronizada' },
      { id: 103, name: 'Stata' },
      { id: 104, name: 'Estratos, Amostragem Estratificada' },
      { id: 105, name: 'Aprendizado Supervisionado' },
      { id: 106, name: 'Máquina de Vetor de Suporte' },
      { id: 107, name: 'Distribuição T' },
      { id: 108, name: 'Quadro' },
      { id: 109, name: 'Dados de Séries Temporais' },
      { id: 110, name: 'UIMA' },
      { id: 111, name: 'Aprendizado não Supervisionado' },
      { id: 112, name: 'Variação' },
      { id: 113, name: 'Vetor' },
      { id: 114, name: 'Espaço Vetorial' },
      { id: 115, name: 'Weka' }
    ];
  }

  submit(pessoa: Pessoa) {
    const selectedOrderIds = this.form.value.orders
      .map((v, i) => v ? this.ordersData[i].name : null)
      .filter(v => v !== null);
      pessoa.qualidades = selectedOrderIds.toString();
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

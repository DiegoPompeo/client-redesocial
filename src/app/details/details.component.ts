import { Component, OnInit, Input } from '@angular/core';
import { Pessoa, Post, PessoaRecomendada, Amizade, CurtirPost } from '../model/pessoa';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();
  cientista: Pessoa = new Pessoa();
  curtirPost: CurtirPost = new CurtirPost();
  cientistas: Pessoa[];
  post: Post;
  posts: Post[];
  interesses: any;
  pessoaRecomendada: PessoaRecomendada = new PessoaRecomendada();
  listaRecomendadas: PessoaRecomendada[];
  emailLogado: string;
  auth: boolean = false;
  desabilitaSolicitacao = false;
  desabilita: boolean;
  recomendou = false;
  amizade: Amizade = new Amizade();

  listaAmigos: Pessoa[] = new Array<Pessoa>();
  listaAmigosDetails: Pessoa[] = new Array<Pessoa>();
  amigosEmComum: Pessoa[] = new Array<Pessoa>();

  show = true;

  listaCurtidas: CurtirPost[] = new Array<CurtirPost>();
  existe = false;

  msgError = false;

  constructor(
    private authService: AuthService,
    private service: ServiceService,
    private router: Router) {
  }


  getAmigosEmComum() {
    this.show = false;
  }

  Detalhe() {
    let email = localStorage.getItem("det_email");
    this.service.getCientist(email).subscribe(
      data => {
        if (data.curtida == null) {
          data.curtida = 0;
        }
        let str = data.dataNascimento.toString();
        let array = str.split("-");
        let final = array[2] + "/" + array[1] + "/" + array[0];
        this.cientista.dataNascimento = final.toString();

        let str2 = data.inicioDaAtividade.toString();
        let array2 = str2.split("-");
        let final2 = array2[2] + "/" + array2[1] + "/" + array2[0];
        this.cientista.inicioDaAtividade = final2.toString();

        localStorage.setItem("curtidas", data.curtida.toString());

        this.pessoa = data;
        this.interesses = data.interesse.split(",");
      }
    )
  }

  verificaRecomendar() {
    this.service.listaRecomendacao()
      .subscribe(data => {
        for (let i = 0; i < data.length; i++) {
          if ((
            data[i].emailRecomendou == localStorage.getItem("email")
            && data[i].emailRecomendada == localStorage.getItem("det_email"))
            && data[i].desfazer == false) {
            this.recomendou = true;
          } else if ((
            data[i].emailRecomendou == localStorage.getItem("email")
            && data[i].emailRecomendada == localStorage.getItem("det_email"))
            && data[i].desfazer == true) {
            this.recomendou = false;
          } else {
            this.recomendou = false;
          }
        }
      })
  }

  recomendar() {
    let existe: boolean;

    this.service.listaRecomendacao().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].emailRecomendada == localStorage.getItem("det_email") &&
            data[i].emailRecomendou == localStorage.getItem("email")) {
            existe = true;
          }
        }
      }
    );
    this.pessoaRecomendada.emailRecomendou = localStorage.getItem("email");
    this.pessoaRecomendada.emailRecomendada = localStorage.getItem("det_email");
    this.pessoaRecomendada.desfazer = false;

    if (!existe) {
      this.service.addRecomendacao(this.pessoaRecomendada).subscribe(data => { });
    } else {
      this.service.recomenda(this.pessoaRecomendada).subscribe(data => { });
    }

    this.service.getCientist(localStorage.getItem("det_email")).subscribe(
      data => {
        data.curtida++;
        this.service.atualizarPerfil(data).subscribe(x => {
        })
      }
    );
    this.recomendou = true;
  }

  desrecomendar() {
    let existe: boolean;

    this.service.listaRecomendacao().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].emailRecomendada == localStorage.getItem("det_email") &&
            data[i].emailRecomendou == localStorage.getItem("email")) {
            existe = true;
          }
        }
      }
    );
    this.pessoaRecomendada.emailRecomendou = localStorage.getItem("email");
    this.pessoaRecomendada.emailRecomendada = localStorage.getItem("det_email");
    this.pessoaRecomendada.desfazer = true;

    if (!existe) {
      this.service.addRecomendacao(this.pessoaRecomendada).subscribe(data => { });
    } else {
      this.service.desrecomenda(this.pessoaRecomendada).subscribe(data => { });
    }

    this.service.getCientist(localStorage.getItem("det_email")).subscribe(
      data => {
        data.curtida--;
        this.service.atualizarPerfil(data).subscribe(x => {
        })
      }
    );
    this.recomendou = false;
  }

  verificaCurtir(post: Post) {
    return this.service.verificaCurtida(post).subscribe(
      data => {
        this.existe = data;
      }
    );
  }

  likeButtonClick(post: Post) {
    this.service.getCientist(localStorage.getItem("email")).subscribe(
      data => {
        if (data.curtir > 0) {
          post.curtidas++;
          this.service.atualizaPost(post).subscribe(data => {
            this.post = data;
            console.log("Oi");
          });
          data.curtir--;
          this.service.atualizarPerfil(data).subscribe();
        } else {
          this.msgError = true;
        }
      }
    )
  }

  getAmigos() {
    this.service.listaAmizade().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].aceite == true) {
            if (data[i].emailMandatario == localStorage.getItem("email")
              && (data[i].aceite == true)) {
              this.service.getCientist(data[i].emailRemetente).subscribe(
                data => {
                  this.listaAmigos.push(data);
                }
              );
            } else if (data[i].emailRemetente == localStorage.getItem("email")
              && (data[i].aceite == true)) {
              this.service.getCientist(data[i].emailMandatario).subscribe(
                data => {
                  this.listaAmigos.push(data);
                }
              );
            }
          }
        }
      }
    );
  }

  getDetAmigos() {
    return this.service.listaAmizade().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].aceite == true) {
            if (data[i].emailMandatario == localStorage.getItem("det_email")
              && (data[i].aceite == true)) {
              this.service.getCientist(data[i].emailRemetente).subscribe(
                data => {
                  this.listaAmigosDetails.push(data);
                }
              );
            } else if (data[i].emailRemetente == localStorage.getItem("det_email")
              && (data[i].aceite == true)) {
              this.service.getCientist(data[i].emailMandatario).subscribe(
                data => {
                  this.listaAmigosDetails.push(data);
                }
              );
            }
          }
        }
      }
    );
  }

  solicitarAmizade() {
    this.amizade.emailMandatario = localStorage.getItem("email");
    this.amizade.emailRemetente = localStorage.getItem("det_email");
    this.amizade.aceite = false;
    this.amizade.recusado = false;
    this.amizade.solicitado = true;
    this.desabilitaSolicitacao = this.amizade.solicitado;

    this.service.solicitaAmizade(this.amizade).subscribe(data => { this.amizade = data });
  }

  verificaSolicitacao() {
    this.service.listaAmizade().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].emailRemetente == localStorage.getItem("det_email")
            && data[i].emailMandatario == localStorage.getItem("email")
            && (data[i].solicitado == true || data[i].aceite == true || data[i].recusado == true)) {
            this.desabilitaSolicitacao = true;
          } else if (data[i].emailRemetente == localStorage.getItem("email")
            && data[i].emailMandatario == localStorage.getItem("det_email")
            && (data[i].solicitado == true || data[i].aceite == true || data[i].recusado == true)) {
            this.desabilitaSolicitacao = true;
          }
        }
      }
    )
  }

  ngOnInit() {
    this.Detalhe();
    this.listaRecomendada();
    this.verificaSolicitacao();
    this.searchPosts();
    this.getAmigos();
    this.getDetAmigos();
    this.verificaRecomendar();

    this.emailLogado = localStorage.getItem("email");
    if (!(this.emailLogado == localStorage.getItem("det_email"))) {
      this.auth = true;
    }
  }

  searchPosts() {
    this.service.verPost(localStorage.getItem("det_email")).subscribe(data => {
      this.posts = data.reverse();
    });
  }

  listaRecomendada() {
    this.service.listaRecomendacao().subscribe(data => {
      this.listaRecomendadas = data;
      for (let i = 0; i < this.listaRecomendadas.length; i++) {
        if (this.listaRecomendadas[i].emailRecomendada == localStorage.getItem('email')
          && this.listaRecomendadas[i].emailRecomendou == localStorage.getItem("det_email")) {
          this.desabilita = true;
        }
      }
    });
  }

  logout() {
    this.authService.logout();
  }

}

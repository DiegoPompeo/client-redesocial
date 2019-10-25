export class Pessoa {
    id:number;
    nome: string;
    email: string;
    senha: string;
    nroCartao: string;
    nomeNoCartao: string;
    dataValidade: string;
    codSeg: string;
    empresa: string;

    inicioDaAtividade: string;
    dataNascimento: string;
    nivelEscolaridade: string;
    cidade: string;
    estado: string;
    salario: string;

    paga: boolean;    
}

export class PessoaLogin{
    email: string;
    senha: string;
}
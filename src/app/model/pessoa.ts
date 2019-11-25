export class Pessoa {
    id:number;
    nome: string;
    email: string;
    senha: string;
    empresa: string;
    inicioDaAtividade: string;
    dataNascimento: string;
    nivelEscolaridade: string;
    cidade: string;
    estado: string;

    nroCartao: string;
    nomeNoCartao: string;
    dataValidade: string;
    codSeg: string;    

    paga: boolean;

    curtida: number;

    interesse: string;

    curtir: number;
}

export class PessoaLogin{
    email: string;
    senha: string;
}

export class Post{
    id: number;
    conteudo: string;
    email: string;
    codPost: string;
    curtidas: number;
}

export class PessoaRecomendada{
    id: number;
    emailRecomendou: string;
    emailRecomendada: string;
    desfazer: boolean;
}

export class Glossario{
    id: number;
    nome: string;
}

export class Amizade{
    id: number;
    emailMandatario: string;
    emailRemetente: string;
    aceite: boolean;
    recusado: boolean;
    solicitado: boolean;
}

export class CurtirPost{
    id: number;
    emailCurtiu: string;
    emailCurtido: string;
    idPost: string;
    curtiu: boolean;
}

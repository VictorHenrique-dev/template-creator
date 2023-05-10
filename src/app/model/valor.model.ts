import { TextoModel } from "./texto.model";

export class ValorModel {

    constructor(
        mensagem: string,
        textos: TextoModel[]
        ) {
            this.cor_fonte = "#000000";
            this.acessibilidade = 'text';
            this.tamanho_fonte = '16';
            this.negrito = false;
            this.mensagem = mensagem;
            this.textos = textos
    }

    negrito: boolean;
    cor_fonte: string;
    tamanho_fonte: string;
    acessibilidade: string = 'text';
    textos?: TextoModel[];
    mensagem?: string;
}
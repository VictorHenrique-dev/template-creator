export class TituloModel {

    constructor(
        negrito: boolean,
        texto: string,
        tamanho_fonte: string) { 
            this.negrito = negrito;
            this.texto = texto;
            this.tamanho_fonte = tamanho_fonte;
            this.cor_fonte = "#000000";
            this.acessibilidade = "text";
        }

    negrito?: boolean;
    cor_fonte?: string;
    tamanho_fonte?: string;
    acessibilidade?: string;
    texto?: string;
}
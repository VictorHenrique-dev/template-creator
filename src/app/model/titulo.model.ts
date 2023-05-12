export class TituloModel {

    constructor(
        negrito: boolean,
        texto: string,
        tamanho_fonte: number) { 
            this.negrito = negrito;
            this.cor_fonte = "#000000";
            this.tamanho_fonte = tamanho_fonte;
            this.acessibilidade = "text";
            this.texto = texto;
        }

    negrito?: boolean;
    cor_fonte?: string;
    tamanho_fonte?: number;
    acessibilidade?: string;
    texto?: string;
}
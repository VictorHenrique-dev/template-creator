export class TextoModel {
    constructor (posicao_dado_comprovante: string,
        tipo_dado: string,
        formatos_dado: string[],
        referencia_dado: string
        ) {
            this.posicao_dado_comprovante = posicao_dado_comprovante;
            this.tipo_dado = tipo_dado;
            this.formatos_dado = formatos_dado;
            this.referencia_dado = referencia_dado;
    }
    posicao_dado_comprovante: string;
    tipo_dado: string;
    formatos_dado: string[];
    referencia_dado: string;
}
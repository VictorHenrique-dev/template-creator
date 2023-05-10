import { TituloModel } from "./titulo.model";
import { ValorModel } from "./valor.model";

export class ItemModel {

    constructor(espacamento: string,
        titul: TituloModel,
        valor: ValorModel,
        conteudo_campo: string,
        exibir_item_valor_vazio: boolean,
        orientacao_exibicao: string){
            
            this.exibir_item_valor_vazio = false;
            this.orientacao_exibicao = orientacao_exibicao;
            this.espacamento_dado = espacamento;
            this.titulo = titul;
            this.valor = valor;
            this.conteudo_campo = conteudo_campo;
        }

    exibir_item_valor_vazio: boolean;
    orientacao_exibicao: string;
    espacamento_dado?: string;
    titulo?: TituloModel;
    valor?: ValorModel;
    conteudo_campo: string;
}
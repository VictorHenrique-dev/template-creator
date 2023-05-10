import { ItemModel } from "./item.model";
import { TituloModel } from "./titulo.model";

export class TemplateModel {

    constructor(titulo: TituloModel){
        this.icone = true;
        this.titulo = titulo;
        this.itens = new Array();
    }

    icone?: boolean;
    titulo?: TituloModel;
    itens?: ItemModel[];
}
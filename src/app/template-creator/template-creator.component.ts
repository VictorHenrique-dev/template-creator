import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormControl } from '@angular/forms';
import { TemplateModel } from '../model/template.model';
import { TituloModel } from '../model/titulo.model';
import { ItemModel } from '../model/item.model';
import { ValorModel } from '../model/valor.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponentComponent } from '../modal-component/modal-component.component';
import { TextoModel } from '../model/texto.model';
import { ModalMergeComponent } from '../modal-merge/modal-merge.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';

interface TipagemDadosVariaveis {
  nome_campo: any;
  nome_campo_legado: any;
  conteudo_campo: any;
}

@Component({
  selector: 'app-template-creator',
  templateUrl: './template-creator.component.html',
  styleUrls: ['./template-creator.component.css']
})

export class TemplateCreadorComponent implements OnInit {
  dadosVariaveis: ItemModel[] = [];

  flagAttJson: boolean;

  listaAuxiliar: ItemModel[] = [];
  templatePronto: TemplateModel = new TemplateModel(new TituloModel(true, "titulo", 24));;

  inputDadosVariaveis = new FormControl('');
  inputTitulo = new FormControl('');
  inputTamanhoFonte = new FormControl('');
  codComprovante = new FormControl('');

  downloadJsonHref: SafeUrl;

  constructor(public dialog: MatDialog, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.submit();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.atualizarTemplate();
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }



  submit() {
    this.dadosVariaveis = [];
    // let obj: TipagemDadosVariaveis[] = JSON.parse(this.inputDadosVariaveis.value);
    let obj: TipagemDadosVariaveis[] = JSON.parse('[{"nome_campo":"NPRPTCNTR","nome_campo_legado":"NPRPTCNTR","conteudo_campo":"1234567"},{"nome_campo":"data_contratacao","nome_campo_legado":"data_contratacao","conteudo_campo":"2020-09-14T00:00:00"},{"nome_campo":"NIDEFMOVICANM","nome_campo_legado":"NIDEFMOVICANM","conteudo_campo":"OUTROS"},{"nome_campo":"MTITU","nome_campo_legado":"MTITU","conteudo_campo":"ANTONIO COUTINHO"}]');

    let itemDataComprovante = new ItemModel('1', new TituloModel(false, '', 14), new ValorModel(' em {0} às {1} via {2} com {3}',
      [
        { posicao_dado_comprovante: 'F', tipo_dado: 'DATA', formatos_dado: [("dd/mm/yyyy")], referencia_dado: 'identificacao.data_real_operacao' },
        { posicao_dado_comprovante: 'F', tipo_dado: 'HORAS', formatos_dado: [("hh:mm:ss")], referencia_dado: 'identificacao.hora_real_operacao' },
        { posicao_dado_comprovante: 'F', tipo_dado: 'TEXTO', formatos_dado: null, referencia_dado: 'canal_origem_operacao.nome_canal' },
        { posicao_dado_comprovante: 'V', tipo_dado: 'TEXTO', formatos_dado: null, referencia_dado: 'meio_formalizacao' },
      ]
    ), '', false, "V");

    let itemAutenticacaoComprovante = new ItemModel('1', new TituloModel(false, 'Autenticação:', 14), new ValorModel('{0}',
    [
      { posicao_dado_comprovante: 'F', tipo_dado: 'TEXTO', formatos_dado: null, referencia_dado: 'identificacao.numero_autenticacao_comprovante' },
    ]
  ), '', false, "V");

  this.dadosVariaveis.push(itemDataComprovante);
  
  obj.forEach(function (value) {
    let itemAux = new ItemModel('', new TituloModel(false, '', 16), new ValorModel('{0}', [{ posicao_dado_comprovante: 'V', tipo_dado: null, formatos_dado: null, referencia_dado: value.nome_campo }]), value.conteudo_campo, false, "V");
    this.dadosVariaveis.push(itemAux);
  }.bind(this))

  this.dadosVariaveis.push(itemAutenticacaoComprovante);
  
    this.templatePronto.titulo.texto = this.inputTitulo.value;
    this.templatePronto.titulo.tamanho_fonte = this.inputTamanhoFonte.value;
    this.atualizarTemplate();
  }



  atualizarTemplate() {
    this.dadosVariaveis.forEach(function (d, index) {
      Object.keys(d).forEach(key => {
        // d.conteudo_campo = null;
        if (d[key] == null || d[key] == '' || d[key] == undefined
        ) delete d[key];
        if (!d.valor.textos[0].formatos_dado) {
          //   delete d.valor.textos[0].referencia_dado;
          //   delete d.valor.textos[0].posicao_dado_comprovante;
          //   delete d.valor.textos[0].tipo_dado;
          delete d.valor.textos[0].formatos_dado
        }
        if (d.valor.textos[0]) {
          if (d.valor.textos[0].formatos_dado == null) delete d.valor.textos[0].formatos_dado
        }
      });

    });
    this.templatePronto.itens = this.dadosVariaveis;
    this.flagAttJson = !this.flagAttJson;
    console.log(this.dadosVariaveis);
  }


  openModal(campo: any, index: any) {
    const dialogRef = this.dialog.open(ModalComponentComponent, {
      width: '450px',
      data: {
        tituloTexto: campo.titulo.texto,
        mensagem: campo.valor.mensagem,
        espacamento: campo.espacamento_dado,
        posicao_dado_comprovante: campo.valor.textos[0].posicao_dado_comprovante,
        nome_campo: campo.valor.textos[0].referencia_dado,
        tipo_dado: campo.valor.textos[0].tipo_dado,
        conteudo_campo: campo.conteudo_campo,
        orientacao_exibicao: campo.orientacao_exibicao
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dadosVariaveis.forEach(function (value, i) {
        if (i == index) {
          if (result.espacamento == '' || result.espacamento == null) {
            value.espacamento_dado = null;
          } else {
            value.espacamento_dado = result.espacamento
          }

          value.titulo.texto = result.tituloTexto;
          value.valor.mensagem = result.mensagem;
          value.valor.textos[0].tipo_dado = result.tipo_dado;

          if (result.tipo_dado == 'DATA') {
            value.valor.textos[0].formatos_dado = [("dd/mm/yyyy")];
          } else if (result.tipo_dado == 'HORAS') {
            value.valor.textos[0].formatos_dado = [("hh:mm:ss")];
          } else {
            value.valor.textos[0].formatos_dado = null;
          }

          if (result.posicao_dado_comprovante == 'F') {
            campo.valor.textos[0].referencia_dado = result.nome_campo;
            campo.valor.textos[0].posicao_dado_comprovante = result.posicao_dado_comprovante;
          }
        }
      })
      this.atualizarTemplate();
    });
  }


  openModalMerge(campo: any, index: any) {
    const dialogRef = this.dialog.open(ModalMergeComponent, {
      width: '450px',
      data: {
        listaDados: this.dadosVariaveis
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let indexSelected = result.selectedValue;
      this.dadosVariaveis[index].valor.textos.push(this.dadosVariaveis[indexSelected].valor.textos[0]);
      this.dadosVariaveis.splice(indexSelected, 1);
      this.atualizarTemplate();
    })
  };

  openModalDelete(campo: any, index: any) {
    const dialogRef = this.dialog.open(ModalEditComponent, {
      width: '450px',
      data: {
        textos: this.dadosVariaveis[index].valor.textos
      }
    });

    dialogRef.keydownEvents().subscribe(e => {
      if (e.keyCode === 27) {
        e.preventDefault();
        dialogRef.disableClose = false;
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      this.dadosVariaveis[index].valor.textos.splice(this.dadosVariaveis[index].valor.textos.findIndex(e => e.referencia_dado == result.selectedValue), 1);
      this.atualizarTemplate();
    })
  };

  getJson() {
    return this.templatePronto;
  }

  getDownloadName() {
    if (this.codComprovante.value) {
      return `${this.codComprovante.value}.json`
    }
    return 'template.json'
  }

  criarNovo() {
    let itemAux = new ItemModel('', new TituloModel(true, '', 16), new ValorModel('{0}',
      [{ formatos_dado: null, posicao_dado_comprovante: null, referencia_dado: null, tipo_dado: null }]
    ), null, false, "V");
    this.dadosVariaveis.push(itemAux);
    this.atualizarTemplate();
  }

  duplicar(campo: any) {
    const clone = JSON.parse(JSON.stringify(campo))
    this.dadosVariaveis.push(clone);
    this.atualizarTemplate();
  }

  format() {
    this.listaAuxiliar = this.dadosVariaveis;
    // this.listaAuxiliar.forEach(function (d, index) {
    //   // d => 

    //   Object.keys(d).forEach(key => {
    //     delete d.conteudo_campo;
    //     // if (!d.valor.textos[0]) {
    //     //   delete d.valor.textos
    //     // }
    //     // if (typeof d[key].textos !== 'undefined') {
    //     //   console.log("d[key].textos")
    //     // }
    //     // if (d[key] == null || d[key] == '' || typeof d[key] == undefined) delete d[key];
    //     // console.log(d[key])
    //     console.log(d[key].textos)


    //   });
    // });

    console.log(JSON.stringify(this.listaAuxiliar
))
    this.listaAuxiliar = this.removeNull(this.listaAuxiliar);
    console.log(this.listaAuxiliar)

    this.templatePronto.itens = this.listaAuxiliar;


    var printJSON = JSON.stringify(this.templatePronto);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(printJSON));
    this.downloadJsonHref = uri;
    this.flagAttJson = !this.flagAttJson;
  }

  deleteItem(campo: any, index: any) {
    this.dadosVariaveis.splice(index,1);
    this.atualizarTemplate();
  }

  removeNull(obj) {
  //   return Object.fromEntries(
  //     Object.entries(obj)
  //       .filter(([_, value]) => value != null)
  //       .map(([key, value]) => [
  //         key,
  //         value === Object(value) ? this.removeNull(value) : value,
  //       ]),
  //   );
  // }

  
  return JSON.parse(JSON.stringify(obj, (key, value) => {
      return (value === null ? undefined : value);
    }));
  };
   
}



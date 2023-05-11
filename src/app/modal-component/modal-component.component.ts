import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css']
})
export class ModalComponentComponent implements OnInit {

  form: FormGroup;
  tituloTexto: string;
  mensagem: string;
  posicao_dado_comprovante: string;
  espacamento: string;
  tipo_dado: string;
  nome_campo: string;
  conteudo_campo: string;
  orientacao_exibicao: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      tituloTexto: [this.tituloTexto, []],
      mensagem: [this.mensagem, []],
      posicao_dado_comprovante: [this.posicao_dado_comprovante, []],
      espacamento: [this.espacamento, []],
      tipo_dado: [this.tipo_dado, []],
      nome_campo: [this.data.nome_campo, []],
      conteudo_campo: [this.data.conteudo_campo, []],
      orientacao_exibicao: [this.data.orientacao_exibicao, []],
    });

    this.tituloTexto = this.data.tituloTexto;
    this.mensagem = this.data.mensagem;
    this.posicao_dado_comprovante = this.data.posicao_dado_comprovante;
    this.espacamento = this.data.espacamento;
    this.tipo_dado = this.data.tipo_dado;
    this.nome_campo = this.data.nome_campo;
    this.conteudo_campo = this.data.conteudo_campo;
    this.orientacao_exibicao = this.data.orientacao_exibicao;
  }

  save() {
      this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}

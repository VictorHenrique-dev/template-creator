import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemModel } from '../model/item.model';
import { TextoModel } from '../model/texto.model';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent implements OnInit {
  form: FormGroup;

  selectedValue: any;
  selected = new FormControl('');

  listaDados: any[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      selectedValue: [this.selectedValue, Validators.required],
    });
    const clone = JSON.parse(JSON.stringify(this.data))
    var resultArray = Object.keys(clone).map(function (index) {
      let item = clone[index];
      return item;
    });
    this.listaDados = resultArray[0];
  }

  deleteItem(index: any, item: any) {
    this.selectedValue = item.referencia_dado;
    this.form.get("selectedValue").patchValue(this.selectedValue);
  }

  finish() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}

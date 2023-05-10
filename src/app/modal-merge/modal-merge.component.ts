import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemModel } from '../model/item.model';

@Component({
  selector: 'app-modal-merge',
  templateUrl: './modal-merge.component.html',
  styleUrls: ['./modal-merge.component.css']
})
export class ModalMergeComponent implements OnInit {
  form: FormGroup;

  selectedValue: any;

  listaDados: ItemModel[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalMergeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      selectedValue: [this.selectedValue, Validators.required],
    });

    this.listaDados = this.data.listaDados;
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}

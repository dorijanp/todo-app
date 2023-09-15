import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

interface NewItemDialogData {
  title: string;
  description: string;
}

@Component({
  selector: 'app-new-item-dialog',
  templateUrl: './new-item-dialog.component.html',
  styleUrls: ['./new-item-dialog.component.css'],
})
export class NewItemDialogComponent {
  constructor(public dialogRef: MatDialogRef<NewItemDialogComponent>) {}
  data: NewItemDialogData = {
    title: '',
    description: '',
  };
  onNoClick(): void {
    this.dialogRef.close();
  }
}

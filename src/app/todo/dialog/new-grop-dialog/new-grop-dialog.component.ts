import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-grop-dialog',
  templateUrl: './new-grop-dialog.component.html',
  styleUrls: ['./new-grop-dialog.component.css'],
})
export class NewGropDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NewGropDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

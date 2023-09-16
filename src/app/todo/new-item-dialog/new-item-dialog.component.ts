import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-new-item-dialog',
	templateUrl: './new-item-dialog.component.html',
	styleUrls: ['./new-item-dialog.component.css'],
})
export class NewItemDialogComponent {
	data = {
		title: '',
		description: '',
	};

	constructor(public dialogRef: MatDialogRef<NewItemDialogComponent>) {
		console.log(this.newItemForm);
	}

	newItemForm = new FormGroup({
		title: new FormControl('', [Validators.required]),
		description: new FormControl('', [Validators.required]),
	});

	onNoClick() {
		this.dialogRef.close();
	}
}

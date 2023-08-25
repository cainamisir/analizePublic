import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {appointment: Appointment}
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }
  onSaveClick(): void {
    // Handle the save action here, e.g., update data in the parent component
    this.dialogRef.close(this.data);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

export interface Appointment {
  id: number;
  created_at: string;
  time: string;
  location: string;
  client_email: string;
  sum: number;
}
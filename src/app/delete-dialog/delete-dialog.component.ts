import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { appointment: Appointment }
  ) {}

  onDeleteClick(): void {
    // Handle the delete action here, e.g., notify the parent component to delete the appointment
    this.dialogRef.close(
      {
        deleted: true,
        appointment: this.data.appointment
      }
    ); // You can pass any value to indicate the deletion
  }

  onCancelClick(): void {
    this.dialogRef.close({
      deleted: false,
      appointment: this.data.appointment
    });
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
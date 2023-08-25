import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table'; // Add this import
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { createClient, SupabaseClient , User} from '@supabase/supabase-js';

// ... rest of the code remains the same

@Component({
  selector: 'app-appmanag',
  templateUrl: './appmanag.component.html',
  styleUrls: ['./appmanag.component.scss']
})
export class AppmanagComponent {

  // this implements the logic for appmanag.component.html
  // this is the component that will be used to manage the appointments
  dataSource = new MatTableDataSource<Appointment>();
  displayedColumns: string[] = ['id', 'createdAt', 'time', 'location', 'clientEmail', 'price', 'edit', 'delete'];
  user: User | null = null;

  private supabase: SupabaseClient;
  constructor(public dialog: MatDialog) { 
    this.supabase = createClient('https://xirrnahvtsyqplamvxim.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpcnJuYWh2dHN5cXBsYW12eGltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU2MzI0ODUsImV4cCI6MTk5MTIwODQ4NX0.VDajcI1NxrmCSfSyWAehUbSqQOyNDerCrWKNZcuenp8');

  }

  ngOnInit(): void {
    this.supabase.auth.onAuthStateChange((event, session) => {
      this.user = session?.user ?? null;

      if (this.user) {
        this.getAppointments(); // Make sure getAppointments() returns an array of Appointment objects
      }
    });

  }

  openEditDialog(appointment: Appointment): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px', // Adjust the width as needed
      data: { appointment },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update in supabase
        this.supabase.from('reservation')
        .update({ time: result.appointment.time, location: result.appointment.location, client_email: result.appointment.client_email, sum: result.appointment.sum })
        .eq('id', result.appointment.id)
        .then(response => {
          console.log(response.data);
          this.getAppointments();
        }
        );
      }
      else{
        this.getAppointments();
        
      }
    });
  }

  openDeleteDialog(appointment: Appointment): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '600px', // Adjust the width as needed
      data: { appointment },
      autoFocus: false

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.deleted) {
        // delete it from supabase if the user confirms
        this.supabase.from('reservation')
        .delete()
        .eq('id', result.appointment.id)
        .then(response => {
          console.log(response.data);
          this.getAppointments();
        }
        );      
      }
    });
  }

  // Replace this with your actual data retrieval logic
  getAppointments(): void{
    // Sample data - Replace with your actual data source
    // This will get the data from the supabase table
    // perform a request to supabase to the reservation table
    // and return the data
    

    this.supabase.from('reservation')
    .select('*')
    .eq('provider_id', this.user?.id)
    .then(response => {
      console.log(response.data);
      this.dataSource.data = response.data as Appointment[];
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

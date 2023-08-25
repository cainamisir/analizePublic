import { Component } from '@angular/core';

/*
This should load the data from a supabase table (which has the auth id same as the current auth id)
and then display the data in a form. The form should be editable and the data should be updated in the table
when the user clicks on the save button. The form should be pre-populated with the data from the table.
The form should have a cancel button which should reset the form to the original data from the table.

The fields are:
Name - Text
Logo URL - Text
Services - Array of Text
Locations -> array of Objets with key name and key address
contact phone -> Text
contact email -> Text
work hours -> a json object with an array inside (7 entries). Each entry is a json with 'from' and 'to' keys.

*/

import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createClient, SupabaseClient , User} from '@supabase/supabase-js';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-editable-fields',
  templateUrl: './editable-fields.component.html',
  styleUrls: ['./editable-fields.component.scss']
})
export class EditableFieldsComponent implements OnInit {
  profileForm: FormGroup;
  originalData: any;
  supabase: SupabaseClient;
  user: User | null = null;

  constructor(private fb: FormBuilder,private router:Router) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      logoUrl: [''],
      services: [[]],
      locations: [[]],
      contactPhone: [''],
      contactEmail: [''],
      workHours: [null]
    });

    this.supabase = createClient('https://xirrnahvtsyqplamvxim.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpcnJuYWh2dHN5cXBsYW12eGltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU2MzI0ODUsImV4cCI6MTk5MTIwODQ4NX0.VDajcI1NxrmCSfSyWAehUbSqQOyNDerCrWKNZcuenp8');
  }

  ngOnInit(): void {
    this.supabase.auth.onAuthStateChange((event, session) => {
      this.user = session?.user ?? null;

      if (this.user) {
        this.loadUserProfile();
      }
    });
  }

  loadUserProfile() {
    this.supabase
      .from('providers')
      .select('*')
      .eq('auth_id', this.user!.id)
      .then(response => {
        let userData = {};
        if(response.data == null || response.data.length == 0) {
          // No data found for this user, create a new entry
          // navigate to /login using router

          this.router.navigate(['login']);
          
        }
        else
          userData = response.data[0];
        console.log(userData)
        this.originalData = userData;
        this.profileForm.patchValue(userData);
      })
  }

  updateProfile() {
    const updatedData = this.profileForm.value;
    this.supabase
      .from('user_profiles')
      .update(updatedData)
      .eq('auth_id', this.user!.id)
      .then(response => {
        console.log('Profile updated:', response);
        // Optionally update UI or show success message
      })
  }

  cancelChanges() {
    this.profileForm.patchValue(this.originalData);
  }
}

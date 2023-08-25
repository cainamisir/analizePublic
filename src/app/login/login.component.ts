// login.component.ts
import { Component } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient('https://xirrnahvtsyqplamvxim.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpcnJuYWh2dHN5cXBsYW12eGltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU2MzI0ODUsImV4cCI6MTk5MTIwODQ4NX0.VDajcI1NxrmCSfSyWAehUbSqQOyNDerCrWKNZcuenp8');
  }

  email: string = '';
  password: string = '';

  async login() {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: this.email,
      password: this.password
    });

    if (error) {
      console.error('Login error:', error);
    } else {
      console.log('Logged in:', data);
      // Redirect or navigate to /appmanag
      window.location.href = '/appmanag';
    }
  }
}

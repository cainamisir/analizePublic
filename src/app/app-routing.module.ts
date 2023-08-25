// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EditableFieldsComponent } from './editable-fields/editable-fields.component';
import { AppmanagComponent } from './appmanag/appmanag.component';
import { MainContentComponent } from './main-content/main-content.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: EditableFieldsComponent },
  { path: 'appmanag', component: AppmanagComponent },
  { path: 'signup', component: MainContentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

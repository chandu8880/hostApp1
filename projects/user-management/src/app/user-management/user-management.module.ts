import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserList } from '../components/user-list/user-list';
import { UserForm } from '../components/user-form/user-form';

export const routes: Routes = [
  {
    path: 'users-list',
    component: UserList
  },
  {
    path: 'users-form',
    component: UserForm
  },
  { path: '', component: UserList }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserList, UserForm,
    RouterModule.forChild(routes)
  ]
})
export class UserManagementModule { }

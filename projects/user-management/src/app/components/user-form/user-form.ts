import { Component } from '@angular/core';
import { User } from '../../../../../shell/src/app/shared/models/user.model';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-form',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
  standalone: true
})
export class UserForm {
  userForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.userForm.valid) {
      const user: User = {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        role: this.userForm.value.role,
        id: ''
      }
      this.userService.addUser(user);
      this.userForm.reset();
      alert('User added successful!'); 
    }
  }
}

import { Component, inject } from '@angular/core';
import { LoginPayload } from '../../shared/models/login.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {
  credentials: LoginPayload = { email: '', password: '' };
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) { }

  onSubmit() {
    if (this.credentials.email && this.credentials.password) {
      if (this.auth.login(this.credentials)) {
        this.router.navigate(['/']);
        alert('Login successful!');
      } else
        alert('Wrong Credentials');
    } else {
      this.errorMessage = 'Please enter username and password';
    }
  }
}

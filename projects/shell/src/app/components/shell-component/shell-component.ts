import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-shell-component',
  imports: [RouterModule,CommonModule],
  templateUrl: './shell-component.html',
  styleUrl: './shell-component.css',
  encapsulation: ViewEncapsulation.None

})
export class ShellComponent implements OnInit {
 
  private router = inject(Router);
  userName:string = '';
  userRole:string = '';

  ngOnInit(): void {
   const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.userName = user.name || 'Guest';
      this.userRole = user.role || 'User';
    }
  }

  logout() {
    // Clear user session, you may want to call AuthService.logout() instead
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}

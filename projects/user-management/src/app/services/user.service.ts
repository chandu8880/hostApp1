import { Injectable } from '@angular/core';
import { User } from '../../../../shell/src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  constructor() {
    // Load users from localStorage on service initialization
    const usersJson = localStorage.getItem('users');
    this.users = usersJson ? JSON.parse(usersJson) : [];
  }


  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User): void {
    this.users.push({ ...user, id: this.users.length + 1 });
    localStorage.setItem('users', JSON.stringify(this.users));  // save updated users list
  }
}

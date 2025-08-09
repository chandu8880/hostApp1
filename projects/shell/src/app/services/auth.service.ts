import { computed, Injectable, signal } from '@angular/core';
import { User } from '../shared/models/user.model';
import { LoginPayload } from '../shared/models/login.model';

const CURRENT_USER_KEY = 'currentUser';
const USERS_KEY = 'users';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSignal = signal<User | null>(null);

  isLoggedIn = computed(() => this.currentUserSignal() !== null);
  currentUser = this.currentUserSignal.asReadonly();

  constructor() {
    // On service init, load currentUser from localStorage
    const usersJson = localStorage.getItem('users');
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      this.currentUserSignal.set(JSON.parse(savedUser));
    }
    if (!usersJson) {
      // If no users found in localStorage, add default admin user
      const defaultUsers: User[] = [
        {
          id: 1,
          name: 'Admin User',
          email: 'admin@example.com',
          password: '123',
          role: 'admin'
        }
      ];
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
  }

  login(credentials: LoginPayload): boolean {
    // Get users list from localStorage
    const usersJson = localStorage.getItem(USERS_KEY);
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];

    // Find user matching email and password
    const foundUser = users.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (foundUser) {
      // Set current user signal and save to localStorage
      this.currentUserSignal.set(foundUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
      return true;
    }

    return false;
  }

  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

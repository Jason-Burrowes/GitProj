import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  username = '';
  password = '';
  role = '';
  message = '';

  constructor(private router: Router) {}

  getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : {};
  }

  saveUsers(users: any) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  createUser() {
    if (!this.username || !this.password || !this.role) {
      this.message = 'Please fill out all fields.';
      return;
    }

    const users = this.getUsers();

    if (users[this.username]) {
      this.message = 'User already exists!';
      return;
    }

    users[this.username] = { password: this.password, role: this.role };
    this.saveUsers(users);

    this.message = `✅ User '${this.username}' with role '${this.role}' created!`;
  }

  login() {
    if (!this.username || !this.password || !this.role) {
      this.message = 'Please fill out all fields.';
      return;
    }

    const users = this.getUsers();
    const user = users[this.username];

    if (!user) {
      this.message = 'User not found. Please create an account.';
      return;
    }

    if (user.password === this.password && user.role === this.role) {
      this.message = `✅ Welcome back, ${this.username} (${this.role})!`;
      this.router.navigate(['/login-success']);
    } else {
      this.message = '❌ Invalid password or role.';
    }
  }
}

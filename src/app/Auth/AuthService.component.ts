import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole!: string;

  setUserRole(role: string) {
    this.userRole = role;
  }

  getUserRole(): string {
    return this.userRole;
  }

  // Lógica de inicio de sesión, almacenamiento de token, etc.
}

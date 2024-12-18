import { Component } from '@angular/core';
import { AuthentificationService } from '../core/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private authService: AuthentificationService) {}

  // Méthode pour envoyer la requête de connexion et stocker le token JWT
  login(d: any): void {
  this.authService.singin(d).subscribe(
    (response) => {
      console.log(response); // Log the full response to verify its structure

      // Store the access token and role correctly in localStorage
      localStorage.setItem('access_token', response.accessToken);
      localStorage.setItem('role', response.user.role);  // Correctly access role from response.user
    },
    (error) => {
      console.error('Error during login:', error);
    }
  );
}

}


import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  protected email: string = "";
  protected password: string = "12345678";

  constructor(private authService: AuthService, private router: Router) { }

  protected async login() {
    await this.authService.sanctum();

    let response = await this.authService.login({
      email: this.email,
      password: this.password,
    });
    // console.log(response.o.json());

    this.router.navigateByUrl('');
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ApiResponse } from '../../../interfaces/api-response';
import { User } from '../../../models/user/user';
import { Validator } from '../../../classes/validator';
import { AlertComponent } from '../../../components/alert/alert.component';
import { NavbarAuthComponent } from '../../../components/navbar/navbar-auth/navbar-auth.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink, FormsModule,
    AlertComponent, NavbarAuthComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  protected remember = false;
  protected frm: FormGroup = new FormGroup({});

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    this.frm = this.fb.group({
      'email': ['leuschke.john@example.com', [Validators.required, Validators.email]],
      'password': ['12345678', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    });
  }

  private getControl(controlName: string) {
    return this.frm.get(controlName);
  }

  protected verifyControlErrors(controlName: string) {
    let hasErrors: boolean = false;
    const control = this.getControl(controlName);

    if (control?.errors) {
      const errorKey = Object.keys(control.errors);
      if (errorKey) {
        hasErrors = errorKey.length > 0;
      }
    }

    return hasErrors;
  }

  protected getErrorMessage(controlName: string): string {
    const control = this.getControl(controlName);
    return Validator.getErrorMessage(control);
  }

  protected async login() {
    await this.authService.sanctum();

    let response = await this.authService.login({
      email: this.getControl('email')?.value,
      password: this.getControl('password')?.value,
    });
    let userLogResponse = response as ApiResponse<{
      user: User
    }>;

    if (userLogResponse && userLogResponse.data) {
      await this.authService.loadUser();
      this.router.navigateByUrl('');
    }
  }


}

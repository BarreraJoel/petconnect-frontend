import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from '../../../components/alert/alert.component';
import { Validator } from '../../../classes/validator';
import { NavbarAuthComponent } from '../../../components/navbar/navbar-auth/navbar-auth.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink,
    AlertComponent, NavbarAuthComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  protected frm: FormGroup = new FormGroup({});
  private file: File | null = null;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    this.frm = this.fb.group({
      'username': ['', [Validators.required, Validators.minLength(3)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      'password_confirmation': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validator.equals('password', 'contraseña')]],
    });
  }

  ngOnInit() {
    this.getControl('password')?.valueChanges.subscribe(() => {
      this.getControl('password_confirmation')?.updateValueAndValidity({ onlySelf: true });
    });
  }

  protected onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    }
    console.log(this.file);
  }

  protected async register() {
    await this.authService.sanctum();

    const formData = new FormData();
    formData.append('username', this.getControl('username')?.value);
    formData.append('email', this.getControl('email')?.value);
    formData.append('password', this.getControl('password')?.value);
    formData.append('password_confirmation', this.getControl('password_confirmation')?.value);
    if (this.file) {
      formData.append('image', this.file);
    }
    let response = await this.authService.register(formData as any);
    console.log(response);

    this.router.navigateByUrl('auth/sign-in');
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

}

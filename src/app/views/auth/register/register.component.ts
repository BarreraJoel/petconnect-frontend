import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserTypeEnum } from '../../../enums/user-type';
import { UserTypeEnumPipe } from '../../../pipes/user-type-enum.pipe';
import { AlertComponent } from '../../../components/alert/alert.component';
import { Validator } from '../../../classes/validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink,
    AlertComponent,
    UserTypeEnumPipe
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  protected frm: FormGroup = new FormGroup({});
  protected typeEnum: any;
  private file: File | null = null;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.createForm();
    this.loadEnums();
  }

  private createForm() {
    this.frm = this.fb.group({
      'email': ['natalia@mail.com', [Validators.required, Validators.email]],
      'password': ['12345678', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      'password_confirmation': ['12345678', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      'first_name': ['Natalia', [Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Z ]*")]],
      'last_name': ['Mendez', [Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Z ]*")]],
      'type': [UserTypeEnum.INDIVIDUAL, [Validators.required]],
    });
  }

  ngOnInit() {
    this.getControl('password_confirmation')?.addValidators(Validator.equals(this.frm.get('password')?.value, 'contraseña'));
  }

  private loadEnums() {
    this.typeEnum = Object.values(UserTypeEnum);
    this.typeEnum.pop();
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
    formData.append('email', this.getControl('email')?.value);
    formData.append('password', this.getControl('password')?.value);
    formData.append('password_confirmation', this.getControl('password_confirmation')?.value);
    formData.append('first_name', this.getControl('first_name')?.value);
    formData.append('last_name', this.getControl('last_name')?.value);
    formData.append('type', this.getControl('type')?.value);
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

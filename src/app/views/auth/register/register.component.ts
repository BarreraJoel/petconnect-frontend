import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserTypeEnum } from '../../../enums/user-type';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  protected frm: FormGroup;
  protected typeEnum: any;
  private file: File | null = null;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.frm = this.fb.group({
      'email': ['natalia@mail.com', Validators.required],
      'password': ['12345678', Validators.required],
      'password_confirmation': ['12345678', Validators.required],
      'first_name': ['Natalia', Validators.required],
      'last_name': ['Mendez', Validators.required],
      'type': [UserTypeEnum.INDIVIDUAL, Validators.required],
    });

    this.typeEnum = Object.values(UserTypeEnum);

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
    formData.append('email', this.frm.get('email')?.value);
    formData.append('password', this.frm.get('password')?.value);
    formData.append('password_confirmation', this.frm.get('password_confirmation')?.value);
    formData.append('first_name', this.frm.get('first_name')?.value);
    formData.append('last_name', this.frm.get('last_name')?.value);
    formData.append('type', this.frm.get('type')?.value);
    if (this.file) {
      formData.append('image', this.file);
    }
    let response = await this.authService.register(formData as any);
    console.log(response);

    this.router.navigateByUrl('');
  }

}

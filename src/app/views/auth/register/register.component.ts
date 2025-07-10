import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserTypeEnum } from '../../../enums/user-type';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  protected frm: FormGroup;
  protected typeEnum: any;

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

  protected async register() {
    await this.authService.sanctum();

    let response = await this.authService.register(this.frm?.value);
    console.log(response);

    this.router.navigateByUrl('');
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { Validator } from '../../../classes/validator';
import { UserService } from '../../../services/users/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NavbarComponent
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

  protected frm: FormGroup = new FormGroup({});
  private userUuid: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private userService: UserService,
  ) {
    this.createForm();
    let uuid = this.actRoute.snapshot.paramMap.get('uuid');
    this.userUuid = <string>uuid;
  }

  private createForm() {
    this.frm = this.fb.group({
      'email': [null, [Validators.email]],
      'password': [null, [Validators.minLength(8), Validators.maxLength(8)]],
      'first_name': [null, [Validators.minLength(3), Validators.pattern("[a-zA-Z ]*")]],
      'last_name': [null, [Validators.minLength(3), Validators.pattern("[a-zA-Z ]*")]],
      'instagram_url': [null],
      'linkedin_url': [null],
      'facebook_url': [null],
      'twitter_url': [null],
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

  protected async update() {
    console.log(this.frm.value);
    this.checkForm();
    this.formatContact();

    let response = await this.userService.update(this.userUuid, this.frm.value);
    console.log(response);

    this.router.navigateByUrl(`/accounts/${this.userUuid}`);
  }


  private formatContact() {
    let protocol = "https://";
    if (this.getControl('instagram_url')?.value) {
      this.getControl('instagram_url')?.setValue(`${protocol}instagram.com/${this.getControl('instagram_url')?.value}`);
    }
    if (this.getControl('facebook_url')?.value) {
      this.getControl('facebook_url')?.setValue(`${protocol}facebook.com/${this.getControl('facebook_url')?.value}`);
    }
    if (this.getControl('twitter_url')?.value) {
      this.getControl('twitter_url')?.setValue(`${protocol}twitter.com/${this.getControl('twitter_url')?.value}`);
    }
    if (this.getControl('linkedin_url')?.value) {
      this.getControl('linkedin_url')?.setValue(`${protocol}linkedin.com/in/${this.getControl('linkedin_url')?.value}`);
    }
  }

  private checkForm() {
    if (!this.getControl('email')?.value) {
      this.frm.removeControl('email');
    }
    if (!this.getControl('password')?.value) {
      this.frm.removeControl('password');
    }
    if (!this.getControl('first_name')?.value) {
      this.frm.removeControl('first_name');
    }
    if (!this.getControl('last_name')?.value) {
      this.frm.removeControl('last_name');
    }
    if (!this.getControl('instagram_url')?.value) {
      this.frm.removeControl('instagram_url');
    }

    if (!this.getControl('facebook_url')?.value) {
      this.frm.removeControl('facebook_url');
    }
    if (!this.getControl('twitter_url')?.value) {
      this.frm.removeControl('twitter_url');
    }
    if (!this.getControl('linkedin_url')?.value) {
      this.frm.removeControl('linkedin_url');
    }

  }

  protected back() {
    this.router.navigateByUrl(`/accounts/${this.userUuid}`);
  }

}

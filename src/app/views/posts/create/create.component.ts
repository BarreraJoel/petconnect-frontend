import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../../services/posts/post.service';
import { Router } from '@angular/router';
import { PostTypeEnum } from '../../../enums/post-type';
import { AuthService } from '../../../services/auth/auth.service';
import { PostTypeEnumPipe } from '../../../pipes/post-type-enum.pipe';
import { ApiGeoService } from '../../../services/api-geo.service';
import { ApiResponse } from '../../../interfaces/api-response';
import { User } from '../../../models/user/user';
import { AlertComponent } from '../../../components/alert/alert.component';
import { Validator } from '../../../classes/validator';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PostTypeEnumPipe,
    AlertComponent, NavbarComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {

  protected frm: FormGroup = new FormGroup({});
  protected typeEnum: any;
  private files: File[] = [];
  protected provinces: any[] | null = null;
  protected localities: any[] | null = null;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private apiGeoService: ApiGeoService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loadEnums();
    this.createForm();
  }

  private createForm() {
    this.frm = this.fb.group({
      'title': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      'city': ['', Validators.required],
      'locality': ['', Validators.required],
      'description': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      'type': [PostTypeEnum.ADOPT, Validators.required],
      'user_uuid': ['', Validators.required],
      'images': [null],
    });

  }

  private loadEnums() {
    this.typeEnum = Object.values(PostTypeEnum);
    this.typeEnum.pop();
  }

  async ngOnInit() {
    // await this.loadGeo();
  }

  private async loadGeo() {
    console.log(this.provinces);

    const response = await this.apiGeoService.getCities();
    console.log(response);
    // this.provinces = (response as any).provincias;
    // this.frm.get('city')?.setValue(this.provinces ? this.provinces[0].nombre : '');
    // await this.loadLocalities();
  }

  protected async loadLocalities() {
    const response = await this.apiGeoService.getLocalities(this.frm.get('city')?.value);
    this.localities = (response as any).localidades;
    this.frm.get('locality')?.setValue(this.localities ? this.localities[0].nombre : '');
    console.log(this.frm.get('locality')?.value);
  }

  protected onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      for (let i = 0; i < input.files.length; i++) {
        this.files.push(input.files[i]);
      }
    }
  }

  protected async publish() {
    if (this.authService.userLogin) {      
      this.frm.get('user_uuid')?.setValue(this.authService.userLogin.uuid);

      const formData = new FormData();
      formData.append('title', this.frm.get('title')?.value);
      formData.append('city', this.frm.get('city')?.value);
      formData.append('locality', this.frm.get('locality')?.value);
      formData.append('description', this.frm.get('description')?.value);
      formData.append('type', this.frm.get('type')?.value);
      formData.append('user_uuid', this.frm.get('user_uuid')?.value);
      this.files.forEach((file, index) => {
        formData.append(`images[]`, file);
      });

      let response = await this.postService.insert(formData);
      console.log(response);

      this.router.navigateByUrl('posts');
    }
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

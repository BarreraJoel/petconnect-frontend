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

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PostTypeEnumPipe
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {

  protected frm: FormGroup;
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
    this.frm = this.fb.group({
      'title': ['ADOPCION', Validators.required],
      'city': ['CABA', Validators.required],
      'locality': ['Barracas', Validators.required],
      'description': ['Perrito adopcion', Validators.required],
      'type': [PostTypeEnum.ADOPT, Validators.required],
      'user_id': ['', Validators.required],
      'images': [null],
    });

    this.typeEnum = Object.values(PostTypeEnum);
  }
  async ngOnInit() {
    // await this.loadGeo();
  }

  // private async loadGeo() {
  //   const response = await this.apiGeoService.getCities();
  //   console.log(response);
  //   this.provinces = (response as any).provincias;
  //   this.frm.get('city')?.setValue(this.provinces ? this.provinces[0].nombre : '');
  //   await this.loadLocalities();
  // }

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
    let userResponse = await this.authService.user();
    if (userResponse) {
      let apiResponse = (userResponse as ApiResponse<{
        user: User
      }>);
      this.frm.get('user_id')?.setValue(apiResponse.data?.user.uuid);

      const formData = new FormData();
      formData.append('title', this.frm.get('title')?.value);
      formData.append('city', this.frm.get('city')?.value);
      formData.append('locality', this.frm.get('locality')?.value);
      formData.append('description', this.frm.get('description')?.value);
      formData.append('type', this.frm.get('type')?.value);
      formData.append('user_id', this.frm.get('user_id')?.value);
      this.files.forEach((file, index) => {
        formData.append(`images[]`, file);
      });

      let response = await this.postService.insert(formData);
      console.log(response);

      this.router.navigateByUrl('posts');
    }
  }

}

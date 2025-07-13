import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../../services/posts/post.service';
import { Router } from '@angular/router';
import { PostTypeEnum } from '../../../enums/post-type';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  protected frm: FormGroup;
  protected typeEnum: any;
  private files: File[] = [];

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.frm = this.fb.group({
      'title': ['Some title', Validators.required],
      'city': ['Some place', Validators.required],
      'locality': ['Some locality', Validators.required],
      'description': ['Some description', Validators.required],
      'type': [PostTypeEnum.ADOPT, Validators.required],
      'user_id': ['', Validators.required],
      'images': [null],
    });

    this.typeEnum = Object.values(PostTypeEnum);
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
    this.frm.get('user_id')?.setValue(userResponse.data.user.uuid);

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

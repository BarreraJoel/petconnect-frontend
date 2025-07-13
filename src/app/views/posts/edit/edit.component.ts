import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../../services/posts/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostTypeEnum } from '../../../enums/post-type';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

  protected frm: FormGroup;
  protected postUuid: string = "";
  protected typeEnum: any;

  constructor(
    private postService: PostService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {

    let uuid = this.actRoute.snapshot.paramMap.get('uuid');
    this.postUuid = <string>uuid;
    console.log(uuid);

    this.frm = this.fb.group({
      'title': [''],
      'city': [''],
      'locality': [''],
      'description': [''],
      'type': [],
      'user_id': [],
    });

    this.typeEnum = Object.values(PostTypeEnum);
  }

  async ngOnInit() {
    let response = await this.postService.get(this.postUuid);
    console.log(response.data.post);

    this.frm.get('user_id')?.setValue(response.data.post.user_id);
    this.frm.get('title')?.setValue(response.data.post.title);
    this.frm.get('city')?.setValue(response.data.post.city);
    this.frm.get('locality')?.setValue(response.data.post.locality);
    this.frm.get('description')?.setValue(response.data.post.description);
    this.frm.get('type')?.setValue(response.data.post.type);
  }

  protected async update() {
    let response = await this.postService.update(this.frm?.value, this.postUuid);
    console.log(response);

    this.router.navigateByUrl('posts');
  }

}

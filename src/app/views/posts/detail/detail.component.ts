import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../services/posts/post.service';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { StorageService } from '../../../services/storage/storage.service';
import { UserService } from '../../../services/users/user.service';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TimeAgoPipe } from '../../../pipes/time-ago.pipe';
import { LoaderComponent } from '../../../components/animations/loader/loader.component';
import { ApiResponse } from '../../../interfaces/api-response';
import { Post } from '../../../models/post/post';
import { User } from '../../../models/user/user';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    FormsModule, LoaderComponent,
    NavbarComponent,
    GalleriaModule, AvatarModule, ButtonModule,
    TimeAgoPipe
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  protected userPost: User | null = null;
  protected images: any[] | null = null;
  protected postUuid: string = "";
  protected post: Post | null = null;
  protected isLoading: boolean = true;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private storageService: StorageService,
  ) {
    let uuid = this.actRoute.snapshot.paramMap.get('uuid');
    this.postUuid = <string>uuid;
  }

  async ngOnInit() {
    let postResponse = await this.postService.get(this.postUuid);

    let response = postResponse as ApiResponse<{
      post: Post
    }>;

    console.log(response);

    if (response) {
      if (response.data) {
        this.post = response.data.post;

        let userResponse = await this.userService.get(this.post.user_id);

        if (userResponse) {
          let responseAux = userResponse as ApiResponse<{
            user: User
          }>;

          if (responseAux.data) {
            this.userPost = responseAux.data.user;
          }
        }
      }
    }

    if (this.post && this.post.images_url) {
      this.images = [];
      for (const imageUrl of this.post.images_url) {
        this.images?.push({
          'itemImageSrc': this.storageService.getImage(imageUrl)
        });
      }
    }

    setTimeout(() => {
      this.isLoading = false;
    }, 3000);

  }

  protected getImage(imageUrl: string) {
    return this.storageService.getImage(imageUrl);
  }

  protected update(uuid: string) {
    this.router.navigateByUrl(`posts/${uuid}/edit`);
  }

  protected async delete(uuid: string) {
    let response = await this.postService.delete(uuid);
    console.log(response);
    this.router.navigateByUrl(`posts`);
  }


}

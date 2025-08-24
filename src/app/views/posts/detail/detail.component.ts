import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../../services/posts/post.service';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../../services/storage/storage.service';
import { UserService } from '../../../services/users/user.service';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TimeAgoPipe } from '../../../pipes/time-ago.pipe';
import { ApiResponse } from '../../../interfaces/api-response';
import { Post } from '../../../models/post/post';
import { User } from '../../../models/user/user';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { PostDetailSkeletonComponent } from '../../../components/skeleton/post-detail-skeleton/post-detail-skeleton.component';
import { LoaderComponent } from '../../../components/animations/loader/loader.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    FormsModule, RouterLink,
    NavbarComponent, PostDetailSkeletonComponent,LoaderComponent,
    GalleriaModule, AvatarModule, ButtonModule,
    TimeAgoPipe
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  protected userPost: User | null = null;
  protected images: any[] | null = null;
  protected slug: string = "";
  protected post: Post | null = null;
  protected isLoading: boolean = true;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private storageService: StorageService,
  ) {
    let slug = this.actRoute.snapshot.paramMap.get('slug');
    this.slug = <string>slug;
  }

  async ngOnInit() {
    let postResponse = await this.postService.get(this.slug);

    let response = postResponse as ApiResponse<{
      post: Post
    }>;

    if (response) {
      if (response.data) {
        this.post = response.data.post;

        let userResponse = await this.userService.get(this.post.user_uuid);

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

  }

  protected getImage(imageUrl: string) {
    return this.storageService.getImage(imageUrl);
  }

  protected update(uuid: string) {
    this.router.navigateByUrl(`posts/${uuid}/edit`);
  }

  protected async delete(uuid: string) {
    let response = await this.postService.delete(uuid);
    this.router.navigateByUrl(`posts`);
  }

  redirectUserProfile() {
    this.router.navigateByUrl(`profile/${this.userPost?.uuid}`);
  }

}

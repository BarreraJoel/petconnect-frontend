import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../../services/users/user.service';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { User } from '../../../models/user/user';
import { ApiResponse } from '../../../interfaces/api-response';
import { StorageService } from '../../../services/storage/storage.service';
import { PostService } from '../../../services/posts/post.service';
import { ListComponent } from '../../../components/posts/list/list.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { TabComponent } from '../../../components/tab/tab.component';
import { UserAccountSkeletonComponent } from '../../../components/skeleton/user-account-skeleton/user-account-skeleton.component';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    FormsModule, TabComponent,
    NavbarComponent, ListComponent, UserAccountSkeletonComponent,
    AvatarModule, ButtonModule,
    RouterLink
],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  protected user: User | null = null;
  protected userUuid: string;
  protected postsPaginate: any | null = null;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private userService: UserService,
    protected authService: AuthService,
    private storageService: StorageService,
    private postService: PostService,
  ) {
    let uuid = this.actRoute.snapshot.paramMap.get('uuid');
    this.userUuid = <string>uuid;
  }

  async ngOnInit() {
    if (!this.authService.userLogin) {
      await this.authService.loadUser();
    }
    await this.loadPosts();
    await this.loadUser();
  }

  private async loadUser() {
    let response = await this.userService.get(this.userUuid);
    if (response) {
      let userResponse = response as ApiResponse<{
        user: User
      }>;

      if (userResponse && userResponse.data) {
        this.user = userResponse.data.user;
      }
    }
  }

  private async loadPosts() {
    let responsePosts = await this.postService.getByUserId(this.userUuid);
    let postsResponse = responsePosts as ApiResponse<{
      posts: any
    }>;

    if (postsResponse && postsResponse.data) {
      this.postsPaginate = postsResponse.data.posts.total > 0 ? postsResponse.data.posts : null;
    }
    console.log(postsResponse.data);

  }

  protected getImagePath(url: string) {
    return this.storageService.getImage(url);
  }


}

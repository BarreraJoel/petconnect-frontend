import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { PostTableComponent } from '../../../components/table/post-table/post-table.component';
import { AuthService } from '../../../services/auth/auth.service';
import { PostService } from '../../../services/posts/post.service';
import { ApiResponse } from '../../../interfaces/api-response';

@Component({
  selector: 'app-post-list-account',
  standalone: true,
  imports: [
    PostTableComponent, NavbarComponent,
  ],
  templateUrl: './post-list-account.component.html',
  styleUrl: './post-list-account.component.css'
})
export class PostListAccountComponent {

    protected postsPaginate: any | null = null;
  
  constructor(
    protected authService: AuthService,
    private postService: PostService,
  ) { }

  async ngOnInit() {
    if (!this.authService.userLogin) {
      await this.authService.loadUser();
    }
    await this.loadPosts();
  }

  private async loadPosts() {
    if (this.authService.userLogin) {
      let responsePosts = await this.postService.getByUserId(this.authService.userLogin.uuid);
      let postsResponse = responsePosts as ApiResponse<{
        posts: any
      }>;

      if (postsResponse && postsResponse.data) {
        this.postsPaginate = postsResponse.data.posts.total > 0 ? postsResponse.data.posts : null;
      }
      console.log(postsResponse.data);
    }

  }

}

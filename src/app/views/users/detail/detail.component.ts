import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UserService } from '../../../services/users/user.service';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { User } from '../../../models/user/user';
import { ApiResponse } from '../../../interfaces/api-response';
import { StorageService } from '../../../services/storage/storage.service';
import { SkeletonComponent } from '../../../components/skeleton/skeleton.component';
import { PostService } from '../../../services/posts/post.service';
import { ListComponent } from '../../../components/posts/list/list.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { PostListTableComponent } from '../../../components/table/post-list-table/post-list-table.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { TabComponent } from '../../../components/tab/tab.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    FormsModule, RouterOutlet, TabComponent,
    SkeletonComponent, NavbarComponent, PostListTableComponent, ModalComponent, ListComponent,
    AvatarModule, ButtonModule,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  protected user: User | null = null;
  private userUuid: string;
  protected postsPaginate: any | null = null;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private userService: UserService,
    private storageService: StorageService,
    private postService: PostService,
  ) {
    let uuid = this.actRoute.snapshot.paramMap.get('uuid');
    this.userUuid = <string>uuid;
  }

  async ngOnInit() {
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

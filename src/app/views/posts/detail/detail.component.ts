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

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    FormsModule,LoaderComponent,
    NavbarComponent,
    GalleriaModule, AvatarModule, ButtonModule,
    TimeAgoPipe
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  protected userPost: any;
  protected images: any[] | null = null;
  protected postUuid: string = "";
  protected post: any;
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
    this.post = postResponse.data.post;

    let userResponse = await this.userService.get(this.post.user_id);
    this.userPost = userResponse.data.user;

    if (this.post.images_url) {
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

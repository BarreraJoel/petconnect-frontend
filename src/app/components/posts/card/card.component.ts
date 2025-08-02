import { UpperCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { UserService } from '../../../services/users/user.service';
import { PostTypeEnumPipe } from '../../../pipes/post-type-enum.pipe';
import { PostTypeTagPipe } from '../../../pipes/post-type-tag.pipe';
import { TimeAgoPipe } from '../../../pipes/time-ago.pipe';
import { StorageService } from '../../../services/storage/storage.service';
import { SkeletonModule } from 'primeng/skeleton';
import { ApiResponse } from '../../../interfaces/api-response';
import { User } from '../../../models/user/user';

@Component({
  selector: 'post-card',
  standalone: true,
  imports: [
    UpperCasePipe, TruncatePipe, PostTypeEnumPipe, PostTypeTagPipe, TimeAgoPipe,
    ButtonModule, CardModule, AvatarModule, TagModule, SkeletonModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {

  @Input() post: any;
  protected userPost: any;
  protected users: User[] | null = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private storageService: StorageService,
  ) { }

  async ngOnInit() {
    let userResponse = await this.userService.getAll();
    console.log(userResponse);

    if (userResponse) {

      let response = userResponse as ApiResponse<{
        users: User[]
      }>;

      if (response.data) {
        this.users = response.data?.users;
        if (this.users) {
          this.findUser(this.users, this.post.user_id);
        }
      }
    }
  }

  protected detail(uuid: string) {
    this.router.navigateByUrl(`posts/${uuid}`);
  }

  protected getImagePath(url:string) {
    return this.storageService.getImage(url);
  }

  protected findUser(users: any[], uuid: string) {
    for (const user of users) {
      if (user.uuid == uuid) {
        this.userPost = user;
        break;
      }
    }
  }


}

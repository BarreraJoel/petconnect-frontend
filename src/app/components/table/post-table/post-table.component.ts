import { Component, Input } from '@angular/core';
import { PaginateService } from '../../../services/paginate.service';
import { ApiResponse } from '../../../interfaces/api-response';
import { Post } from '../../../models/post/post';
import { PostTypeEnumPipe } from '../../../pipes/post-type-enum.pipe';
import { DatePipe } from '@angular/common';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { PaginatorModule } from 'primeng/paginator';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostTypeTagPipe } from '../../../pipes/post-type-tag.pipe';

@Component({
  selector: 'post-table',
  standalone: true,
  imports: [
    PostTypeEnumPipe, DatePipe, TruncatePipe, PostTypeTagPipe,
    PaginatorModule,
    RouterLink,
  ],
  templateUrl: './post-table.component.html',
  styleUrl: './post-table.component.css'
})
export class PostTableComponent {

  @Input() postsPaginate: any | null = null;
  protected username: string;

  constructor(
    private paginateService: PaginateService,
    private actRoute: ActivatedRoute,
  ) {
    let username = this.actRoute.snapshot.paramMap.get('username');
    this.username = <string>username;
  }

  protected async onPageChange(event: any) {
    for (const link of this.postsPaginate.links) {
      if (<number>link.label == event.page + 1) {
        await this.changePostPaginate(link.url);
        break;
      }
    }
  }

  private async changePostPaginate(urlPage: string) {
    let response = await this.paginateService.getData(urlPage);
    let postResponse = response as ApiResponse<{
      posts: Post[]
    }>;
    if (postResponse && postResponse.data) {
      this.postsPaginate = postResponse.data.posts;
      console.log(this.postsPaginate);

    }
  }

}


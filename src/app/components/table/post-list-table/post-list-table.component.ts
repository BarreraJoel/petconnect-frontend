import { Component, Input } from '@angular/core';
import { PostTypeEnumPipe } from '../../../pipes/post-type-enum.pipe';
import { DatePipe } from '@angular/common';
import { ApiResponse } from '../../../interfaces/api-response';
import { Post } from '../../../models/post/post';
import { PaginateService } from '../../../services/paginate.service';
import { PaginatorModule } from 'primeng/paginator';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../../../pipes/truncate.pipe';

@Component({
  selector: 'post-list-table',
  standalone: true,
  imports: [
    PostTypeEnumPipe, DatePipe,TruncatePipe,
    PaginatorModule,
    RouterLink,
  ],
  templateUrl: './post-list-table.component.html',
  styleUrl: './post-list-table.component.css'
})
export class PostListTableComponent {

  @Input() postsPaginate: any | null = null;

  constructor(private paginateService: PaginateService) { }

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

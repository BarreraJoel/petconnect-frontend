import { Component, Input } from '@angular/core';
import { Post } from '../../../models/post/post';
import { CardComponent } from '../card/card.component';
import { PaginatorModule } from 'primeng/paginator';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginateService } from '../../../services/paginate.service';
import { ApiResponse } from '../../../interfaces/api-response';


@Component({
  selector: 'list-posts',
  standalone: true,
  imports: [
    CardComponent,
    FormsModule,
    ButtonModule, Select, PaginatorModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  protected sortOptions: {
    name: string;
    code: string;
  }[] | undefined = [
      { name: 'Más antiguo a más reciente', code: '' },
      { name: 'Más reciente a más antiguo', code: '' },
      { name: 'A a Z', code: '' },
      { name: 'Z a A', code: '' },
    ];

  protected selectedOption: {
    name: string;
    code: string;
  } | undefined;

  @Input() postsPaginate: any | null = null;

  constructor(
    private router: Router,
    private paginateService: PaginateService,
  ) { }

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

  protected redirect(route: string) {
    this.router.navigateByUrl(route);
  }
}

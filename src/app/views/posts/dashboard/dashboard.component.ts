import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/posts/post.service';
import { Router } from '@angular/router';
import { CardComponent } from '../../../components/posts/card/card.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { PaginatorModule } from 'primeng/paginator';
import { PaginateService } from '../../../services/paginate.service';
import { ApiResponse } from '../../../interfaces/api-response';
import { Post } from '../../../models/post/post';
import { SkeletonComponent } from '../../../components/skeleton/skeleton.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { ListComponent } from '../../../components/posts/list/list.component';

interface Option {
  name: string;
  code: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CardComponent, SkeletonComponent, ListComponent,
    ButtonModule, Select, PaginatorModule,
    FormsModule, NavbarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  protected sortOptions: Option[] | undefined = [
    { name: 'Más antiguo a más reciente', code: '' },
    { name: 'Más reciente a más antiguo', code: '' },
    { name: 'A a Z', code: '' },
    { name: 'Z a A', code: '' },
  ];
  protected selectedCity: Option | undefined;
  protected postsPaginate: any | null = null;
  protected isLoading: boolean = true;

  constructor(
    private postService: PostService,
    private paginateService: PaginateService,
    private router: Router,
  ) { }

  async ngOnInit() {
    await this.postService.loadPosts();
    this.postsPaginate = this.postService.posts;
  }

  protected redirect(route: string) {
    this.router.navigateByUrl(route);
  }

  protected async onPageChange(event: any) {
    this.isLoading = true;
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
    }
  }



}

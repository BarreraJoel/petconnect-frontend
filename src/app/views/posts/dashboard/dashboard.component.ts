import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/posts/post.service';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { ListComponent } from '../../../components/posts/list/list.component';
import { LoaderComponent } from '../../../components/animations/loader/loader.component';

interface Option {
  name: string;
  code: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ListComponent, LoaderComponent,
    ButtonModule, PaginatorModule,
    FormsModule, NavbarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  protected postsPaginate: any | null = null;

  constructor(
    private postService: PostService,
  ) { }

  async ngOnInit() {
    if (!this.postService.posts) {
      console.log('entra');
      
      await this.postService.loadPosts();
      this.postsPaginate = this.postService.posts;
    }
  }


}

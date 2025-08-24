import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from '../../../environments/environment.development';
import { StorePostDto } from '../../interfaces/post/store-post-dto';
import { UpdatePostDto } from '../../interfaces/post/update-post-dto';
import { Post } from '../../models/post/post';
import { ApiResponse } from '../../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public posts: any[] | null = null;

  constructor(private apiService: ApiService) { }

  public async loadPosts() {
    if (!this.posts) {
      let response = await this.getAll();
      let postsResponse = response as ApiResponse<{
        posts: Post[]
      }>;
      if (postsResponse && postsResponse.data) {
        this.posts = postsResponse.data.posts;
      }
    }
  }

  public async getAll() {
    return this.apiService.get(`${environment.backend.apiV1Host}/posts`, environment.backend.optionsApi.cookies);
  }

  public async get(slug: string) {
    return this.apiService.get(`${environment.backend.apiV1Host}/posts/${slug}`, environment.backend.optionsApi.cookies);
  }

  public async getByUserId(uuid: string) {
    return this.apiService.get(`${environment.backend.apiV1Host}/posts/user/${uuid}`, environment.backend.optionsApi.cookies);
  }

  public async insert(dto: any) {
    return this.apiService.post(`${environment.backend.apiV1Host}/posts`, dto, environment.backend.optionsApi.cookies);
  }

  public async update(dto: UpdatePostDto, uuid: string) {
    return this.apiService.put(`${environment.backend.apiV1Host}/posts/${uuid}`, dto, environment.backend.optionsApi.cookies);
  }

  public async delete(uuid: string) {
    return this.apiService.delete(`${environment.backend.apiV1Host}/posts/${uuid}`, environment.backend.optionsApi.cookies);
  }



}

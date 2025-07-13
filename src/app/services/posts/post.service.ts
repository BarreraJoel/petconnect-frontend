import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { StorePostDto } from '../../interfaces/post/store-post-dto';
import { UpdatePostDto } from '../../interfaces/post/update-post-dto';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private apiService: ApiService<any>) { }

  public async getAll() {
    return firstValueFrom(this.apiService.get(`${environment.backend.apiV1Host}/posts`));
  }

  public async get(uuid: string) {
    return firstValueFrom(this.apiService.get(`${environment.backend.apiV1Host}/posts/${uuid}`));
  }

  public async insert(dto: any) {
    return firstValueFrom(this.apiService.post(`${environment.backend.apiV1Host}/posts`, dto));
  }

  public async update(dto: UpdatePostDto, uuid: string) {
    return firstValueFrom(this.apiService.put(`${environment.backend.apiV1Host}/posts/${uuid}`, dto));
  }

  public async delete(uuid: string) {
    return firstValueFrom(this.apiService.delete(`${environment.backend.apiV1Host}/posts/${uuid}`));
  }



}

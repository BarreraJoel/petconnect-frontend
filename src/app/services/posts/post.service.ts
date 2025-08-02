import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from '../../../environments/environment.development';
import { StorePostDto } from '../../interfaces/post/store-post-dto';
import { UpdatePostDto } from '../../interfaces/post/update-post-dto';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private apiService: ApiService, private cookieService: CookieService) { }

  private createOptions() {
    return {
      headers: {
        Accept: 'application/json',
        'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN') ?? '',
      },
      withCredentials: true
      // responseType: 'json',
    }
  }

  public async getAll() {    
    return this.apiService.get(`${environment.backend.apiV1Host}/posts`, this.createOptions());
  }

  public async get(uuid: string) {
    return this.apiService.get(`${environment.backend.apiV1Host}/posts/${uuid}`, this.createOptions());
  }

  public async insert(dto: any) {
    return this.apiService.post(`${environment.backend.apiV1Host}/posts`, dto, this.createOptions());
  }

  public async update(dto: UpdatePostDto, uuid: string) {
    return this.apiService.put(`${environment.backend.apiV1Host}/posts/${uuid}`, dto, this.createOptions());
  }

  public async delete(uuid: string) {
    return this.apiService.delete(`${environment.backend.apiV1Host}/posts/${uuid}`, this.createOptions());
  }



}

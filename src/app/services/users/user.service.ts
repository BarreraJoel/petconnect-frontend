import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from '../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService, private cookieService: CookieService) { }

  private createOptions() {
    return {
      headers: {
        Accept: 'application/json',
        'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN') ?? '',
      },
      withCredentials: true
    }
  }

  public async getAll() {
    return this.apiService.get(`${environment.backend.apiV1Host}/users`, this.createOptions());
  }

  public async get(uuid: string) {
    return this.apiService.get(`${environment.backend.apiV1Host}/users/${uuid}`, this.createOptions());
  }
}

import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../api/api.service';
import { environment } from '../../../environments/environment.development';
import { UserDto } from '../../interfaces/user/user-dto';
import { UserAuthDto } from '../../interfaces/user/user-auth-dto';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  public async login(dto: UserAuthDto) {
    return this.apiService.post(`${environment.backend.apiV1Host}/auth/login`, dto, this.createOptions());
  }

  public async register(dto: UserDto) {
    return this.apiService.post(`${environment.backend.apiV1Host}/auth/register`, dto, this.createOptions());
  }

  public async user() {
    return this.apiService.get(`${environment.backend.apiV1Host}/auth/user`, this.createOptions());
  }

  public async logout() {
    return this.apiService.get(`${environment.backend.apiV1Host}/auth/logout`, this.createOptions());
  }

  public async sanctum() {
    await this.apiService.get(`${environment.backend.host}/sanctum/csrf-cookie`, this.createOptions());
  }
}

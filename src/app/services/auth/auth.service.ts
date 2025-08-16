import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from '../../../environments/environment.development';
import { UserDto } from '../../interfaces/user/user-dto';
import { UserAuthDto } from '../../interfaces/user/user-auth-dto';
import { User } from '../../models/user/user';
import { ApiResponse } from '../../interfaces/api-response';
import { CookieService } from '../cookies/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userLogin: User | null = null;

  constructor(private apiService: ApiService) { }

  public async loadUser() {
    if (!this.userLogin) {
      let response = await this.user();
      let userLogResponse = response as ApiResponse<{
        user: User
      }>;

      if (userLogResponse && userLogResponse.data) {
        this.userLogin = userLogResponse.data.user;
      }
    }
  }

  public async login(dto: UserAuthDto) {
    return this.apiService.post(`${environment.backend.apiV1Host}/auth/login`, dto, {
      headers: {
        Accept: 'application/json',
        'X-XSRF-TOKEN': CookieService.getCookie('XSRF-TOKEN') ?? '',
      },
      withCredentials: true
    });
  }

  public async register(dto: UserDto) {
    return this.apiService.post(`${environment.backend.apiV1Host}/auth/register`, dto, environment.backend.optionsApi.cookies);
  }

  public async user() {
    try {
      return this.apiService.get(`${environment.backend.apiV1Host}/auth/user`, environment.backend.optionsApi.cookies);
    } catch (error) {
      this.userLogin = null;
      return null;
    }
  }

  public async logout() {
    return this.apiService.get(`${environment.backend.apiV1Host}/auth/logout`, environment.backend.optionsApi.cookies);
  }

  public async sanctum() {
    await this.apiService.get(`${environment.backend.host}/sanctum/csrf-cookie`, environment.backend.optionsApi.cookies);
  }
}

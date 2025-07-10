import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../api/api.service';
import { environment } from '../../../environments/environment.development';
import { UserDto } from '../../interfaces/userDto';
import { UserAuthDto } from '../../interfaces/userAuthDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService<any>) { }

  public async login(userAuthDto: UserAuthDto) {
    return firstValueFrom(this.apiService.post(`${environment.backend.apiV1Host}/auth/login`, userAuthDto));
  }

  public async register(userDto: UserDto) {
    return firstValueFrom(this.apiService.post(`${environment.backend.apiV1Host}/auth/register`, userDto));
  }

  public async user() {
    return firstValueFrom(this.apiService.get(`${environment.backend.apiV1Host}/auth/user`));
  }

  public async logout() {
    return firstValueFrom(this.apiService.get(`${environment.backend.apiV1Host}/auth/logout`));
  }

  public async sanctum() {
    await firstValueFrom(this.apiService.get(`${environment.backend.host}/sanctum/csrf-cookie`));
  }
}

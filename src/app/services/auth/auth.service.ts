import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../api/api.service';
import { environment } from '../../../environments/environment.development';
import { UserDto } from '../../interfaces/user/user-dto';
import { UserAuthDto } from '../../interfaces/user/user-auth-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService<any>) { }

  public async login(dto: UserAuthDto) {
    return firstValueFrom(this.apiService.post(`${environment.backend.apiV1Host}/auth/login`, dto));
  }

  public async register(dto: UserDto) {
    return firstValueFrom(this.apiService.post(`${environment.backend.apiV1Host}/auth/register`, dto));
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

import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from '../../../environments/environment.development';
import { User } from '../../models/user/user';
import { ApiResponse } from '../../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users: User[] | null = null;

  constructor(private apiService: ApiService) { }

  public async loadUsers() {
    let response = await this.getAll();
    let userResponse = response as ApiResponse<{
      users: User[]
    }>;

    if (userResponse && userResponse.data) {
      this.users = userResponse.data.users;
    }
  }

  public async getAll() {
    return this.apiService.get(`${environment.backend.apiV1Host}/users`, environment.backend.optionsApi.cookies);
  }

  public async get(uuid: string) {
    return this.apiService.get(`${environment.backend.apiV1Host}/users/${uuid}`, environment.backend.optionsApi.cookies);
  }

  public async update(uuid: string, dto: any) {
    return this.apiService.put(`${environment.backend.apiV1Host}/users/${uuid}`, dto, environment.backend.optionsApi.cookies);
  }
}

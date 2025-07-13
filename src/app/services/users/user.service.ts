import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService<any>) { }

  public async getAll() {
    return firstValueFrom(this.apiService.get(`${environment.backend.apiV1Host}/users`));
  }

  public async get(uuid: string) {
    return firstValueFrom(this.apiService.get(`${environment.backend.apiV1Host}/users/${uuid}`));
  }
}

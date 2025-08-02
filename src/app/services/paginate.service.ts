import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginateService {

  constructor(private apiService: ApiService) { }

  public async getData(url: string) {
    return this.apiService.get(url, {
      headers: {}
    });
  }

}

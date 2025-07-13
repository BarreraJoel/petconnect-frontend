import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginateService {

  constructor(private apiService: ApiService<any>) { }

  public async getData(url: string) {
    return firstValueFrom(this.apiService.get(url));
  }

}

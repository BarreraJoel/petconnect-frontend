import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { firstValueFrom } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PaginateService {

  constructor(private apiService: ApiService, private cookieService: CookieService,) { }

  public async getData(url: string) {
    return this.apiService.get(url, {
      headers: {
        Accept: 'application/json',
        'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN') ?? '',
      },
      withCredentials: true
    });
  }

}

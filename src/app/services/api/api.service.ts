import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from '../cookies/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {

  constructor(private httpClientService: HttpClient,) { }

  private createOptions() {
    return {
      headers: {
        Accept: 'application/json',
        'X-XSRF-TOKEN': CookieService.getCookie('XSRF-TOKEN') ?? '',
      },
      withCredentials: true
    }
  }

  public get(url: string) {
    return this.httpClientService.get<T>(url, this.createOptions());
  }

  public post(url: string, body: any) {
    return this.httpClientService.post<T>(url, body, this.createOptions());
  }

  public put(url: string, body: any) {
    return this.httpClientService.put<T>(url, body, this.createOptions());
  }

  public delete(url: string) {
    return this.httpClientService.delete(url, this.createOptions());
  }
}

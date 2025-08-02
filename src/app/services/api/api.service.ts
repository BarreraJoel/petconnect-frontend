import { HttpClient, withFetch } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse } from '../../interfaces/api-response';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClientService: HttpClient,) { }

  public async get(url: string, options: {
    headers: any,
    withCredentials?: boolean,
    responseType?: 'json',
  }) {
    return firstValueFrom(this.httpClientService.get(url, options));
  }

  public post(url: string, body: any, options: {
    headers: any,
    withCredentials?: boolean,
    responseType?: 'json',
  }) {
    return firstValueFrom(this.httpClientService.post(url, body, options));
  }

  public put(url: string, body: any, options: {
    headers: any,
    withCredentials?: boolean,
    responseType?: 'json',
  }) {
    return firstValueFrom(this.httpClientService.put(url, body, options));
  }

  public delete(url: string, options: {
    headers: any,
    withCredentials?: boolean,
    responseType?: 'json',
  }) {
    return firstValueFrom(this.httpClientService.delete(url, options));
  }
}

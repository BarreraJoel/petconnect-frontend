import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private apiService: ApiService<any>) { }

  public getImage(imageUrl: string) {
    return `${environment.backend.host}/storage/${imageUrl}`;
  }

  // public get(imageUrl: string) {
  //   // return firstValueFrom(this.apiService.get(`${environment.backend.apiV1Host}/storage/${imageUrl}`));
  //   return firstValueFrom(this.apiService.get(`${environment.backend.host}/storage/${imageUrl}`));
  // }

}

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public getImage(imageUrl: string) {
    return `${environment.backend.host}/storage/${imageUrl}`;
  }

}

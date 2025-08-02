import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { firstValueFrom } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiGeoService {

  constructor(private apiService: ApiService, private cookieService: CookieService) { }

  private createOptions() {
    return {
      headers: {
        Accept: 'application/json',
      },
    }
  }

  public async getCities() {
    return this.apiService.get('https://apis.datos.gob.ar/georef/api/provincias?campos=nombre', this.createOptions());
  }

  public async getLocalities(province: string) {
    return this.apiService.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${province}&campos=nombre`, this.createOptions());
  }

}

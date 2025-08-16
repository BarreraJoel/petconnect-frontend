import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiGeoService {

  constructor(private apiService: ApiService) { }

  public async getCities() {
    return this.apiService.get('https://apis.datos.gob.ar/georef/api/provincias?campos=nombre',environment.backend.optionsApi.withoutCookies);
  }

  public async getLocalities(province: string) {
    return this.apiService.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${province}&campos=nombre`, environment.backend.optionsApi.withoutCookies);
  }

}

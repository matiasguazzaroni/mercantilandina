import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeorefService {

  constructor(@Inject('API_GEO_URL') private baseUrl: string, private http: HttpClient) { }

  getProvincias() {
    return this.http.get(`${this.baseUrl}/provincias`);
  }

  geMunicipios(idProvincia: string) {
    return this.http.get(`${this.baseUrl}/municipios?provincia=${idProvincia}&campos=id,nombre&max=135`);
  }
}

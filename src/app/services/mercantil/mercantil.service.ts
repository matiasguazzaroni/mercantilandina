import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MercantilService {

  constructor(@Inject('API_MA_URL') private baseUrl: string, private http: HttpClient) { }

  getMarcas() {
    return this.http.get(`${this.baseUrl}/vehiculos/marcas`);
  }

  getModelos(marca: string, fecha: string) {
    return this.http.get(`${this.baseUrl}/vehiculos/marcas/${marca}/${fecha}`);
  }

  getVersiones(marca: string, fecha: string, modelo: string) {
    return this.http.get(`${this.baseUrl}/vehiculos/marcas/${marca}/${fecha}/${modelo}`);
  }

}

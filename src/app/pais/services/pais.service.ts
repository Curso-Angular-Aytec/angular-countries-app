import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})

export class PaisService {
  private apiUrlPais: string = 'https://restcountries.com/v3.1/name/';
  private apiUrlCapital: string = 'https://restcountries.com/v3.1/capital/';
  private apiUrlCode: string = 'https://restcountries.com/v3.1/alpha/';
  private apiUrlRegion: string = 'https://restcountries.com/v2/regionalbloc/';

  get httpParams() {
    return new HttpParams().set('fields', 'name,capital,alpha2Code,flags,population');
  }
  constructor(private http: HttpClient) {}

  buscarPais(termino: string): Observable<Country[]> {
    const url = `${this.apiUrlPais}${termino}`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  buscarCapital(termino: string): Observable<Country[]> {
    const url = `${this.apiUrlCapital}${termino}`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  getPaisPorCodigo(id: string): Observable<Country> {
    const url = `${this.apiUrlCode}${id}`;
    return this.http.get<Country>(url);
  }

  buscarRegion(region: string): Observable<Country[]> {
    const url = `${this.apiUrlRegion}${region}`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }
}
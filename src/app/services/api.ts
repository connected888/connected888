import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Api {

  private baseUrl = environment.apiUrl;

  private jsonUrl = '/jsons/countries.json';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}api/users`);
  }


    getCountries(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
  
}

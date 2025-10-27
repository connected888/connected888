import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DonateService {
  url="https://dev-connected888.up.railway.app/api/users"
  constructor(private http:HttpClient)
  {}
  hdata:any=null

getData()
{
    return this.http.get(this.url);
}

}

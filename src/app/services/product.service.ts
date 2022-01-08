import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

const baseUrl = 'https://localhost:44344/api/Products';
const baseUrl1 = 'https://localhost:44344/api/Categories';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getAll():Observable<any>{
    return this.httpClient.get(baseUrl1);
  }

  readAll():Observable<any>{
    return this.httpClient.get(baseUrl);
  }

  read(id:any):Observable<any>{
    return this.httpClient.get(`${baseUrl}/${id}`);
  }

  create(data:any):Observable<any>{
    return this.httpClient.post(baseUrl,data);
  }

  update(id:any,data:any):Observable<any>{
    return this.httpClient.put(`${baseUrl}/${id}`,data);
  }

  delete(id:any):Observable<any>{
    return this.httpClient.delete(`${baseUrl}/${id}`);
  }
  
}

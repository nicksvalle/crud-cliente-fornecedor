import { Clientes } from './clientes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  url = 'http://localhost:3000/clientes'

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(this.url);
  }

  save(clientes : Clientes): Observable<Clientes>{
    return this.http.post<Clientes>(this.url, clientes);
  }

  update(clientes : Clientes): Observable<Clientes>{
    return this.http.put<Clientes>(`${this.url}/${clientes.id}`, clientes)
  }

  delete(clientes : Clientes): Observable<void>{
    return this.http.delete<void>(`${this.url}/${clientes.id}`);
  }

}

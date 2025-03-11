import { inject, Injectable } from '@angular/core';
import { EmpleadoDTO } from './empleados';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/Empleados';

  constructor() { }

  public obtenerTodos(): Observable<EmpleadoDTO[]> {
    return this.http.get<EmpleadoDTO[]>(this.urlBase);
  }
}

import { inject, Injectable } from '@angular/core';
import { EmpleadoCreacionDTO, EmpleadoDTO } from './empleados';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/Empleados';

  constructor() { }

  public obtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<EmpleadoDTO[]>> {
    let queryParams  = construirQueryParams(paginacion);
    return this.http.get<EmpleadoDTO[]>(this.urlBase, {params: queryParams, observe: 'response'});
  }

  public ObtenerPorId(id: number): Observable<EmpleadoDTO> {
    return this.http.get<EmpleadoDTO>(`${this.urlBase}/${id}`);
  }

  public actualizar(id: number, empleado: EmpleadoCreacionDTO) {
    return this.http.put(`${this.urlBase}/${id}`, empleado);
  }

  public crear(empleado: EmpleadoCreacionDTO) {
    return this.http.post(this.urlBase, empleado);
  }

  public borrar(id: number)
  {
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}

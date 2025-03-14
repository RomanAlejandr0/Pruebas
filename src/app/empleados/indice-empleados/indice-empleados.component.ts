import { Component, inject, Inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '../../compartidos/modal/modal.component';
import { NgFor, NgIf } from '@angular/common';
import { EmpleadosService } from '../empleados.service';
import { environment } from '../../../environments/environment';
import { EmpleadoDTO } from '../empleados';
import { HttpResponse } from '@angular/common/http';
import { PaginacionDTO } from '../../compartidos/modelos/PaginacionDTO';

interface Empleado {
  id: number;
  nomina: string;
  nombre: string;
  fechaIngreso: string;
  area: string;
  // tipoEmpleado: string;
  puesto: string;
  categoria?: string;
}

// export interface Employee {
//   id?: number;
//   nombre: string;
//   numeroNomina: string;
//   area: string;
//   tipoEmpleado: 'Sindicalizado' | 'NoSindicalizado';
//   categoria?: string;
// }

@Component({
  selector: 'app-indice-empleados',
  imports: [RouterLink, NgFor, NgIf, ModalComponent],
  templateUrl: './indice-empleados.component.html',
  styleUrls: ['./indice-empleados.component.css']
})
export class IndiceEmpleadosComponent {

  empleadosService = inject(EmpleadosService);
  empleados2!: EmpleadoDTO[];
  columnasAMostrar = ['id', 'nombre', 'acciones'];

  paginacion: PaginacionDTO = { pagina: 1, recordsPorPagina: 5 };
  cantidadTotalRegistros!: number;
  cantidadPaginas!: number;

  constructor() {
    this.cargarEmpleados();
  }


  cargarEmpleados() {
    this.empleadosService.obtenerPaginado(this.paginacion).subscribe((respuesta: HttpResponse<EmpleadoDTO[]>) => {
      this.empleados2 = respuesta.body as EmpleadoDTO[];
      const cabecera = respuesta.headers.get("cantidad-total-registros") as string;
      this.cantidadTotalRegistros = parseInt(cabecera, 10);
    });
  }

  // Calcula el índice del primer registro de la página actual
  get inicioRegistro(): number {
    return this.cantidadTotalRegistros === 0 ? 0 : (this.paginacion.pagina - 1) * this.paginacion.recordsPorPagina + 1;
  }

  // Calcula el índice del último registro que se muestra en la página actual
  get finRegistro(): number {
    return Math.min(this.inicioRegistro + this.empleados2.length - 1, this.cantidadTotalRegistros);
  }


  // Función para calcular el total de páginas
  totalPaginas(): number {
    return Math.ceil(this.cantidadTotalRegistros / this.paginacion.recordsPorPagina);
  }

  // Actualizar la paginación según la dirección: 'anterior' o 'siguiente'
  actualizarPaginacion(direccion: 'anterior' | 'siguiente') {
    if (direccion === 'anterior' && this.paginacion.pagina > 1) {
      this.paginacion.pagina--;
      this.cargarEmpleados();
    } else if (direccion === 'siguiente' && this.paginacion.pagina < this.totalPaginas()) {
      this.paginacion.pagina++;
      this.cargarEmpleados();
    }
  }


  borrar(id: number) {
    const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar este empleado?');

    if (confirmacion) {
      this.empleadosService.borrar(id)
        .subscribe(() => {
          this.paginacion = { pagina: 1, recordsPorPagina: 5 };
          this.cargarEmpleados();
        })
    }
  }



  empleados: Empleado[] = [
    {
      id: 1,
      nomina: '12345',
      nombre: 'Juan Pérez',
      fechaIngreso: '15/03/2021',
      area: 'Fundición',
      puesto: 'Supervisor'
    },
    {
      id: 2,
      nomina: '67890',
      nombre: 'María Rodríguez',
      fechaIngreso: '04/08/2019',
      area: 'IT',
      puesto: 'Desarrollador'
    },
    {
      id: 3,
      nomina: '23456',
      nombre: 'Carlos González',
      fechaIngreso: '22/11/2020',
      area: 'Mantenimiento',
      puesto: 'Técnico'
    },
    {
      id: 4,
      nomina: '78901',
      nombre: 'Ana López',
      fechaIngreso: '10/05/2022',
      area: 'Recursos Humanos',
      puesto: 'Coordinador'
    },
    {
      id: 5,
      nomina: '34567',
      nombre: 'Roberto Sánchez',
      fechaIngreso: '03/02/2023',
      area: 'Ventas',
      puesto: 'Gerente'
    },
    {
      id: 6,
      nomina: '89012',
      nombre: 'Laura Martínez',
      fechaIngreso: '18/07/2021',
      area: 'Calidad',
      puesto: 'Inspector'
    },
  ];

  empleadosFiltrados: Empleado[] = [];
  terminoBusqueda: string = '';
  router: any;


  ngOnInit(): void {
    this.empleadosFiltrados = [...this.empleados];
  }

  buscarEmpleados(event: any): void {
    const termino = event.target.value.toLowerCase();
    this.terminoBusqueda = termino;

    if (!termino) {
      this.empleadosFiltrados = [...this.empleados];
      return;
    }

    this.empleadosFiltrados = this.empleados.filter(empleado =>
      empleado.nombre.toLowerCase().includes(termino) ||
      empleado.nomina.includes(termino)
    );
  }

  verPerfil(id: number): void {
    console.log(`Ver perfil del empleado con ID: ${id}`);
    // Aquí implementarías la navegación al perfil
    // this.router.navigate(['/empleados', id]);
  }

  editarEmpleado(id: number): void {
    console.log(`Editar empleado con ID: ${id}`);
    // Aquí implementarías la navegación a la edición
    // this.router.navigate(['/empleados/editar', id]);
  }

  eliminarEmpleado(id: number): void {
    console.log(`Eliminar empleado con ID: ${id}`);
    // Aquí implementarías la lógica para eliminar
    if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      // this.empleadoService.eliminar(id).subscribe(...)
    }
  }

  nuevoEmpleado(): void {
    console.log('Crear nuevo empleado');
    // Aquí implementarías la navegación al formulario de creación
    // this.router.navigate(['/empleados/nuevo']);
  }

}

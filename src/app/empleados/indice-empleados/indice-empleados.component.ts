import { Component, inject, Inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '../../compartidos/modal/modal.component';
import { NgFor, NgIf } from '@angular/common';
import { FormularioEmpleadosComponent } from "../formulario-empleados/formulario-empleados.component";
import { EmpleadosService } from '../empleados.service';
import { environment } from '../../../environments/environment';

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
  imports: [RouterLink, NgFor, NgIf, ModalComponent, FormularioEmpleadosComponent],
  templateUrl: './indice-empleados.component.html',
  styleUrls: ['./indice-empleados.component.css']
})
export class IndiceEmpleadosComponent  {
  
  empleadosService = inject(EmpleadosService);

  constructor() {
    this.empleadosService.obtenerTodos().subscribe(empleados2 => {
      console.log(empleados2);
    })
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

  // @ViewChild('employeeModal') employeeModal!: ModalComponent;
  
  // employees: Employee[] = [
  //   {
  //     id: 1,
  //     nombre: 'Juan Pérez',
  //     numeroNomina: '10001',
  //     area: 'Fundición',
  //     tipoEmpleado: 'Sindicalizado',
  //     categoria: 'C'
  //   },
  //   {
  //     id: 2,
  //     nombre: 'María González',
  //     numeroNomina: '10002',
  //     area: 'Calidad',
  //     tipoEmpleado: 'Sindicalizado',
  //     categoria: 'B'
  //   },
  //   {
  //     id: 3,
  //     nombre: 'Carlos Rodríguez',
  //     numeroNomina: '20001',
  //     area: 'Mecanizado',
  //     tipoEmpleado: 'NoSindicalizado'
  //   }
  // ];
  
  // selectedEmployee: Employee | null = null;
  // isEditMode: boolean = false;
  
  // openAddModal(): void {
  //   this.selectedEmployee = null;
  //   this.isEditMode = false;
  //   this.employeeModal.open();
  // }
  
  // openEditModal(employee: Employee): void {
  //   this.selectedEmployee = { ...employee };
  //   this.isEditMode = true;
  //   this.employeeModal.open();
  // }
  
  // saveEmployee(employee: Employee): void {
  //   if (this.isEditMode) {
  //     // Actualizar empleado existente
  //     const index = this.employees.findIndex(e => e.id === employee.id);
  //     if (index !== -1) {
  //       this.employees[index] = employee;
  //     }
  //   } else {
  //     // Agregar nuevo empleado
  //     const newId = Math.max(0, ...this.employees.map(e => e.id || 0)) + 1;
  //     this.employees.push({
  //       ...employee,
  //       id: newId
  //     });
  //   }
    
  //   this.employeeModal.closeModal();
  // }
  
  // deleteEmployee(id: number): void {
  //   if (confirm('¿Está seguro que desea eliminar este empleado?')) {
  //     this.employees = this.employees.filter(e => e.id !== id);
  //   }
  // }
}

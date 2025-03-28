import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalComponent } from "../../compartidos/modal/modal.component";
import { ComponentePruebaEstilosComponent } from "../../componente-prueba-estilos/componente-prueba-estilos.component";


// interface Empleado {
//   id?: number;
//   nombre: string;
//   apellidoPaterno: string;
//   apellidoMaterno: string;
//   nomina: string;
//   fechaIngreso: string;
//   foto?: string;
//   estatusSindical: string;
//   area: string;
//   puesto: string;
// }


interface Employee {
  id: number;
  name: string;
  monthlyAbsences: {
    month: string;
    absences: number;
    justified: boolean;
  }[];
}

@Component({
  selector: 'app-indice-empleados2',
  imports: [CommonModule, ModalComponent, ComponentePruebaEstilosComponent],
  templateUrl: './indice-empleados2.component.html',
  styleUrl: './indice-empleados2.component.css'
})
export class IndiceEmpleados2Component {

  // empleados: Empleado[] = [
  //   {
  //     id: 1,
  //     nombre: 'Juan',
  //     apellidoPaterno: 'Pérez',
  //     apellidoMaterno: 'González',
  //     nomina: '10842',
  //     fechaIngreso: '2022-03-15',
  //     estatusSindical: 'Sindicalizado',
  //     area: 'Fundición',
  //     puesto: 'Operador'
  //   },
  //   {
  //     id: 2,
  //     nombre: 'María',
  //     apellidoPaterno: 'López',
  //     apellidoMaterno: 'Hernández',
  //     nomina: '10843',
  //     fechaIngreso: '2023-01-10',
  //     estatusSindical: 'No Sindicalizado',
  //     area: 'Calidad',
  //     puesto: 'Supervisor'
  //   }
  // ];

  // isModalOpen = false;
  // selectedEmpleado: Empleado | null = null;
  // modalTitle = '';

  // constructor() {}

  // openAddModal(): void {
  //   this.selectedEmpleado = null;
  //   this.modalTitle = 'Agregar Empleado';
  //   this.isModalOpen = true;
  // }

  // openEditModal(empleado: Empleado): void {
  //   this.selectedEmpleado = { ...empleado };
  //   this.modalTitle = 'Editar Empleado';
  //   this.isModalOpen = true;
  // }

  // closeModal(): void {
  //   this.isModalOpen = false;
  //   this.selectedEmpleado = null;
  // }

  // saveEmployee(empleado: Empleado): void {
  //   if (empleado.id) {
  //     this.empleados = this.empleados.map(e =>
  //       e.id === empleado.id ? empleado : e
  //     );
  //     console.log('Empleado actualizado:', empleado);
  //   } else {
  //     const newEmpleado = {
  //       ...empleado,
  //       id: this.generateId()
  //     };
  //     this.empleados.push(newEmpleado);
  //     console.log('Nuevo empleado creado:', newEmpleado);
  //   }
  // }

  // private generateId(): number {
  //   return Math.max(0, ...this.empleados.map(e => e.id || 0)) + 1;
  // }


// Lista de empleados de ejemplo
employees: Employee[] = [
  {
    id: 12345,
    name: 'Juan Pérez',
    monthlyAbsences: [
      { month: 'Oct-24', absences: 0, justified: false },
      { month: 'Nov-24', absences: 1, justified: false },
      { month: 'Dic-24', absences: 0, justified: false },
      { month: 'Ene-25', absences: 2, justified: false },
      { month: 'Feb-25', absences: 0, justified: false },
      { month: 'Mar-25', absences: 0, justified: false },
    ]
  },
  {
    id: 67890,
    name: 'María García',
    monthlyAbsences: [
      { month: 'Oct-24', absences: 1, justified: false },
      { month: 'Nov-24', absences: 1, justified: true },
      { month: 'Dic-24', absences: 0, justified: false },
      { month: 'Ene-25', absences: 0, justified: false },
      { month: 'Feb-25', absences: 0, justified: false },
      { month: 'Mar-25', absences: 1, justified: false },
    ]
  },
  {
    id: 24680,
    name: 'Carlos López',
    monthlyAbsences: [
      { month: 'Oct-24', absences: 0, justified: false },
      { month: 'Nov-24', absences: 0, justified: false },
      { month: 'Dic-24', absences: 3, justified: false },
      { month: 'Ene-25', absences: 1, justified: true },
      { month: 'Feb-25', absences: 1, justified: false },
      { month: 'Mar-25', absences: 0, justified: false },
    ]
  }
];

// Columnas de meses para la tabla
months: string[] = ['Oct-24', 'Nov-24', 'Dic-24', 'Ene-25', 'Feb-25', 'Mar-25'];

// Variables para el sidebar
sidebarOpen: boolean = false;
selectedEmployee: Employee | null = null;

// Rango de fechas para el período de evaluación
startDate: Date = new Date(2024, 9, 1); // Octubre 2024
endDate: Date = new Date(2025, 2, 31); // Marzo 2025

openAttendanceDetails(employee: Employee): void {
  this.selectedEmployee = employee;
  this.sidebarOpen = true;
}

closeSidebar(): void {
  this.sidebarOpen = false;
}

handleSaveAttendance(data: any): void {
  console.log('Guardando datos de asistencia:', data);

  // Aquí implementarías la lógica para actualizar los datos en tu sistema
  // Por ejemplo, actualizar la matriz de faltas en el empleado seleccionado

  this.closeSidebar();

  // En una aplicación real, podrías mostrar una notificación de éxito
  alert('Registro de asistencia guardado correctamente');
}

}

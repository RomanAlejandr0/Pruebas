import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalComponent } from "../../compartidos/modal/modal.component";


interface Empleado {
  id?: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nomina: string;
  fechaIngreso: string;
  foto?: string;
  estatusSindical: string;
  area: string;
  puesto: string;
}

@Component({
  selector: 'app-indice-empleados2',
  imports: [CommonModule, ModalComponent],
  templateUrl: './indice-empleados2.component.html',
  styleUrl: './indice-empleados2.component.css'
})
export class IndiceEmpleados2Component {
  empleados: Empleado[] = [
    {
      id: 1,
      nombre: 'Juan',
      apellidoPaterno: 'Pérez',
      apellidoMaterno: 'González',
      nomina: '10842',
      fechaIngreso: '2022-03-15',
      estatusSindical: 'Sindicalizado',
      area: 'Fundición',
      puesto: 'Operador'
    },
    {
      id: 2,
      nombre: 'María',
      apellidoPaterno: 'López',
      apellidoMaterno: 'Hernández',
      nomina: '10843',
      fechaIngreso: '2023-01-10',
      estatusSindical: 'No Sindicalizado',
      area: 'Calidad',
      puesto: 'Supervisor'
    }
  ];
  
  isModalOpen = false;
  selectedEmpleado: Empleado | null = null;
  modalTitle = '';
  
  constructor() {}
  
  openAddModal(): void {
    this.selectedEmpleado = null;
    this.modalTitle = 'Agregar Empleado';
    this.isModalOpen = true;
  }
  
  openEditModal(empleado: Empleado): void {
    this.selectedEmpleado = { ...empleado };
    this.modalTitle = 'Editar Empleado';
    this.isModalOpen = true;
  }
  
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedEmpleado = null;
  }
  
  saveEmployee(empleado: Empleado): void {
    if (empleado.id) {
      // Actualizar empleado existente
      this.empleados = this.empleados.map(e => 
        e.id === empleado.id ? empleado : e
      );
      console.log('Empleado actualizado:', empleado);
    } else {
      // Crear nuevo empleado
      const newEmpleado = {
        ...empleado,
        id: this.generateId()
      };
      this.empleados.push(newEmpleado);
      console.log('Nuevo empleado creado:', newEmpleado);
    }
  }
  
  private generateId(): number {
    return Math.max(0, ...this.empleados.map(e => e.id || 0)) + 1;
  }
}

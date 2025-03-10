import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Interfaz simple para el empleado
export interface Employee {
  id?: number;
  nombre: string;
  numeroNomina: string;
  area: string;
  tipoEmpleado: 'Sindicalizado' | 'NoSindicalizado';
  categoria?: string;
}

@Component({
  selector: 'app-formulario-empleados',
  imports: [NgFor, NgIf, ReactiveFormsModule, CommonModule],
  templateUrl: './formulario-empleados.component.html',
  styleUrl: './formulario-empleados.component.css'
})
export class FormularioEmpleadosComponent {
  @Input() employee: Employee | null = null;
  @Input() isEdit: boolean = false;
  @Output() save = new EventEmitter<Employee>();
  @Output() cancel = new EventEmitter<void>();
  
  employeeForm!: FormGroup;
  
  // Opciones para el dropdown
  areas: string[] = ['Fundición', 'Mecanizado', 'Hornos', 'Calidad', 'Planta 2'];
  
  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  
  createForm(): void {
    this.employeeForm = this.fb.group({
      nombre: ['', Validators.required],
      numeroNomina: ['', Validators.required],
      area: ['', Validators.required],
      tipoEmpleado: ['Sindicalizado'],
      categoria: ['A']
    });
  }
  
  // Cuando cambia el modo a editar, llenamos el formulario
  ngOnChanges(): void {
    if (this.employee && this.isEdit) {
      this.employeeForm.patchValue({
        nombre: this.employee.nombre,
        numeroNomina: this.employee.numeroNomina,
        area: this.employee.area,
        tipoEmpleado: this.employee.tipoEmpleado,
        categoria: this.employee.categoria || 'A'
      });
    }
  }
  
  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      
      // Si estamos editando, mantenemos el ID
      if (this.isEdit && this.employee) {
        formData.id = this.employee.id;
      }
      
      this.save.emit(formData);
    }
  }
  
  onCancel(): void {
    this.cancel.emit();
  }
}

import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Employee {
  id?: number;
  nombre: string;
  numeroNomina: string;
  fechaIngreso: Date;
  area: string;
  puesto: string;
  tipoEmpleado: 'Sindicalizado' | 'NoSindicalizado';
  categoria?: string; // Solo para empleados sindicalizados
}


@Component({
  selector: 'app-modal',
  imports: [NgClass, NgIf, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})

export class ModalComponent {
  @Input() title: string = '';
  @Output() close = new EventEmitter<void>();
  
  isVisible: boolean = false;
  
  open(): void {
    this.isVisible = true;
  }
  
  closeModal(): void {
    this.isVisible = false;
    this.close.emit();
  }
}

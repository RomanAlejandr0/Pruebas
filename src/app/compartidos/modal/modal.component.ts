import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  selector: 'app-modal',
  imports: [NgClass, NgIf, CommonModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  animations: [
    // trigger('backdropAnimation', [
    //   transition(':enter', [
    //     style({ opacity: 0 }),
    //     animate('300ms ease-out', style({ opacity: 1 }))
    //   ]),
    //   transition(':leave', [
    //     style({ opacity: 1 }),
    //     animate('200ms ease-in', style({ opacity: 0 }))
    //   ])
    // ]),
    // trigger('modalAnimation', [
    //   transition(':enter', [
    //     style({ opacity: 0, transform: 'translateY(4px) scale(0.95)' }),
    //     animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
    //   ]),
    //   transition(':leave', [
    //     style({ opacity: 1, transform: 'translateY(0) scale(1)' }),
    //     animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(4px) scale(0.95)' }))
    //   ])
    // ])

    trigger('backdropAnimation', [
      // Animación de entrada del fondo
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      // Animación de salida del fondo - misma duración y efecto que la entrada
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('modalAnimation', [
      // Animación de entrada del panel del modal
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(4px) scale(0.95)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ]),
      // Animación de salida - exactamente igual pero inversa que la entrada
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0) scale(1)' }),
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(4px) scale(0.95)' }))
      ])
    ])
  ]
})


export class ModalComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  @Input() empleado: Empleado | null = null;
  @Input() modalTitle = 'Agregar Empleado';
  
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveEmployee = new EventEmitter<Empleado>();

  empleadoForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  
  // Opciones para los selectores
  estatusSindicalOptions = ['Sindicalizado', 'No Sindicalizado'];
  areasOptions = ['Fundición', 'Mecanizado', 'Hornos', 'Calidad', 'Planta 2'];
  puestosOptions = ['Operador', 'Supervisor', 'Gerente', 'Administrativo'];

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2
  ) {
    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      nomina: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
      estatusSindical: ['', Validators.required],
      area: ['', Validators.required],
      puesto: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Si tenemos un empleado para editar, llenamos el formulario
    if (this.empleado) {
      this.empleadoForm.patchValue({
        nombre: this.empleado.nombre,
        apellidoPaterno: this.empleado.apellidoPaterno,
        apellidoMaterno: this.empleado.apellidoMaterno,
        nomina: this.empleado.nomina,
        fechaIngreso: this.empleado.fechaIngreso,
        estatusSindical: this.empleado.estatusSindical,
        area: this.empleado.area,
        puesto: this.empleado.puesto
      });
      
      if (this.empleado.foto) {
        this.previewUrl = this.empleado.foto;
      }
    }
    
    // Prevenir scroll cuando el modal está abierto
    if (this.isOpen) {
      this.renderer.addClass(document.body, 'overflow-hidden');
    }
  }
  
  ngOnDestroy(): void {
    // Restaurar scroll al destruir el componente
    this.renderer.removeClass(document.body, 'overflow-hidden');
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.createPreview();
    }
  }

  createPreview(): void {
    if (!this.selectedFile) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  onSubmit(): void {
    if (this.empleadoForm.valid) {
      const formData = this.empleadoForm.value;
      
      const empleadoData: Empleado = {
        ...formData,
        foto: this.previewUrl || undefined,
        id: this.empleado?.id
      };
      
      this.saveEmployee.emit(empleadoData);
      this.close();
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.empleadoForm.controls).forEach(key => {
        const control = this.empleadoForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  close(): void {
    this.isOpen = false;
    this.closeModal.emit();
    this.renderer.removeClass(document.body, 'overflow-hidden');
    this.empleadoForm.reset();
    this.previewUrl = null;
    this.selectedFile = null;
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
  
  // Eventos para tecla ESC
  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(): void {
    if (this.isOpen) {
      this.close();
    }
  }
}

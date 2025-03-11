import { Component, EventEmitter, inject, Input, OnInit, Output, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from '../../compartidos/funciones/validaciones';
import { RouterLink } from '@angular/router';
import { EmpleadoCreacionDTO, EmpleadoDTO } from '../empleados';

@Component({
  selector: 'app-formulario-empleados-oficial',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formulario-empleados-oficial.component.html',
  styleUrl: './formulario-empleados-oficial.component.css'
})
export class FormularioEmpleadosOficialComponent implements OnInit {
  
  ngOnInit(): void {
    if (this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  @Input() mensajeDesdeElPadre!: string;
  // @Input() modelo?: EmpleadoDTO; 
  @Input() modelo: EmpleadoDTO | undefined; 
  @Output() posteoFormulario = new EventEmitter<EmpleadoCreacionDTO>();

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    nombre: ['', { validators: [Validators.required, primeraLetraMayuscula()], updateOn: 'blur' }],
  });


  obtenerErrorCampoNombre(): string {
    let nombre = this.form.controls.nombre;

    if (nombre.hasError('required')) {
      return "El campo nombre es requerido";
    }

    if (nombre.hasError('primeraLetraMayuscula')) {
      return nombre.getError('primeraLetraMayuscula').mensaje;
    }


    return "";

  }

  guardarCambios() {
    if (!this.form.valid) {
      return;
    }

    const empleado = this.form.value as EmpleadoCreacionDTO;
    this.posteoFormulario.emit(empleado);
  }
}

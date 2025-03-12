import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from '../../compartidos/funciones/validaciones';
import { FormularioEmpleadosOficialComponent } from "../formulario-empleados-oficial/formulario-empleados-oficial.component";
import { EmpleadoCreacionDTO } from '../empleados';
import { EmpleadosService } from '../empleados.service';

@Component({
  selector: 'app-crear-empleado',
  imports: [ReactiveFormsModule, RouterLink, FormularioEmpleadosOficialComponent],
  templateUrl: './crear-empleado.component.html',
  styleUrl: './crear-empleado.component.css'
})
export class CrearEmpleadoComponent {
  private router = inject(Router);
  private empleadosService = inject(EmpleadosService);

  guardarCambios(empleado: EmpleadoCreacionDTO) {
    this.empleadosService.crear(empleado).subscribe(() => {
      // this.router.navigate(['/empleados']);
    });
  }


}

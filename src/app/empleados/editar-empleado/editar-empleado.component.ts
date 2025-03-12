import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { FormularioEmpleadosOficialComponent } from "../formulario-empleados-oficial/formulario-empleados-oficial.component";
import { EmpleadoCreacionDTO, EmpleadoDTO } from '../empleados';
import { EmpleadosService } from '../empleados.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-empleado',
  imports: [FormularioEmpleadosOficialComponent],
  templateUrl: './editar-empleado.component.html',
  styleUrl: './editar-empleado.component.css'
})
export class EditarEmpleadoComponent implements OnInit{
  
  ngOnInit(): void {
    this.empleadosService.ObtenerPorId(this.id).subscribe(empleado =>{
      this.empleado = empleado;
    })
  }

  @Input({ transform: numberAttribute }) 
  id!: number;
  empleado?: EmpleadoDTO;
  empleadosService = inject(EmpleadosService);
  errores: string[] = [];
  router = inject(Router);

  guardarCambios(empleado: EmpleadoCreacionDTO) {
    this.empleadosService.actualizar(this.id, empleado).subscribe({
      next: () => {
        this.router.navigate(['/empleados']);
      }
      // ,
      // error: err => {
      //   const errores = extraerErrores(err);
      //   this.errores;
      // }
    });
  }

}

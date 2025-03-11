import { Component, Input, numberAttribute } from '@angular/core';
import { FormularioEmpleadosOficialComponent } from "../formulario-empleados-oficial/formulario-empleados-oficial.component";
import { EmpleadoCreacionDTO, EmpleadoDTO } from '../empleados';

@Component({
  selector: 'app-editar-empleado',
  imports: [FormularioEmpleadosOficialComponent],
  templateUrl: './editar-empleado.component.html',
  styleUrl: './editar-empleado.component.css'
})
export class EditarEmpleadoComponent {
  @Input({ transform: numberAttribute }) id!: number;
  
  empleado: EmpleadoDTO = { id: 1, nombre: 'Juan' };

  guardarCambios(genero: EmpleadoCreacionDTO) {
    console.log('Editando el genero', genero);
  }

}

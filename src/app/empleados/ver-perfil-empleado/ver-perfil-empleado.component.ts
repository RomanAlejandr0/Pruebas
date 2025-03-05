import { Component, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-ver-perfil-empleado',
  imports: [],
  templateUrl: './ver-perfil-empleado.component.html',
  styleUrl: './ver-perfil-empleado.component.css'
})
export class VerPerfilEmpleadoComponent {

  @Input({transform: numberAttribute})
  id!: number;
}

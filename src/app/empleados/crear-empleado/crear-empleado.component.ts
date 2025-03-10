import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-empleado',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './crear-empleado.component.html',
  styleUrl: './crear-empleado.component.css'
})
export class CrearEmpleadoComponent {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    nombre: ['', {validators: [Validators.required]}],
  });


  obtenerErrorCampoNombre(): string{
    let nombre = this.form.controls.nombre;
    
    if(nombre.hasError('required')){
      return "El campo nombre es requerido";
    }
    else{
      return "";
    }
  }

  guardarCambios(){
    //... lógica para guardar los cambios
    // this.router.navigate(['/empleados']);

    console.log(this.form.value);
  }
}

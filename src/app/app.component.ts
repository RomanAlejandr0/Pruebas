import { Component, NgModule } from '@angular/core';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponentComponent } from "./compartidos/navbar-component/navbar-component.component";
import { NgFor } from '@angular/common';
import { ModalComponent } from './compartidos/modal/modal.component';

interface Empleado {
  id: number;
  nomina: string;
  nombre: string;
  fechaIngreso: string;
  area: string;
  puesto: string;
  foto: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponentComponent, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent {
  title = 'Sistema_Pasaportes_V1';
}

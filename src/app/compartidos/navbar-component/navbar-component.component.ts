import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  imports: [RouterLink, NgClass, NgIf],
  templateUrl: './navbar-component.component.html',
  styleUrl: './navbar-component.component.css'
})
export class NavbarComponentComponent {
  minimizado = false;

  toggleMenu(): void {
    this.minimizado = !this.minimizado;
    // Emitir un evento para que app component pueda ajustar el margen del contenido
    // O, mejor aún, usar un servicio compartido para esta comunicación
    document.dispatchEvent(new CustomEvent('menu-toggled', { 
      detail: { minimizado: this.minimizado } 
    }));
  }
}

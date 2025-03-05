import { Component, OnInit } from '@angular/core';

interface Empleado {
  id: number;
  nomina: string;
  nombre: string;
  fechaIngreso: string;
  area: string;
  puesto: string;
}

@Component({
  selector: 'app-indice-empleados',
  imports: [ ],
  templateUrl: './indice-empleados.component.html',
  styleUrls: ['./indice-empleados.component.css']
})
export class IndiceEmpleadosComponent implements OnInit {
  
  empleados: Empleado[] = [
    { 
      id: 1, 
      nomina: '12345', 
      nombre: 'Juan Pérez', 
      fechaIngreso: '15/03/2021', 
      area: 'Fundición', 
      puesto: 'Supervisor'
    },
    { 
      id: 2, 
      nomina: '67890', 
      nombre: 'María Rodríguez', 
      fechaIngreso: '04/08/2019', 
      area: 'IT', 
      puesto: 'Desarrollador'
    },
    { 
      id: 3, 
      nomina: '23456', 
      nombre: 'Carlos González', 
      fechaIngreso: '22/11/2020', 
      area: 'Mantenimiento', 
      puesto: 'Técnico'
    },
    { 
      id: 4, 
      nomina: '78901', 
      nombre: 'Ana López', 
      fechaIngreso: '10/05/2022', 
      area: 'Recursos Humanos', 
      puesto: 'Coordinador'
     },
    { 
      id: 5, 
      nomina: '34567', 
      nombre: 'Roberto Sánchez', 
      fechaIngreso: '03/02/2023', 
      area: 'Ventas', 
      puesto: 'Gerente'
    },
    { 
      id: 6, 
      nomina: '89012', 
      nombre: 'Laura Martínez', 
      fechaIngreso: '18/07/2021', 
      area: 'Calidad', 
      puesto: 'Inspector'
    },
  ];

  empleadosFiltrados: Empleado[] = [];
  terminoBusqueda: string = '';
  router: any;

  constructor() { }

  ngOnInit(): void {
    this.empleadosFiltrados = [...this.empleados];
  }

  buscarEmpleados(event: any): void {
    const termino = event.target.value.toLowerCase();
    this.terminoBusqueda = termino;
    
    if (!termino) {
      this.empleadosFiltrados = [...this.empleados];
      return;
    }
    
    this.empleadosFiltrados = this.empleados.filter(empleado => 
      empleado.nombre.toLowerCase().includes(termino) || 
      empleado.nomina.includes(termino)
    );
  }

  verPerfil(id: number): void {
    console.log(`Ver perfil del empleado con ID: ${id}`);
    // Aquí implementarías la navegación al perfil
    // this.router.navigate(['/empleados', id]);
  }

  editarEmpleado(id: number): void {
    console.log(`Editar empleado con ID: ${id}`);
    // Aquí implementarías la navegación a la edición
    // this.router.navigate(['/empleados/editar', id]);
  }

  eliminarEmpleado(id: number): void {
    console.log(`Eliminar empleado con ID: ${id}`);
    // Aquí implementarías la lógica para eliminar
    if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      // this.empleadoService.eliminar(id).subscribe(...)
    }
  }

  nuevoEmpleado(): void {
    console.log('Crear nuevo empleado');
    // Aquí implementarías la navegación al formulario de creación
    // this.router.navigate(['/empleados/nuevo']);
  }
}

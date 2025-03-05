import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Carpeta {
  id: number;
  nombre: string;
  colorClase: string;
  color: string;
}

interface Examen {
  id: number;
  nombre: string;
  carpetaId: number;
  nivel: number;
  totalPreguntas: number;
  fechaCreacion: Date;
}

@Component({
  selector: 'app-indice-examenes-categorias',
  imports: [],
  templateUrl: './indice-examenes-categorias.component.html',
  styleUrl: './indice-examenes-categorias.component.css'
})
export class IndiceExamenesCategoriasComponent implements OnInit {
  // Variables para manejo de carpetas
  carpetas: Carpeta[] = [];
  carpetaSeleccionada: Carpeta | null = null;
  menuAbierto: number | null = null;

  // Variables para exámenes
  examenes: Examen[] = [];
  examenesFiltrados: Examen[] = [];

  // Filtros
  busqueda: string = '';
  filtroNivel: number | null = null;
  ordenarPor: 'nombre' | 'nivel' | 'fechaCreacion' = 'nombre';
  niveles: number[] = [1, 2, 3, 4, 5];

  constructor() { }

  ngOnInit(): void {
    // Cargar datos de ejemplo (en una aplicación real, esto vendría de un servicio)
    this.cargarDatosEjemplo();
    this.aplicarFiltros();
  }

  cargarDatosEjemplo(): void {
    // Carpetas de ejemplo
    this.carpetas = [
      { id: 1, nombre: 'Hornos', colorClase: 'bg-red-500', color: 'bg-red-500' },
      { id: 2, nombre: 'Fundición', colorClase: 'bg-blue-500', color: 'bg-blue-500' },
      { id: 3, nombre: 'Mecanizado', colorClase: 'bg-green-500', color: 'bg-green-500' },
      { id: 4, nombre: 'Calidad', colorClase: 'bg-purple-500', color: 'bg-purple-500' },
      { id: 5, nombre: 'Planta 2', colorClase: 'bg-yellow-500', color: 'bg-yellow-500' }
    ];

    // Exámenes de ejemplo
    this.examenes = [
      {
        id: 1,
        nombre: 'Hornos Nivel 1',
        carpetaId: 1,
        nivel: 1,
        totalPreguntas: 20,
        fechaCreacion: new Date(2025, 0, 15)
      },
      {
        id: 2,
        nombre: 'Hornos Nivel 2',
        carpetaId: 1,
        nivel: 2,
        totalPreguntas: 25,
        fechaCreacion: new Date(2025, 1, 3)
      },
      {
        id: 3,
        nombre: 'Fundición Básico',
        carpetaId: 2,
        nivel: 1,
        totalPreguntas: 15,
        fechaCreacion: new Date(2025, 0, 10)
      },
      {
        id: 4,
        nombre: 'Fundición Avanzado',
        carpetaId: 2,
        nivel: 3,
        totalPreguntas: 30,
        fechaCreacion: new Date(2025, 1, 20)
      },
      {
        id: 5,
        nombre: 'Mecanizado Nivel 1',
        carpetaId: 3,
        nivel: 1,
        totalPreguntas: 22,
        fechaCreacion: new Date(2025, 0, 5)
      },
      {
        id: 6,
        nombre: 'Calidad Proceso',
        carpetaId: 4,
        nivel: 2,
        totalPreguntas: 18,
        fechaCreacion: new Date(2025, 0, 25)
      }
    ];
  }

  // Métodos para gestión de carpetas
  seleccionarCarpeta(carpeta: Carpeta | null): void {
    this.carpetaSeleccionada = carpeta;
    this.aplicarFiltros();
  }

  abrirModalCarpeta(): void {
    // Implementar lógica para abrir modal de creación de carpeta
    console.log('Abrir modal para crear carpeta');
  }

  editarCarpeta(carpeta: Carpeta): void {
    // Implementar lógica para editar carpeta
    console.log('Editar carpeta', carpeta);
  }

  eliminarCarpeta(id: number): void {
    // Implementar lógica para eliminar carpeta
    console.log('Eliminar carpeta con ID:', id);

    // Ejemplo de confirmación
    if (confirm('¿Estás seguro de eliminar esta carpeta? Todos los exámenes asociados también serán eliminados.')) {
      this.carpetas = this.carpetas.filter(c => c.id !== id);
      this.examenes = this.examenes.filter(e => e.carpetaId !== id);
      this.aplicarFiltros();
    }
  }

  toggleMenu(id: number): void {
    this.menuAbierto = this.menuAbierto === id ? null : id;
  }

  contarExamenesPorCarpeta(carpetaId: number): number {
    return this.examenes.filter(e => e.carpetaId === carpetaId).length;
  }

  obtenerNombreCarpeta(carpetaId: number): string {
    const carpeta = this.carpetas.find(c => c.id === carpetaId);
    return carpeta ? carpeta.nombre : 'Sin carpeta';
  }

  obtenerColorCarpeta(carpetaId: number): string {
    const carpeta = this.carpetas.find(c => c.id === carpetaId);
    return carpeta ? carpeta.color : 'bg-gray-400';
  }

  // Métodos para gestión de exámenes
  abrirModalExamen(): void {
    // Implementar lógica para abrir modal de creación de examen
    console.log('Abrir modal para crear examen');
  }

  previsualizarExamen(id: number): void {
    // Implementar lógica para previsualizar examen
    console.log('Previsualizar examen con ID:', id);
  }

  asignarExamen(id: number): void {
    // Implementar lógica para asignar examen
    console.log('Asignar examen con ID:', id);
  }

  // Filtrado y ordenación
  aplicarFiltros(): void {
    // Filtrar por carpeta seleccionada
    let resultados = this.carpetaSeleccionada
      ? this.examenes.filter(e => e.carpetaId === this.carpetaSeleccionada!.id)
      : [...this.examenes];

    // Filtrar por búsqueda
    if (this.busqueda.trim()) {
      const busquedaLower = this.busqueda.toLowerCase();
      resultados = resultados.filter(e =>
        e.nombre.toLowerCase().includes(busquedaLower)
      );
    }

    // Filtrar por nivel
    if (this.filtroNivel !== null) {
      resultados = resultados.filter(e => e.nivel === this.filtroNivel);
    }

    // Ordenar resultados
    resultados.sort((a, b) => {
      switch (this.ordenarPor) {
        case 'nombre':
          return a.nombre.localeCompare(b.nombre);
        case 'nivel':
          return a.nivel - b.nivel;
        case 'fechaCreacion':
          return b.fechaCreacion.getTime() - a.fechaCreacion.getTime();
        default:
          return 0;
      }
    });

    this.examenesFiltrados = resultados;
  }
}

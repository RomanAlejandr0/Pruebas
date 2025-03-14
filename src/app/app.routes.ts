import { Routes } from '@angular/router';
import { IndiceEmpleadosComponent } from './empleados/indice-empleados/indice-empleados.component';
import { PaginaNoEncontradaComponent } from './compartidos/pagina-no-encontrada/pagina-no-encontrada.component';
import { IndiceCategoriasComponent } from './categorias/indice-categorias/indice-categorias.component';
import { IndiceExamenesCategoriasComponent } from './examenes-categorias/indice-examenes-categorias/indice-examenes-categorias.component';
import { VerPerfilEmpleadoComponent } from './empleados/ver-perfil-empleado/ver-perfil-empleado.component';
import { CrearEmpleadoComponent } from './empleados/crear-empleado/crear-empleado.component';
import { EditarEmpleadoComponent } from './empleados/editar-empleado/editar-empleado.component';
import { IndiceEmpleados2Component } from './empleados/indice-empleados2/indice-empleados2.component';

export const routes: Routes = [
    { path: '', component: IndiceEmpleadosComponent},
    { path: 'empleados2', component: IndiceEmpleados2Component},
    { path: 'empleados/crear-empleado', component: CrearEmpleadoComponent},
    { path: 'empleados/editar-empleado/:id', component: EditarEmpleadoComponent},
    { path: 'empleados/ver-perfil/:id', component: VerPerfilEmpleadoComponent},
    { path: 'categorias', component: IndiceCategoriasComponent},    
    { path: 'examenes-categorias', component: IndiceExamenesCategoriasComponent},
    { path: '**', component: PaginaNoEncontradaComponent }

];

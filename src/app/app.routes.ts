import { Routes } from '@angular/router';
import { IndiceEmpleadosComponent } from './empleados/indice-empleados/indice-empleados.component';
import { PaginaNoEncontradaComponent } from './compartidos/pagina-no-encontrada/pagina-no-encontrada.component';
import { IndiceCategoriasComponent } from './categorias/indice-categorias/indice-categorias.component';
import { IndiceExamenesCategoriasComponent } from './examenes-categorias/indice-examenes-categorias/indice-examenes-categorias.component';
import { VerPerfilEmpleadoComponent } from './empleados/ver-perfil-empleado/ver-perfil-empleado.component';

export const routes: Routes = [
    { path: '', component: IndiceEmpleadosComponent},
    { path: 'empleados/ver-perfil/:id', component: VerPerfilEmpleadoComponent},
    { path: 'categorias', component: IndiceCategoriasComponent},    
    { path: 'examenes-categorias', component: IndiceExamenesCategoriasComponent},
    { path: '**', component: PaginaNoEncontradaComponent }

];

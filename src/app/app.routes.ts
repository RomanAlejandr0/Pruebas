import { Routes } from '@angular/router';
import { IndiceEmpleadosComponent } from './indice-empleados/indice-empleados.component';
import { PaginaNoEncontradaComponent } from './pagina-no-encontrada/pagina-no-encontrada.component';
import { IndiceCategoriasComponent } from './indice-categorias/indice-categorias.component';
import { IndiceExamenesCategoriasComponent } from './indice-examenes-categorias/indice-examenes-categorias.component';

export const routes: Routes = [
    { path: '', component: IndiceEmpleadosComponent},
    { path: 'categorias', component: IndiceCategoriasComponent},    
    { path: 'examenes-categorias', component: IndiceExamenesCategoriasComponent},
    { path: '**', component: PaginaNoEncontradaComponent }

];

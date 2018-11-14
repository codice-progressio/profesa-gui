import {RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountsSettingsComponent } from './accounts-settings/accounts-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, VerificaTokenGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { RegistroDeFoliosComponent } from './registro-de-folios/registro-de-folios.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/service.index';
import { RegistroDeLineasComponent } from './registro-de-folios/registro-de-lineas.component';
import { RevisionDeOrdenesComponent } from './generador-de-ordenes/revision-de-ordenes.component';
import { SeguimientoDeFoliosComponent } from './seguimiento-de-folios/seguimiento-de-folios.component';
import { MaterialesComponent } from './departamentos/materiales/materiales.component';
import { TransformacionComponent } from './departamentos/transformacion/transformacion.component';
import { PulidoComponent } from './departamentos/pulido/pulido.component';
import { SeleccionComponent } from './departamentos/seleccion/seleccion.component';
import { ModelosComponent } from './modelos/modelos.component';
import { VistaParaImprecionComponent } from './generador-de-ordenes/vista-para-imprecion.component';
import { PastillaComponent } from './departamentos/pastilla/pastilla.component';
import { EmpaqueComponent } from './departamentos/empaque/empaque.component';
import { GestionDepartamentoComponent } from './departamentos/gestion-departamento/gestion-departamento.component';
import { ProcesoComponent } from './gestionDeProcesos/proceso/proceso.component';
import { CostosDeProcesoComponent } from './gestionDeProcesos/costos-de-proceso/costos-de-proceso.component';
import { ProcesosEnModeloComponent } from './gestionDeProcesos/procesos-en-modelo/procesos-en-modelo.component';
import { IndicadorDeChecadasComponent } from './reportes/indicador-de-checadas/indicador-de-checadas.component';

const pagesRoutes: Routes = [
// Redirecciona a PagesComponent para separar el login
    // de la estructura principal.
    // {
    //     // Esta es la ruta padre y tiene hijos. Esto permite la separación
    //     // entre el login y el dashboard para los templates.
    //     path: '',
    //     component: PagesComponent,
    //     canActivate: [LoginGuardGuard],
    //     children: [
            // Sección de estudio.
        {
            path: 'dashboard',
            component: DashboardComponent,
            canActivate: [ VerificaTokenGuard],
            data: {titulo: 'Dashboard'}
        },
        {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
        {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'}},
        {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
        {path: 'account-settings', component: AccountsSettingsComponent, data: {titulo: 'Información de la cuenta'}},
        {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}},
        {path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'}},
        // Mantenimientos
        {
            path: 'usuarios',
            component: UsuariosComponent,
            canActivate: [AdminGuard],
            data: {titulo: 'Mantenimientos de usuarios'}},
            
        {
            path: 'departamentos',
            component: GestionDepartamentoComponent,
            canActivate: [AdminGuard],
            data: {titulo: 'Mantenimientos de departamentos'}},

        {path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario.'}},
        // {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimientos de hospitales'}},
        // {path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimientos de médicos'}},
        // {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar médico.'}},





        // Esta sección es para el trabajo
        {path: 'folios', component: RegistroDeFoliosComponent, data: {titulo: 'Registro de Folios'}},
        {path: 'folio/:id', component: RegistroDeLineasComponent, data: {titulo: 'Registrar pedidos'}},
        
        {path: 'ordenes/:idFolio', component: RevisionDeOrdenesComponent, data: {titulo: 'Revisión de órdenes'}},
        {
            path: 'ordenes/imprecion/:idFolio', 
            component: VistaParaImprecionComponent, 
            data: {titulo: 'Impreción de órdenes'}, 
        },
        
        {path: 'produccion', component: SeguimientoDeFoliosComponent, data: {titulo: 'Seguimiento de folios'}},
        
        {path: 'produccion/materiales', component: MaterialesComponent, data: {titulo: 'Registro de órdenes'}},
        {path: 'produccion/pastilla', component: PastillaComponent, data: {titulo: 'Registro de órdenes'}},
        {path: 'produccion/transformacion', component: TransformacionComponent, data: {titulo: 'Registro de órdenes'}},
        {path: 'produccion/pulido', component: PulidoComponent, data: {titulo: 'Registro de órdenes'}},
        {path: 'produccion/seleccion', component: SeleccionComponent, data: {titulo: 'Registro de órdenes'}},
        {path: 'produccion/empaque', component: EmpaqueComponent, data: {titulo: 'Registro de órdenes'}},
        

        {path: 'modelos', component: ModelosComponent, data: {titulo: 'Registro y administración de modelos'}},
        
        
        // Gestión de procesos
        {path: 'procesos', component: ProcesoComponent, data: {titulo: 'Gestión de procesos'}},
        // {path: 'procesos/costos', component: CostosDeProcesoComponent, data: {titulo: 'Gestión de costos de proceso'}},
        {path: 'procesos/modelos', component: ProcesosEnModeloComponent, data: {titulo: 'Gestión de procesos de modelo'}},
        
        // reportes
        
        {
            path: 'reportes/indicadorChecadas', 
            component: IndicadorDeChecadasComponent,
            data: {titulo: 'Indicador de checas personal ( Beta )'}
        },
        
        
        
        // Redirige al dashboard cuando no se ha puesto nada en la url.
        {path: '', redirectTo: '/dashboard', pathMatch: 'full'}

    //     ]
    // }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);

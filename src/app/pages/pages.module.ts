import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { ProgressComponent } from './progress/progress.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


// ng2-charts
import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
// Pipes module
import { PipesModule } from '../pipes/pipes.module';
// temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { AccountsSettingsComponent } from './accounts-settings/accounts-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

// Sistema 
import { RegistroDeFoliosComponent } from './registro-de-folios/registro-de-folios.component';
import { RegistroDeLineasComponent } from './registro-de-folios/registro-de-lineas.component';
import { RevisionDeOrdenesComponent } from './generador-de-ordenes/revision-de-ordenes.component';
import { SeguimientoDeFoliosComponent } from './seguimiento-de-folios/seguimiento-de-folios.component';
import { MaterialesComponent } from './departamentos/materiales/materiales.component';
import { TransformacionComponent } from './departamentos/transformacion/transformacion.component';
import { PulidoComponent } from './departamentos/pulido/pulido.component';
import { SeleccionComponent } from './departamentos/seleccion/seleccion.component';
import { ModelosComponent } from './modelos/modelos.component';
import { VistaParaImprecionComponent } from './generador-de-ordenes/vista-para-imprecion.component';
import { QRCodeModule } from 'angularx-qrcode';
import { PastillaComponent } from './departamentos/pastilla/pastilla.component';
import { EmpaqueComponent } from './departamentos/empaque/empaque.component';
import { GestionDepartamentoComponent } from './departamentos/gestion-departamento/gestion-departamento.component';
import { ProcesoComponent } from './gestionDeProcesos/proceso/proceso.component';
import { CostosDeProcesoComponent } from './gestionDeProcesos/costos-de-proceso/costos-de-proceso.component';
import { ProcesosEnModeloComponent } from './gestionDeProcesos/procesos-en-modelo/procesos-en-modelo.component';
import { IndicadorDeChecadasComponent } from './reportes/indicador-de-checadas/indicador-de-checadas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ControlDeProduccionComponent } from './departamentos/control-de-produccion/control-de-produccion.component';
import { ProductoTerminadoComponent } from './departamentos/producto-terminado/producto-terminado.component';
import { HistorialDeFoliosComponent } from './reportes/historial-de-folios/historial-de-folios.component';



@NgModule({
    declarations: [
        // PagesComponent,
       DashboardComponent,
       ProgressComponent,
       Graficas1Component,
       IncrementadorComponent,
       GraficoDonaComponent,
       AccountsSettingsComponent,
       PromesasComponent,
       RxjsComponent,
       ProfileComponent,
       UsuariosComponent,
       //    ModalUploadComponent,
       HospitalesComponent,
       MedicosComponent,
       MedicoComponent,
       BusquedaComponent,
       // sistema
       RegistroDeFoliosComponent,
       RegistroDeLineasComponent,
       RevisionDeOrdenesComponent,
       SeguimientoDeFoliosComponent,
       MaterialesComponent,
       TransformacionComponent,
       PulidoComponent,
       SeleccionComponent,
       ModelosComponent,
       VistaParaImprecionComponent,
       PastillaComponent,
       EmpaqueComponent,
       GestionDepartamentoComponent,
       ProcesoComponent,
       CostosDeProcesoComponent,
       ProcesosEnModeloComponent,
       IndicadorDeChecadasComponent,
       ClientesComponent,
       ControlDeProduccionComponent,
       ProductoTerminadoComponent,
       HistorialDeFoliosComponent,


      ],
      exports: [
        DashboardComponent,
        ProgressComponent,
        // PagesComponent,
        Graficas1Component
      ],
      imports: [
          CommonModule,
          SharedModule,
          PAGES_ROUTES,
          FormsModule,
          ReactiveFormsModule,
          ChartsModule,
          PipesModule,
          QRCodeModule,
      ]
})

export class PagesModule { }

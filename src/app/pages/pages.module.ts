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
import { VistaParaImprecionComponent } from './generador-de-ordenes/vista-para-imprecion.component';
import { QRCodeModule } from 'angularx-qrcode';
import { PastillaComponent } from './departamentos/pastilla/pastilla.component';
import { EmpaqueComponent } from './departamentos/empaque/empaque.component';
import { GestionDepartamentoComponent } from './departamentos/gestion-departamento/gestion-departamento.component';
import { IndicadorDeChecadasComponent } from './reportes/indicador-de-checadas/indicador-de-checadas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ControlDeProduccionComponent } from './departamentos/control-de-produccion/control-de-produccion.component';
import { ProductoTerminadoComponent } from './departamentos/producto-terminado/producto-terminado.component';
import { HistorialDeFoliosComponent } from './reportes/historial-de-folios/historial-de-folios.component';
import { MetalizadoComponent } from './departamentos/metalizado/metalizado.component';
import { BuratoComponent } from './departamentos/burato/burato.component';
import { BarnizadoComponent } from './departamentos/barnizado/barnizado.component';
import { LaserComponent } from './departamentos/laser/laser.component';
import { AlmacenDeBotonComponent } from './departamentos/almacen-de-boton/almacen-de-boton.component';
import { FamiliaDeProcesosComponent } from './gestionDeProcesos/familia-de-procesos/familia-de-procesos.component';
import { ProcesosComponent } from './gestionDeProcesos/procesos/procesos.component';
import { MaquinasComponent } from './gestionDeProcesos/maquinas/maquinas.component';
import { FamiliaDeProcesosDetalleComponent } from './gestionDeProcesos/familia-de-procesos/familia-de-procesos-detalle.component';
import { ProcesosDetalleComponent } from './gestionDeProcesos/procesos/procesos-detalle.component';
import { MaquinasDetalleComponent } from './gestionDeProcesos/maquinas/maquinas-detalle.component';
import { MaquinasCrearModificarComponent } from './gestionDeProcesos/maquinas/maquinas-crear-modificar.component';
import { ModalComponent } from './utilidadesPages/utilidades-tipo-crud-para-GUI/plantillas/modal.component';
import { CrearModificarComponent } from './utilidadesPages/utilidades-tipo-crud-para-GUI/plantillas/crear-modificar.component';
import { GeneralComponent } from './utilidadesPages/utilidades-tipo-crud-para-GUI/plantillas/general.component';
import { ProcesosCrearModificarComponent } from './gestionDeProcesos/procesos/procesos-crear-modificar.component';
import { ModelosCrearModificarComponent } from './gestionDeProcesos/modelos/modelos-crear-modificar.component';
import { ModelosDetalleComponent } from './gestionDeProcesos/modelos/modelos-detalle.component';
import { TamanosCrearModificarComponent } from './gestionDeProcesos/tamanos/tamanos-crear-modificar.component';
import { TamanosDetalleComponent } from './gestionDeProcesos/tamanos/tamanos-detalle.component';
import { TamanosComponent } from './gestionDeProcesos/tamanos/tamanos.component';
import { ColoresCrearModificarComponent } from './gestionDeProcesos/colores/colores-crear-modificar.component';
import { ColoresDetalleComponent } from './gestionDeProcesos/colores/colores-detalle.component';
import { ColoresComponent } from './gestionDeProcesos/colores/colores.component';
import { TerminadosDetalleComponent } from './gestionDeProcesos/terminados/terminados-detalle.component';
import { TerminadosComponent } from './gestionDeProcesos/terminados/terminados.component';
import { TerminadosCrearModificarComponent } from './gestionDeProcesos/terminados/terminados-crear-modificar.component';
import { ModelosCompletosCrearModificarComponent } from './gestionDeProcesos/modelos-completos/modelos-completos-crear-modificar.component';
import { ModelosCompletosDetalleComponent } from './gestionDeProcesos/modelos-completos/modelos-completos-detalle.component';
import { ModelosCompletosComponent } from './gestionDeProcesos/modelos-completos/modelos-completos.component';
import { ModelosComponent } from './gestionDeProcesos/modelos/modelos.component';
import { FamiliaDeProcesosCrearModificarComponent } from './gestionDeProcesos/familiaDeProcesos/familia-de-procesos-crear-modificar.component';
import { LaserReporteComponent } from './reportes/produccion/laser-reporte/laser-reporte.component';
import { TransformacionReporteComponent } from './reportes/produccion/transformacion-reporte/transformacion-reporte.component';
import { QuimicaReporteComponent } from './reportes/produccion/quimica-reporte/quimica-reporte.component';


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
       VistaParaImprecionComponent,
       PastillaComponent,
       EmpaqueComponent,
       GestionDepartamentoComponent,
       IndicadorDeChecadasComponent,
       ClientesComponent,
       ControlDeProduccionComponent,
       ProductoTerminadoComponent,
       HistorialDeFoliosComponent,
       MetalizadoComponent,
       BuratoComponent,
       BarnizadoComponent,
       LaserComponent,
       AlmacenDeBotonComponent,
       FamiliaDeProcesosComponent,
       ProcesosComponent,
       ProcesosDetalleComponent,
       MaquinasComponent,
       FamiliaDeProcesosDetalleComponent,
       MaquinasDetalleComponent,
       MaquinasCrearModificarComponent,
       ModalComponent,
       CrearModificarComponent,
       GeneralComponent,
       ProcesosCrearModificarComponent,
       ModelosCrearModificarComponent,
       ModelosDetalleComponent,
       ModelosComponent,
       TamanosCrearModificarComponent,
       TamanosDetalleComponent,
       TamanosComponent,
       ColoresCrearModificarComponent,
       ColoresDetalleComponent,
       ColoresComponent,
       TerminadosDetalleComponent,
       TerminadosComponent,
       TerminadosCrearModificarComponent,
       ModelosCompletosCrearModificarComponent,
       ModelosCompletosDetalleComponent,
       ModelosCompletosComponent,
       FamiliaDeProcesosCrearModificarComponent,
       LaserReporteComponent,
       TransformacionReporteComponent,
       QuimicaReporteComponent,


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
      ], 
      // Para permitir la carga dinamica de componentes. 
})

export class PagesModule { }

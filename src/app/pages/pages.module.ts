import { NgModule } from "@angular/core"
import { DashboardComponent } from "./dashboard/dashboard.component"
import { Graficas1Component } from "./graficas1/graficas1.component"
import { PagesComponent } from "./pages.component"
import { SharedModule } from "../shared/shared.module"
import { PAGES_ROUTES } from "./pages.routes"
import { ProgressComponent } from "./progress/progress.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { CommonModule } from "@angular/common"

// ng2-charts
import { ChartsModule } from "ng2-charts"
import { GraficoDonaComponent } from "../components/grafico-dona/grafico-dona.component"
// Pipes module
import { PipesModule } from "../pipes/pipes.module"
// temporal
import { IncrementadorComponent } from "../components/incrementador/incrementador.component"
import { AccountsSettingsComponent } from "./accounts-settings/accounts-settings.component"
import { PromesasComponent } from "./promesas/promesas.component"
import { RxjsComponent } from "./rxjs/rxjs.component"
import { ProfileComponent } from "./profile/profile.component"
import { UsuariosComponent } from "./usuarios/usuarios.component"
import { HospitalesComponent } from "./hospitales/hospitales.component"
import { MedicosComponent } from "./medicos/medicos.component"
import { MedicoComponent } from "./medicos/medico.component"
import { BusquedaComponent } from "./busqueda/busqueda.component"

// Sistema
import { RegistroDeFoliosComponent } from "./registro-de-folios/registro-de-folios.component"
import { RegistroDeLineasComponent } from "./registro-de-folios/registro-de-lineas.component"
import { RevisionDeOrdenesComponent } from "./generador-de-ordenes/revision-de-ordenes.component"
import { SeguimientoDeFoliosComponent } from "./seguimiento-de-folios/seguimiento-de-folios.component"
import { MaterialesComponent } from "./departamentos/materiales/materiales.component"
import { TransformacionComponent } from "./departamentos/transformacion/transformacion.component"
import { PulidoComponent } from "./departamentos/pulido/pulido.component"
import { SeleccionComponent } from "./departamentos/seleccion/seleccion.component"
import { VistaParaImprecionComponent } from "./generador-de-ordenes/vista-para-imprecion.component"
import { QRCodeModule } from "angularx-qrcode"
import { PastillaComponent } from "./departamentos/pastilla/pastilla.component"
import { EmpaqueComponent } from "./departamentos/empaque/empaque.component"
import { GestionDepartamentoComponent } from "./departamentos/gestion-departamento/gestion-departamento.component"
import { IndicadorDeChecadasComponent } from "./reportes/indicador-de-checadas/indicador-de-checadas.component"
import { ClientesComponent } from "./clientes/clientes.component"
import { ControlDeProduccionComponent } from "./departamentos/control-de-produccion/control-de-produccion.component"
import { ProductoTerminadoComponent } from "./departamentos/producto-terminado/producto-terminado.component"
import { HistorialDeFoliosComponent } from "./reportes/historial-de-folios/historial-de-folios.component"
import { MetalizadoComponent } from "./departamentos/metalizado/metalizado.component"
import { BuratoComponent } from "./departamentos/burato/burato.component"
import { BarnizadoComponent } from "./departamentos/barnizado/barnizado.component"
import { LaserComponent } from "./departamentos/laser/laser.component"
import { AlmacenDeBotonComponent } from "./departamentos/almacen-de-boton/almacen-de-boton.component"
import { FamiliaDeProcesosComponent } from "./gestionDeProcesos/familia-de-procesos/familia-de-procesos.component"
import { ProcesosComponent } from "./gestionDeProcesos/procesos/procesos.component"
import { MaquinasComponent } from "./gestionDeProcesos/maquinas/maquinas.component"
import { FamiliaDeProcesosDetalleComponent } from "./gestionDeProcesos/familia-de-procesos/familia-de-procesos-detalle.component"
import { ProcesosDetalleComponent } from "./gestionDeProcesos/procesos/procesos-detalle.component"
import { MaquinasDetalleComponent } from "./gestionDeProcesos/maquinas/maquinas-detalle.component"
import { MaquinasCrearModificarComponent } from "./gestionDeProcesos/maquinas/maquinas-crear-modificar.component"
import { ModalComponent } from "./utilidadesPages/utilidades-tipo-crud-para-GUI/plantillas/modal.component"
import { CrearModificarComponent } from "./utilidadesPages/utilidades-tipo-crud-para-GUI/plantillas/crear-modificar.component"
import { GeneralComponent } from "./utilidadesPages/utilidades-tipo-crud-para-GUI/plantillas/general.component"
import { ProcesosCrearModificarComponent } from "./gestionDeProcesos/procesos/procesos-crear-modificar.component"
import { ModelosCrearModificarComponent } from "./gestionDeProcesos/modelos/modelos-crear-modificar.component"
import { ModelosDetalleComponent } from "./gestionDeProcesos/modelos/modelos-detalle.component"
import { TamanosCrearModificarComponent } from "./gestionDeProcesos/tamanos/tamanos-crear-modificar.component"
import { TamanosDetalleComponent } from "./gestionDeProcesos/tamanos/tamanos-detalle.component"
import { TamanosComponent } from "./gestionDeProcesos/tamanos/tamanos.component"
import { ColoresCrearModificarComponent } from "./gestionDeProcesos/colores/colores-crear-modificar.component"
import { ColoresDetalleComponent } from "./gestionDeProcesos/colores/colores-detalle.component"
import { ColoresComponent } from "./gestionDeProcesos/colores/colores.component"
import { TerminadosDetalleComponent } from "./gestionDeProcesos/terminados/terminados-detalle.component"
import { TerminadosComponent } from "./gestionDeProcesos/terminados/terminados.component"
import { TerminadosCrearModificarComponent } from "./gestionDeProcesos/terminados/terminados-crear-modificar.component"
import { ModelosCompletosCrearModificarComponent } from "./gestionDeProcesos/modelos-completos/modelos-completos-crear-modificar.component"
import { ModelosCompletosDetalleComponent } from "./gestionDeProcesos/modelos-completos/modelos-completos-detalle.component"
import { ModelosCompletosComponent } from "./gestionDeProcesos/modelos-completos/modelos-completos.component"
import { ModelosComponent } from "./gestionDeProcesos/modelos/modelos.component"
import { FamiliaDeProcesosCrearModificarComponent } from "./gestionDeProcesos/familiaDeProcesos/familia-de-procesos-crear-modificar.component"
import { LaserReporteComponent } from "./reportes/produccion/laser-reporte/laser-reporte.component"
import { TransformacionReporteComponent } from "./reportes/produccion/transformacion-reporte/transformacion-reporte.component"
import { QuimicaReporteComponent } from "./reportes/produccion/quimica-reporte/quimica-reporte.component"
import { TransformacionReporteSimplificadoComponent } from "./reportes/produccion/transformacion-reporte/transformacion-reporte-simplificado.component"
import { SortableColumnComponent } from "../directives/sortableComponent/sortable-column/sortable-column.component"
import { SortableTableDirective } from "../directives/sortableComponent/sortable-table.directive"
import { PruebaParaDetallesComponent } from "./prueba-para-detalles/prueba-para-detalles.component"
import { FoliosCrearModificarComponent } from "./gestionDeFolios/folios/folios-crear-modificar.component"
import { FoliosDetalleComponent } from "./gestionDeFolios/folios/folios-detalle.component"
import { FoliosComponent } from "./gestionDeFolios/folios/folios.component"
import { PedidosCrearModificarComponent } from "./gestionDeFolios/pedidos/pedidos-crear-modificar.component"
import { PedidosDetalleComponent } from "./gestionDeFolios/pedidos/pedidos-detalle.component"
import { OrdenesCrearModificarComponent } from "./gestionDeFolios/ordenes/ordenes-crear-modificar.component"
import { OrdenesDetalleComponent } from "./gestionDeFolios/ordenes/ordenes-detalle.component"
import { OrdenesComponent } from "./gestionDeFolios/ordenes/ordenes.component"
import { GrupoDeFiltroComponent } from "./gestionDeFolios/folios/grupo-de-filtro.component"
import { RevisionDeFoliosComponent } from "./gestionDeFolios/revision/revision-de-folios/revision-de-folios.component"
import { FoliosDetalleAbstractoComponent } from "./gestionDeFolios/folios/abstractos/folios-detalle-abstracto.component"
import { FoliosCrearModificarAbstractoComponent } from "./gestionDeFolios/folios/abstractos/folios-crear-modificar-abstracto.component"
import { RevisionDeOrdenesAbstractoComponent } from "./gestionDeFolios/revision/revision-de-ordenes-abstracto/revision-de-ordenes-abstracto.component"
import { FoliosSeguimientoComponent } from "./gestionDeFolios/seguimiento/folios-seguimiento/folios-seguimiento.component";
import { ClientesCrearModificarComponent } from './clientes/clientes-crear-modificar.component';
import { ClientesDetalleComponent } from './clientes/clientes-detalle.component';
import { AlmacenDeProductoTerminadoCrearModificarComponent } from './almacenes/almacenDeProductoTerminado/almacen-de-producto-terminado-crear-modificar.component';
import { AlmacenDeProductoTerminadoDetalleComponent } from './almacenes/almacenDeProductoTerminado/almacen-de-producto-terminado-detalle.component';
import { AlmacenDeProductoTerminadoComponent } from './almacenes/almacenDeProductoTerminado/almacen-de-producto-terminado.component';
import { AlmacenDeProductoTerminadoCrearModificarEntradaComponent } from './almacenes/almacenDeProductoTerminado/es/almacen-de-producto-terminado-crear-modificar-entrada/almacen-de-producto-terminado-crear-modificar-entrada.component';
import { AlmacenDeProductoTerminadoCrearModificarSalidaComponent } from './almacenes/almacenDeProductoTerminado/es/almacen-de-producto-terminado-crear-modificar-salida/almacen-de-producto-terminado-crear-modificar-salida.component';
import { AlmacenDeProductoTerminadoCrearModificarDevolucionComponent } from './almacenes/almacenDeProductoTerminado/es/almacen-de-producto-terminado-crear-modificar-devolucion/almacen-de-producto-terminado-crear-modificar-devolucion.component';
import { LoteDetalleComponent } from './gestionDeProcesos/modelos-completos/lotes/lote-detalle/lote-detalle.component';
import { StockAlmacenProductoTerminadoComponent } from './almacenes/almacenDeProductoTerminado/stock/stock-almacen-producto-terminado.component';
import { AlmacenDeMateriaPrimaYHerramientasCrearModificarSalidaComponent } from './almacenes/almacenDeMateriaPrimaYHerramientas/almacen-de-materia-prima-yherramientas-crear-modificar-salida.component';
import { AlmacenDeMateriaPrimaYHerramientasCrearModificarEntradaComponent } from './almacenes/almacenDeMateriaPrimaYHerramientas/almacen-de-materia-prima-yherramientas-crear-modificar-entrada.component';
import { AlamacenProduccion } from './almacenes/almacenDeMateriaPrimaYHerramientas/almacen-produccion.component';
import { AlmacenDescripcionCrearModificarComponent } from './almacenes/almacenDescripcion/almacen-descripcion-crear-modificar.component';
import { AlmacenDescripcionDetalleComponent } from './almacenes/almacenDescripcion/almacen-descripcion-detalle.component';
import { AlmacenDescripcionComponent } from './almacenes/almacenDescripcion/almacen-descripcion.component';
import { ArticuloCrearModificarComponent } from './almacenes/articulo/articulo-crear-modificar.component';
import { ArticuloDetalleComponent } from './almacenes/articulo/articulo-detalle.component';
import { ArticuloComponent } from './almacenes/articulo/articulo.component';
import { ProveedorCrearModificarComponent } from './proveedor/proveedor-crear-modificar.component';
import { ProveedorDetalleComponent } from './proveedor/proveedor-detalle.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { DivisaCrearModificarComponent } from './divisa/divisa-crear-modificar.component';
import { DivisaDetalleComponent } from './divisa/divisa-detalle.component';
import { DivisaComponent } from './divisa/divisa.component';
import { TenidoComponent } from './departamentos/tenido/tenido/tenido.component'

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
    TransformacionReporteSimplificadoComponent,
    SortableColumnComponent,
    SortableTableDirective,
    PruebaParaDetallesComponent,
    FoliosCrearModificarComponent,
    FoliosDetalleComponent,
    FoliosComponent,
    PedidosCrearModificarComponent,
    PedidosDetalleComponent,
    OrdenesCrearModificarComponent,
    OrdenesDetalleComponent,
    OrdenesComponent,
    GrupoDeFiltroComponent,
    RevisionDeFoliosComponent,
    FoliosDetalleAbstractoComponent,
    FoliosCrearModificarAbstractoComponent,
    RevisionDeOrdenesAbstractoComponent,
    FoliosSeguimientoComponent,
    ClientesCrearModificarComponent,
    ClientesDetalleComponent,
    AlmacenDeProductoTerminadoCrearModificarComponent,
    AlmacenDeProductoTerminadoDetalleComponent,
    AlmacenDeProductoTerminadoComponent,
    AlmacenDeProductoTerminadoCrearModificarEntradaComponent,
    AlmacenDeProductoTerminadoCrearModificarSalidaComponent,
    AlmacenDeProductoTerminadoCrearModificarDevolucionComponent,
    LoteDetalleComponent,
    StockAlmacenProductoTerminadoComponent,
    AlmacenDeMateriaPrimaYHerramientasCrearModificarSalidaComponent,
    AlmacenDeMateriaPrimaYHerramientasCrearModificarEntradaComponent,
    AlamacenProduccion,
    AlmacenDescripcionCrearModificarComponent,
    AlmacenDescripcionDetalleComponent,
    AlmacenDescripcionComponent,
    ArticuloCrearModificarComponent,
    ArticuloDetalleComponent,
    ArticuloComponent,
    ProveedorCrearModificarComponent,
    ProveedorDetalleComponent,
    ProveedorComponent,
    DivisaCrearModificarComponent,
    DivisaDetalleComponent,
    DivisaComponent,
    TenidoComponent
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
    QRCodeModule
  ]
  // Para permitir la carga dinamica de componentes.
})
export class PagesModule {}

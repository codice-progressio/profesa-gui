import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { HttpClientModule } from "@angular/common/http"
import { ModalUploadService } from "../components/modal-upload/modal-upload.service"
import { BuscadorRapidoService } from "../components/buscador-rapido/buscador-rapido.service"

import { ValidacionesService } from "./utilidades/validaciones.service"
import { SortService } from "../directives/sortableComponent/sort.service"
import { SettingsService } from "./settings/settings.service"
import { SidebarService } from "./shared/sidebar.service"
import { SharedService } from "./shared/shared.service"
import { UsuarioService } from "./usuario/usuario.service"
import { LoginGuardGuard } from "./guards/login-guard.guard"
import { AdminGuard } from "./guards/admin.guard"
import { SubirArchivoService } from "./subir-archivo/subir-archivo.service"
import { PreLoaderService } from "../components/pre-loader/pre-loader.service"
import { HospitalService } from "./hospital/hospital.service"
import { MedicoService } from "./medico/medico.service"
import { VerificaTokenGuard } from "./guards/verifica-token.guard"
import { ClienteService } from "./cliente/cliente.service"
import { ModeloCompletoService } from "./modelo/modelo-completo.service"
import { UtilidadesService } from "./utilidades/utilidades.service"
import { ManejoDeMensajesService } from "./utilidades/manejo-de-mensajes.service"
import { MaquinaService } from "./maquina/maquina.service"
import { DepartamentoService } from "./departamento/departamento.service"
import { ProcesoService } from "./proceso/proceso.service"
import { GastoService } from "./gastos/gasto.service"
import { CalculosDeCostosService } from "./gastos/calculos-de-costos.service"
import { OrdenadorVisualService } from "../components/ordenador-visual/ordenador-visual.service"
import { PermisosGuard } from "./guards/permisos.guard"
import { FamiliaDeProcesosService } from "./proceso/familia-de-procesos.service"
import { ModeloService } from "./modelo/modelo.service"
import { TamanoService } from "./modelo/tamano.service"
import { ColorService } from "./modelo/color.service"
import { TerminadoService } from "./modelo/terminado.service"
import { FolioNewService } from "./folio/folio-new.service"
import { AlmacenProductoTerminadoService } from "./almacenDeProductoTerminado/almacen-producto-terminado.service";

@NgModule({
  imports: [
    CommonModule,
    // Para el httpcliente necesitamos importar este modulo.
    HttpClientModule
  ],
  declarations: [],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService,
    PreLoaderService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    VerificaTokenGuard,
    // Sistema Carrduci
    ClienteService,
    ModeloCompletoService,
    BuscadorRapidoService,
    UtilidadesService,
    ManejoDeMensajesService,
    ValidacionesService,
    MaquinaService,
    DepartamentoService,
    ProcesoService,
    GastoService,
    CalculosDeCostosService,
    OrdenadorVisualService,
    PermisosGuard,
    FamiliaDeProcesosService,
    ModeloService,
    TamanoService,
    ColorService,
    TerminadoService,
    SortService,
    FolioNewService,
    AlmacenProductoTerminadoService,
  ]
})
export class ServiceModule {}

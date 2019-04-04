import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { BuscadorRapidoService } from '../components/buscador-rapido/buscador-rapido.service';
import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard,
  AdminGuard,
  SubirArchivoService,
  PreLoaderService,
  HospitalService,
  MedicoService,
  VerificaTokenGuard,
  // Sistema Carrduci
  ClienteService,
  ModeloCompletoService,
  UtilidadesService,
  ManejoDeMensajesService,
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
  FolioNewService

  
  
} from './service.index';
import { ValidacionesService } from './utilidades/validaciones.service';
import { SortService } from '../directives/sortableComponent/sort.service';

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
    FolioNewService
]
})
export class ServiceModule { }

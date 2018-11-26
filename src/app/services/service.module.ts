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
  HospitalService,
  MedicoService,
  VerificaTokenGuard,
  // Sistema Carrduci
  ClienteService,
  ModeloService,
  UtilidadesService,
  ManejoDeMensajesService,
  MaquinaService,
  DepartamentoService,
  ProcesoService,
  GastoService,
  CalculosDeCostosService,
  OrdenadorVisualService,
  PermisosGuard
  
} from './service.index';
import { ValidacionesService } from './utilidades/validaciones.service';

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
    ModalUploadService,
    HospitalService,
    MedicoService,
    VerificaTokenGuard,
    // Sistema Carrduci
    ClienteService,
    ModeloService,
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
    PermisosGuard
]
})
export class ServiceModule { }

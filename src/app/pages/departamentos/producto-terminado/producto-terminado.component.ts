import { Component, OnInit } from '@angular/core';
import { QrScannerService } from 'src/app/components/qr-scanner/qr-scanner.service';
import { ListaDeOrdenesService } from 'src/app/components/lista-de-ordenes/lista-de-ordenes.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductoTerminado } from 'src/app/models/productoTerminado.model';
import { GeneralesComponents } from '../../utilidadesPages/generalesComponents';
import { DefaultsService } from 'src/app/services/configDefualts/defaults.service';
import { DepartamentosConfig } from 'src/app/config/departamentosConfig';
import { FolioService } from 'src/app/services/folio/folio.service';
import { DepartamentoService } from 'src/app/services/departamento/departamento.service';
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service';

@Component({
  selector: 'app-producto-terminado',
  templateUrl: './producto-terminado.component.html',
  styles: []
})
export class ProductoTerminadoComponent extends GeneralesComponents< ProductoTerminado > implements OnInit {

  constructor(
    public _qrScannerService: QrScannerService<ProductoTerminado>,
    public _listaDeOrdenesService: ListaDeOrdenesService,
    public formBuilder: FormBuilder,
    public _folioService: FolioService,
    public _defaultService: DefaultsService,
    public _departamentoService: DepartamentoService,
    public _validacionesService: ValidacionesService,
    // Propios del departamento.
  ) {
    super(
      _qrScannerService,
      _listaDeOrdenesService,
      formBuilder,
      _folioService,
      _defaultService,
      _departamentoService
    );
    this.tareasDeConfiguracion( new DepartamentosConfig().PRODUCTO_TERMINADO )

   }

  ngOnInit() {
    this.iniciarFormulario( );

  }

  iniciarFormulario( ){
    this.formulario = this.formBuilder.group({
      terminada: ['', [
        Validators.required
      ] ]
    });
  }

  getTerminada( ){
    return this.formulario.get('terminada');
  }




}

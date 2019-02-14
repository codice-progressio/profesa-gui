import { Component, OnInit } from '@angular/core';
import { DEPARTAMENTOS } from 'src/app/config/departamentos';
import { Orden } from 'src/app/models/orden.models';
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo';
import { FolioLinea } from 'src/app/models/folioLinea.models';
import { QrScannerService } from 'src/app/components/qrScanner/qr-scanner.service';
import { ListaDeOrdenesService } from 'src/app/components/lista-de-ordenes/lista-de-ordenes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FolioService, ValidacionesService, DepartamentoService } from 'src/app/services/service.index';
import { ProductoTerminado } from 'src/app/models/productoTerminado.model';
import { GeneralesComponents } from '../../utilidadesPages/generalesComponents';
import { DefaultsService } from 'src/app/services/configDefualts/defaults.service';
import { DepartamentosConfig } from 'src/app/config/departamentosConfig';

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

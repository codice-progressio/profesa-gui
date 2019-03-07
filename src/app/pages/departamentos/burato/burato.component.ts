import { Component, OnInit } from '@angular/core';
import { QrScannerService } from 'src/app/components/qr-scanner/qr-scanner.service';
import { ListaDeOrdenesService } from 'src/app/components/lista-de-ordenes/lista-de-ordenes.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FolioService, ValidacionesService, DepartamentoService } from 'src/app/services/service.index';
import { DEPARTAMENTOS } from 'src/app/config/departamentos';
import { Metalizado } from '../../../models/metalizado.model';
import { Orden } from 'src/app/models/orden.models';
import { FolioLinea } from 'src/app/models/folioLinea.models';
import { GeneralesComponents } from '../../utilidadesPages/generalesComponents';
import { Burato } from 'src/app/models/burato.model';
import { DefaultsService } from 'src/app/services/configDefualts/defaults.service';
import { DepartamentosConfig } from 'src/app/config/departamentosConfig';

@Component({
  selector: 'app-burato',
  templateUrl: './burato.component.html',
  styles: []
})
export class BuratoComponent extends GeneralesComponents< Burato > implements OnInit {


  constructor(
    public _qrScannerService: QrScannerService<Burato>,
    public _listaDeOrdenesService: ListaDeOrdenesService,
    public formBuilder: FormBuilder,
    public _folioService: FolioService,
    public _defaultService: DefaultsService,
    public _departamentoService: DepartamentoService,
    public _validacionesService: ValidacionesService,
  
  ) {

    super(
      _qrScannerService,
      _listaDeOrdenesService,
      formBuilder,
      _folioService,
      _defaultService,
      _departamentoService
    );
    this.tareasDeConfiguracion( new DepartamentosConfig().BURATO )

    
   }

  ngOnInit() {

    this.formulario = this.formBuilder.group({
      peso10Botones: ['', [
        Validators.required,
        Validators.min(0.01),
        Validators.max(500),
        this._validacionesService.numberValidator,
      ]
    ],
    pesoTotalBoton: ['', [
      Validators.required,
      Validators.min(0.1),
      Validators.max(99.99),
      this._validacionesService.numberValidator,]]

    });

  }
  
  public get peso10Botones_FB() : AbstractControl {
    return this.formulario.get('peso10Botones');
  }
  
  public get pesoTotalBoton_FB() : AbstractControl {
    return this.formulario.get('pesoTotalBoton');
  }

}
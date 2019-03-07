import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Orden } from 'src/app/models/orden.models';
import { FolioLinea } from 'src/app/models/folioLinea.models';
import { QrScannerService } from 'src/app/components/qr-scanner/qr-scanner.service';
import { ListaDeOrdenesService } from 'src/app/components/lista-de-ordenes/lista-de-ordenes.service';
import { FolioService, ValidacionesService, DepartamentoService } from 'src/app/services/service.index';
import { AlmacenDeBoton } from 'src/app/models/almacenDeBoton.model';
import { DEPARTAMENTOS } from '../../../config/departamentos';
import { GeneralesComponents } from '../../utilidadesPages/generalesComponents';
import { Materiales } from 'src/app/models/materiales.models';
import { DefaultsService } from 'src/app/services/configDefualts/defaults.service';
import { DepartamentosConfig } from 'src/app/config/departamentosConfig';

@Component({
  selector: 'app-almacen-de-boton',
  templateUrl: './almacen-de-boton.component.html',
  styles: []
})
export class AlmacenDeBotonComponent extends GeneralesComponents< AlmacenDeBoton >  implements OnInit {
  
 

  constructor(
    public _qrScannerService: QrScannerService<AlmacenDeBoton>,
    public _listaDeOrdenesService: ListaDeOrdenesService,
    public formBuilder: FormBuilder,
    public _folioService: FolioService,
    public _defaultService: DefaultsService,
    public _departamentoService: DepartamentoService,
    public _validacionesService: ValidacionesService,
    // Propios del departamento

  ) {
    super(
      _qrScannerService,
      _listaDeOrdenesService,
      formBuilder,
      _folioService,
      _defaultService,
      _departamentoService
    );

    this.tareasDeConfiguracion( new DepartamentosConfig().ALMACEN_DE_BOTON )
  }

  ngOnInit() {

    this.formulario = this.formBuilder.group({
      cantidadDeBoton: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(999999),
        this._validacionesService.numberValidator,
      ]
    ],
    });
  }

  public get cantidadDeBoton_FB() : AbstractControl {
    return this.formulario.get('cantidadDeBoton');
  }


}

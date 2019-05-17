import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { QrScannerService } from '../../../components/qr-scanner/qr-scanner.service';
import { ListaDeOrdenesService } from '../../../components/lista-de-ordenes/lista-de-ordenes.service';
import { Maquina } from '../../../models/maquina.model';
import { Transformacion } from '../../../models/transformacion.models';
import { GeneralesComponents } from '../../utilidadesPages/generalesComponents';
import { DefaultsService } from 'src/app/services/configDefualts/defaults.service';
import { DepartamentosConfig } from 'src/app/config/departamentosConfig';
import { FolioService } from 'src/app/services/folio/folio.service';
import { DepartamentoService } from 'src/app/services/departamento/departamento.service';
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service';
import { MaquinaService } from 'src/app/services/maquina/maquina.service';
@Component({
  selector: 'app-transformacion',
  templateUrl: './transformacion.component.html',
  styles: []
})
export class TransformacionComponent extends GeneralesComponents< Transformacion > implements OnInit {

  maquinas: Maquina[];
  

  constructor(
    public _qrScannerService: QrScannerService<Transformacion>,
    public _listaDeOrdenesService: ListaDeOrdenesService,
    public formBuilder: FormBuilder,
    public _folioService: FolioService,
    public _defaultService: DefaultsService,
    public _departamentoService: DepartamentoService,
    public _validacionesService: ValidacionesService,
    // Propios del departamento.
    private _maquinaService: MaquinaService
  ) {
    super(
      _qrScannerService,
      _listaDeOrdenesService,
      formBuilder,
      _folioService,
      _defaultService,
      _departamentoService
    );

    this.callbackOpcional_QRScannerService = ( ) => { 
      if ( this.orden.ubicacionActual.transformacion == null ) {
        // Creamos el departamento transformación para que no nos de error. 
        this.orden.ubicacionActual.transformacion = new Transformacion();
        // False por que a esta altura solo vamos a guardar la máquina. 
        this.orden.ubicacionActual.transformacion.guardar = false;
        this.orden.ubicacionActual.transformacion.maquinaActual = null;
      } 
    }; 
    
    
    this.tareasDeConfiguracion( new DepartamentosConfig().TRANSFORMACION )
    
    this._maquinaService.buscarMaquinasPorDepartamento( this.NOMBRE_DEPTO )
    .subscribe( (maquinas: Maquina[]) => {
          this.maquinas = maquinas;
    });

  }
  ngOnInit() {
    // Iniciamos el formulario.

    this.formulario = this.formBuilder.group({
      cantidadDeBoton: ['', 
      [
        Validators.required,
        Validators.min(1),
        Validators.max(99999),
        this._validacionesService.onlyIntegers
      ]
    ],
    espesorBoton: ['', [
      Validators.required,
      Validators.min(0.1),
      Validators.max(99.99),
      this._validacionesService.numberValidator,
    ]],
    bl: ['', 
    [
      Validators.required,
      Validators.min(1),
      Validators.max(300),
      this._validacionesService.onlyIntegers
    ]],
    // maquinaActual: ['', 
    // [
    //   Validators.required,
    // ]],
    });
    
    
  }


  public get cantidad(): AbstractControl {
    return this.formulario.get('cantidadDeBoton');
  }
  
  public get espesor(): AbstractControl {
    return this.formulario.get('espesorBoton');
  }
  
  public get bl(): AbstractControl {
    return this.formulario.get('bl');
  }
    
  // public get maquinaActual(): AbstractControl {
  //   return this.formulario.get('maquinaActual');
  // }

    
}

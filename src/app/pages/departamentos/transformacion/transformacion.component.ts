import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { QrScannerService } from '../../../components/qrScanner/qr-scanner.service';
import { ListaDeOrdenesService } from '../../../components/lista-de-ordenes/lista-de-ordenes.service';
import { FolioService, ValidacionesService, MaquinaService } from '../../../services/service.index';
import { Orden } from '../../../models/orden.models';
import { ModeloCompleto } from '../../../models/modeloCompleto.modelo';
import { FolioLinea } from '../../../models/folioLinea.models';
import swal from 'sweetalert2';
import { Maquina } from '../../../models/maquina.model';
import { Transformacion } from '../../../models/transformacion.models';

@Component({
  selector: 'app-transformacion',
  templateUrl: './transformacion.component.html',
  styles: []
})
export class TransformacionComponent implements OnInit {
  // =========================================
  private NOMBRE_DEPTO: string = 'TRANSFORMACION';
  // =========================================

  transformacionForm: FormGroup;
  orden: Orden;
  modeloCompleto: ModeloCompleto;
  linea: FolioLinea = new FolioLinea();
  maquinas: Maquina[];

  constructor(
    public _qrScannerService: QrScannerService,
    public _listaDeOrdenesService: ListaDeOrdenesService,
    private formBuilder: FormBuilder,
    public _folioService: FolioService,
    private _validacionesService: ValidacionesService,
    private _maquinaService: MaquinaService
  ) { 
    this._listaDeOrdenesService.depto = this.NOMBRE_DEPTO;
    this._listaDeOrdenesService.pastilla();

    this._maquinaService.buscarMaquinasPorDepartamento( this.NOMBRE_DEPTO )
    .subscribe( (maquinas: Maquina[]) => {
          this.maquinas = maquinas;
    });
    
    this._qrScannerService.callback = (data) => {
      this._folioService.buscarOrden( data, this.NOMBRE_DEPTO, this._qrScannerService.callbackError).subscribe(
        ( resp: any ) => {
          this.orden = resp.orden;
          this.modeloCompleto = resp.modeloCompleto;
          this.linea.modeloCompleto = this.modeloCompleto;
          this._qrScannerService.lecturaCorrecta = true;
        }
      );
    };

    this._qrScannerService.callbackError = ( ) => {
      this.limpiar();
    };

  }

  ngOnInit() {
    this._qrScannerService.iniciar();
    
    // Iniciamos el formulario.

    this.transformacionForm = this.formBuilder.group({
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
    maquinaActual: ['', 
    [
      Validators.required,
    ]],
    });
    
    
  }

  limpiar( ) {
    // Eliminamos la órde de la lista de órdenes. 
    if ( this.orden != null) {
      this._listaDeOrdenesService.remover( this.orden._id);
    }
    // Reiniciamos el escanner. 
    this._qrScannerService.iniciar();

    // Reiniciamos el formulario.
    this.transformacionForm.reset();
  }

  onSubmit(    ) {
     // Creamos el objeto nuevo para guardar en el departamento.
    const transformacion: Transformacion = new Transformacion();
    transformacion.cantidadDeBoton = this.transformacionForm.value.cantidadDeBoton;
    transformacion.espesorBoton = this.transformacionForm.value.espesorBoton;
    transformacion.maquinaActual = this.transformacionForm.value.maquinaActual;
    transformacion.bl = this.transformacionForm.value.bl;

    console.log(JSON.stringify(transformacion));
    
    this._folioService.modificarOrden( 
      transformacion, 
      this.orden._id,
      this.NOMBRE_DEPTO
    ).subscribe(
      resp => {
      this.limpiar();
    });

  }

  public get cantidad(): AbstractControl {
    return this.transformacionForm.get('cantidadDeBoton');
  }
  
  public get espesor(): AbstractControl {
    return this.transformacionForm.get('espesorBoton');
  }
  
  public get bl(): AbstractControl {
    return this.transformacionForm.get('bl');
  }
    
  public get maquinaActual(): AbstractControl {
    return this.transformacionForm.get('maquinaActual');
  }
    
}

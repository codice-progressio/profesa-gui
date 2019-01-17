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
import { DEPARTAMENTOS } from '../../../config/departamentos';
@Component({
  selector: 'app-transformacion',
  templateUrl: './transformacion.component.html',
  styles: []
})
export class TransformacionComponent implements OnInit {
  // =========================================
  private NOMBRE_DEPTO: string = DEPARTAMENTOS.TRANSFORMACION._n;
  // private NOMBRE_DEPTO: string = 'TRANSFORMACIÓN';
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
    this.cargarOrdenesDeDepartamento();
    
    this._maquinaService.buscarMaquinasPorDepartamento( this.NOMBRE_DEPTO )
    .subscribe( (maquinas: Maquina[]) => {
          this.maquinas = maquinas;
    });
    
    this._qrScannerService.buscarOrden( 
      this, 
      () => { this.limpiar(); }, 
      () => {

        if ( this.orden.ubicacionActual.transformacion == null ) {
          // Creamos el departamento transformación para que no nos de error. 
          this.orden.ubicacionActual.transformacion = new Transformacion();
          // False por que a esta altura solo vamos a guardar la máquina. 
          this.orden.ubicacionActual.transformacion.guardar = false;
          this.orden.ubicacionActual.transformacion.maquinaActual = null;
          
        }
      });
      this._qrScannerService.titulo = DEPARTAMENTOS.TRANSFORMACION._n;

  }

  cargarOrdenesDeDepartamento() {
    // this._listaDeOrdenesService.depto = this.NOMBRE_DEPTO;
    this._listaDeOrdenesService.transformacion();

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
    // maquinaActual: ['', 
    // [
    //   Validators.required,
    // ]],
    });
    
    
  }

  limpiar( ) {
   
    // Reiniciamos el escanner. 
    this._qrScannerService.iniciar();

    // Reiniciamos el formulario.
    this.transformacionForm.reset();
    // Cargamos las ordenes. 
    this.cargarOrdenesDeDepartamento();
    
  }

  onSubmit(    ) {
     // Creamos el objeto nuevo para guardar en el departamento.
    const transformacion: Transformacion = new Transformacion();
    transformacion.cantidadDeBoton = this.transformacionForm.value.cantidadDeBoton;
    transformacion.espesorBoton = this.transformacionForm.value.espesorBoton;
    transformacion.maquinaActual = this.orden.ubicacionActual.transformacion.maquinaActual;
    transformacion.bl = this.transformacionForm.value.bl;
    
    // Esto es necesario para que la BD valide. 
    transformacion.guardar = true;
    
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

  public iniciarTrabajoDeOrden( ) {
    // enviamos solo la modificación de la órden con el id 
    // para empezarla a trabajar. La modificación que necesitamos
    // es la de al ubicación actual.
    
    this._folioService.iniciarTrabajoDeOrden(this.orden, DEPARTAMENTOS.TRANSFORMACION, () => { this.limpiar(); } ).subscribe( orden => {
     this.limpiar();
    });

  }
    
}

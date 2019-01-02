import { Component, OnInit } from '@angular/core';
import { QrScannerService } from 'src/app/components/qrScanner/qr-scanner.service';
import swal from 'sweetalert2';
import { ListaDeOrdenesService } from 'src/app/components/lista-de-ordenes/lista-de-ordenes.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FolioService, ValidacionesService } from 'src/app/services/service.index';
import { DEPARTAMENTOS } from 'src/app/config/departamentos';
import { Orden } from 'src/app/models/orden.models';
import { FolioLinea } from 'src/app/models/folioLinea.models';
import { Barnizado } from 'src/app/models/barnizado.model';

@Component({
  selector: 'app-barnizado',
  templateUrl: './barnizado.component.html',
  styles: []
})
export class BarnizadoComponent implements OnInit {

  
    // =========================================
    private NOMBRE_DEPTO: string = DEPARTAMENTOS.BARNIZADO._n;
    // =========================================
  
    barnizadoForm: FormGroup;
    orden: Orden;
    barnizado: Barnizado;
    linea: FolioLinea = new FolioLinea();
    
  

  constructor(
    public _qrScannerService: QrScannerService,
    public _listaDeOrdenesService: ListaDeOrdenesService,
    private formBuilder: FormBuilder,
    public _folioService: FolioService,
    private _validacionesService: ValidacionesService,
  
  ) {

    this.cargarOrdenesDeDepartamento();
    this._qrScannerService.titulo = DEPARTAMENTOS.BARNIZADO._n;
    this._qrScannerService.buscarOrden( this, () => { this.limpiar(); });
    
   }

  ngOnInit() {
    this._qrScannerService.iniciar();

    this.barnizadoForm = this.formBuilder.group({
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
    return this.barnizadoForm.get('peso10Botones');
  }

  
  public get pesoTotalBoton_FB() : AbstractControl {
    return this.barnizadoForm.get('pesoTotalBoton');
  }
  

  cargarOrdenesDeDepartamento(){
    this._listaDeOrdenesService.barnizado();

  }

  limpiar(){
    this.cargarOrdenesDeDepartamento();
    this._qrScannerService.iniciar();
    this.barnizadoForm.reset();

  }

  onSubmit(modelo: Barnizado, isValid:boolean, e ){
    e.preventDefault();
    if( !isValid ) return;

    this._folioService.modificarOrden(modelo, this.orden._id, DEPARTAMENTOS.BARNIZADO._n)
    .subscribe(()=>{
      this.limpiar();
    });
  }

}

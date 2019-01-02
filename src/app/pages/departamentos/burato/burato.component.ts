import { Component, OnInit } from '@angular/core';
import { QrScannerService } from 'src/app/components/qrScanner/qr-scanner.service';
import { ListaDeOrdenesService } from 'src/app/components/lista-de-ordenes/lista-de-ordenes.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FolioService, ValidacionesService } from 'src/app/services/service.index';
import { DEPARTAMENTOS } from 'src/app/config/departamentos';
import { Metalizado } from '../../../models/metalizado.model';
import { Orden } from 'src/app/models/orden.models';
import { FolioLinea } from 'src/app/models/folioLinea.models';

@Component({
  selector: 'app-burato',
  templateUrl: './burato.component.html',
  styles: []
})
export class BuratoComponent implements OnInit {


    // =========================================
    private NOMBRE_DEPTO: string = DEPARTAMENTOS.BURATO._n;
    // =========================================
  
    buratoForm: FormGroup;
    orden: Orden;
    burato: Metalizado;
    linea: FolioLinea = new FolioLinea();
    
  

  constructor(
    public _qrScannerService: QrScannerService,
    public _listaDeOrdenesService: ListaDeOrdenesService,
    private formBuilder: FormBuilder,
    public _folioService: FolioService,
    private _validacionesService: ValidacionesService,
  
  ) {

    this.cargarOrdenesDeDepartamento();
    this._qrScannerService.titulo = DEPARTAMENTOS.BURATO._n;
    this._qrScannerService.buscarOrden( this, () => { this.limpiar(); });
    
   }

  ngOnInit() {
    this._qrScannerService.iniciar();

    this.buratoForm = this.formBuilder.group({
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
    return this.buratoForm.get('peso10Botones');
  }

  
  public get pesoTotalBoton_FB() : AbstractControl {
    return this.buratoForm.get('pesoTotalBoton');
  }
  

  cargarOrdenesDeDepartamento(){
    this._listaDeOrdenesService.burato();

  }

  limpiar(){
    this.cargarOrdenesDeDepartamento();
    this._qrScannerService.iniciar();
    this.buratoForm.reset();

  }

  onSubmit(modelo: Metalizado, isValid:boolean, e ){
    e.preventDefault();
    if( !isValid ) return;

    this._folioService.modificarOrden(modelo, this.orden._id, DEPARTAMENTOS.BURATO._n)
    .subscribe(()=>{
      this.limpiar();
    });
    
  }
}
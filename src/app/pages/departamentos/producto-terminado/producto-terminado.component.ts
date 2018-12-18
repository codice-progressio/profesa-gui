import { Component, OnInit } from '@angular/core';
import { DEPARTAMENTOS } from 'src/app/config/departamentos';
import { Orden } from 'src/app/models/orden.models';
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo';
import { FolioLinea } from 'src/app/models/folioLinea.models';
import { QrScannerService } from 'src/app/components/qrScanner/qr-scanner.service';
import { ListaDeOrdenesService } from 'src/app/components/lista-de-ordenes/lista-de-ordenes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FolioService, ValidacionesService } from 'src/app/services/service.index';
import { ProductoTerminado } from 'src/app/models/productoTerminado.model';

@Component({
  selector: 'app-producto-terminado',
  templateUrl: './producto-terminado.component.html',
  styles: []
})
export class ProductoTerminadoComponent implements OnInit {
// =========================================
private NOMBRE_DEPTO: string = DEPARTAMENTOS.PRODUCTO_TERMINADO._n;
// =========================================

  orden: Orden;
  modeloCompleto: ModeloCompleto;
  linea: FolioLinea = new FolioLinea();
  productoTerminadoForm: FormGroup;


  constructor(
    public _qrScannerService: QrScannerService,
    public _listaDeOrdenesService: ListaDeOrdenesService,
    private _fb: FormBuilder,
    public _folioService: FolioService,
    private _validacionesService: ValidacionesService,
  ) {
    this.cargarOrdenesDeDepartamento();
    this._qrScannerService.buscarOrden( this, () => { this.limpiar(); });
    this._qrScannerService.titulo = DEPARTAMENTOS.PRODUCTO_TERMINADO._n;
   }

  ngOnInit() {
    this._qrScannerService.iniciar();
    this.iniciarFormulario( );

  }

  cargarOrdenesDeDepartamento() {
    this._listaDeOrdenesService.depto = this.NOMBRE_DEPTO;
    this._listaDeOrdenesService.productoTerminado();
  
  }
  

  limpiar( ) {
    this.cargarOrdenesDeDepartamento();
    // Reiniciamos el escanner. 
    this._qrScannerService.iniciar();
    //Reiniciamos el formulario
    this.iniciarFormulario();
      
  }

  iniciarFormulario( ){
    this.productoTerminadoForm = this._fb.group({
      terminada: ['', [
        Validators.required
      ] ]
    });
  }

  onSubmit( model: any, isValid: boolean, e) {
    e.preventDefault();
    if ( !isValid ) return;

    const pd: ProductoTerminado = <ProductoTerminado> model;

    this._folioService.modificarOrden(pd, this.orden._id, this.NOMBRE_DEPTO)
    .subscribe(resp => {
      this.limpiar();
    });


  }
  
  getTerminada( ){
    return this.productoTerminadoForm.get('terminada');
  }




}

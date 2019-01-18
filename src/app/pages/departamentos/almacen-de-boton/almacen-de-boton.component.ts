import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Orden } from 'src/app/models/orden.models';
import { FolioLinea } from 'src/app/models/folioLinea.models';
import { QrScannerService } from 'src/app/components/qrScanner/qr-scanner.service';
import { ListaDeOrdenesService } from 'src/app/components/lista-de-ordenes/lista-de-ordenes.service';
import { FolioService, ValidacionesService } from 'src/app/services/service.index';
import { AlmacenDeBoton } from 'src/app/models/almacenDeBoton.model';
import { DEPARTAMENTOS } from '../../../config/departamentos';

@Component({
  selector: 'app-almacen-de-boton',
  templateUrl: './almacen-de-boton.component.html',
  styles: []
})
export class AlmacenDeBotonComponent implements OnInit {
  
  almacenDeBotonForm: FormGroup;
  orden: Orden;
  almacenDeBoton: AlmacenDeBoton;
  linea: FolioLinea = new FolioLinea();
  
 

  constructor(
    public _qrScannerService: QrScannerService,
    public _listaDeOrdenesService: ListaDeOrdenesService,
    private formBuilder: FormBuilder,
    public _folioService: FolioService,
    private _validacionesService: ValidacionesService,

  ) {
    this.cargarOrdenesDeDepartamento();
  }

  ngOnInit() {

    this._qrScannerService.iniciar();

    this.almacenDeBotonForm = this.formBuilder.group({
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
    return this.almacenDeBotonForm.get('cantidadDeBoton');
  }

  cargarOrdenesDeDepartamento(){
    this._listaDeOrdenesService.almacenDeBoton();

  }

  limpiar(){
    this.cargarOrdenesDeDepartamento();
    this._qrScannerService.iniciar();
    this.almacenDeBotonForm.reset();

  }

  onSubmit(modelo: AlmacenDeBoton, isValid:boolean, e ){
    e.preventDefault();
    if( !isValid ) return;

    this._folioService.modificarOrden(modelo, this.orden._id, DEPARTAMENTOS.ALMACEN_DE_BOTON._n)
    .subscribe(()=>{
      this.limpiar();
    });
    
  }


}

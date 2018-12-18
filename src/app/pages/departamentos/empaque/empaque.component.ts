import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Orden } from 'src/app/models/orden.models';
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo';
import { FolioLinea } from 'src/app/models/folioLinea.models';
import { QrScannerService } from 'src/app/components/qrScanner/qr-scanner.service';
import { ListaDeOrdenesService } from 'src/app/components/lista-de-ordenes/lista-de-ordenes.service';
import { FolioService, ValidacionesService, UsuarioService } from 'src/app/services/service.index';
import { Seleccion } from 'src/app/models/seleccion.models';
import { Empaque } from 'src/app/models/empaque.models';
import { Usuario } from 'src/app/models/usuario.model';
import { DEPARTAMENTOS } from 'src/app/config/departamentos';

@Component({
  selector: 'app-empaque',
  templateUrl: './empaque.component.html',
  styles: []
})
export class EmpaqueComponent implements OnInit {
// =========================================
private NOMBRE_DEPTO: string = DEPARTAMENTOS.EMPAQUE._n;
// =========================================

seleccionForm: FormGroup;
orden: Orden;
modeloCompleto: ModeloCompleto;
linea: FolioLinea = new FolioLinea();
usuarios: Usuario [] = [];



constructor(
  public _qrScannerService: QrScannerService,
  public _listaDeOrdenesService: ListaDeOrdenesService,
  private formBuilder: FormBuilder,
  public _folioService: FolioService,
  private _validacionesService: ValidacionesService,
  public _usuarioService: UsuarioService
) { 
 
  this.cargarOrdenesDeDepartamento();
  this._qrScannerService.buscarOrden( this, () => { this.limpiar(); });
  this._qrScannerService.titulo = DEPARTAMENTOS.EMPAQUE._n;
  
  this._usuarioService.cargarEmpacadores().subscribe( resp => {
    this.usuarios = resp;
  });

}

ngOnInit() {
  this._qrScannerService.iniciar();
  
  
  // Iniciamos el formulario.

  this.seleccionForm = this.formBuilder.group({
    cantidadDeBoton: ['', 
    [
      Validators.required,
      Validators.min(1),
      Validators.max(99999),
      this._validacionesService.numberValidator,
    ]
  ],
  contadoPor: ['', 
    [
      Validators.required,
    ]
  ],
  
  });
}

cargarOrdenesDeDepartamento() {
  this._listaDeOrdenesService.depto = this.NOMBRE_DEPTO;
  this._listaDeOrdenesService.empaque();

}


limpiar( ) {
  this.cargarOrdenesDeDepartamento();
  // Reiniciamos el escanner. 
  this._qrScannerService.iniciar();

  // Reiniciamos el formulario.
  this.seleccionForm.reset();
}

onSubmit(    ) {

   // Creamos el objeto nuevo para guardar en el departamento.
  const seleccion: Empaque = new Empaque();
  seleccion.cantidadDeBoton = this.seleccionForm.value.cantidadDeBoton;
  seleccion.contadoPor = this.seleccionForm.value.contadoPor;

  this._folioService.modificarOrden( 
    seleccion, 
    this.orden._id,
    this.NOMBRE_DEPTO
  ).subscribe(
    () => {
      this.limpiar();
    });

}

public get getCantidadDeBoton(): AbstractControl {
   return this.seleccionForm.get('cantidadDeBoton');
}

public get getContadoPor(): AbstractControl {
  return this.seleccionForm.get('contadoPor');
}


}

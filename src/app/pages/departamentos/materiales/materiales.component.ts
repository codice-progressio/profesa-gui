import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuarioService, FolioService } from '../../../services/service.index';
import { Usuario } from '../../../models/usuario.model';

import { QrScannerService } from '../../../components/qrScanner/qr-scanner.service';
import { Orden } from '../../../models/orden.models';
import { ModeloCompleto } from '../../../models/modeloCompleto.modelo';
import { FolioLinea } from '../../../models/folioLinea.models';
import { ListaDeOrdenesService } from '../../../components/lista-de-ordenes/lista-de-ordenes.service';
import { Materiales } from '../../../models/materiales.models';
import swal from 'sweetalert2';



@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styles: []
})
export class MaterialesComponent implements OnInit {

  // =========================================
  private NOMBRE_DEPTO: string = 'MATERIALES';
  // =========================================

  fecha: Date = new Date();
  // hora: number;
  // min: number;
  empleados: Usuario [] = [];
  empleadoSeleccionado: Usuario;
  
  
  orden: Orden = null;
  modeloCompleto: ModeloCompleto = new ModeloCompleto();
  linea: FolioLinea = new FolioLinea();
  



  constructor(
    public _usuarioService: UsuarioService,
    public _qrScannerService: QrScannerService,
    public _folioService: FolioService,
    public _listaDeOrdenesService: ListaDeOrdenesService
  ) {

    this._listaDeOrdenesService.depto = this.NOMBRE_DEPTO;
    this._listaDeOrdenesService.materiales();
    
    this._usuarioService.buscarUsuarioPorROLE('MATERIALES_REGISTRO_ROLE')
        .subscribe( (usuarios: Usuario[]) => {
          this.empleados = usuarios;
        });

    this._qrScannerService.callback = (data) => {
      this._folioService.buscarOrden( data, this.NOMBRE_DEPTO, this._qrScannerService.callbackError ).subscribe(
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
  }

  // noPunto =  function(e) {

  //   console.log(e);
  //   const keyCode = (e.keyCode ? e.keyCode : e.which);
  //   const numeros =  48 >= keyCode || keyCode <= 57 || 95 >= keyCode || keyCode < 105;
  //   if ( keyCode === 8) {
  //     return;
  //   }
  //   if (!numeros ) {
  //     console.log('Prevent!');
  //     e.preventDefault();
  //   }
  // };

  
  guardar() {

    // Creamos el objeto nuevo para guardar en el departamento.
    if ( !this.empleadoSeleccionado) {
      swal('Faltan datos', 'No has seleccionado al empleado', 'error');
      return;
    }

    this._folioService.modificarOrden( 
      new Materiales(this.empleadoSeleccionado), 
      this.orden._id,
      this.NOMBRE_DEPTO
      ).subscribe(
      resp => {
      this.limpiar();
    });
  }

  limpiar ( ) {
     // Elimnamos la órden de la lista de órdenes.
     if ( this.orden != null) {
       this._listaDeOrdenesService.remover( this.orden._id);
     }

     // Reiniciamos el escanner. 
     this._qrScannerService.iniciar();

     // Reiniciamos los valores de captura. 
     this.empleadoSeleccionado = null;
     this._qrScannerService.lecturaCorrecta = false;
  }


  

}

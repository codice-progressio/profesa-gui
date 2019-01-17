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
import { DEPARTAMENTOS } from '../../../config/departamentos';



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

    this.cargarOrdenesDeDepartamento();
    
    this._usuarioService.cargarMateriales()
        .subscribe( (usuarios: Usuario[]) => {
          this.empleados = usuarios;
        });
      
    this._qrScannerService.buscarOrden( this, () => { this.limpiar(); });
    this._qrScannerService.titulo = DEPARTAMENTOS.MATERIALES._n;

   }

  ngOnInit() {
    this._qrScannerService.iniciar();
  }

  cargarOrdenesDeDepartamento( ) {
    // this._listaDeOrdenesService.depto = this.NOMBRE_DEPTO;
    this._listaDeOrdenesService.materiales();
  }

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
 
    this.cargarOrdenesDeDepartamento();

     // Reiniciamos el escanner. 
     this._qrScannerService.iniciar();

     // Reiniciamos los valores de captura. 
     this.empleadoSeleccionado = null;
     this._qrScannerService.lecturaCorrecta = false;
  }


  

}

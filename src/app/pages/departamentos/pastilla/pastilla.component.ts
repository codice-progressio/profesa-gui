import { Component, OnInit } from '@angular/core';
import { UsuarioService, FolioService } from '../../../services/service.index';
import { QrScannerService } from '../../../components/qrScanner/qr-scanner.service';
import { ListaDeOrdenesService } from '../../../components/lista-de-ordenes/lista-de-ordenes.service';
import { Pastilla } from '../../../models/pastilla.model';
import { FolioLinea } from '../../../models/folioLinea.models';
import { Orden } from '../../../models/orden.models';
import { ModeloCompleto } from '../../../models/modeloCompleto.modelo';
import { Usuario } from '../../../models/usuario.model';

import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { ValidacionesService } from '../../../services/utilidades/validaciones.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-pastilla',
  templateUrl: './pastilla.component.html',
  styles: []
})
export class PastillaComponent implements OnInit {

  // =========================================
  private NOMBRE_DEPTO: string = 'PASTILLA';
  // =========================================

  // Necesario
  linea: FolioLinea = new FolioLinea();
  orden: Orden = null;
  modeloCompleto: ModeloCompleto = new ModeloCompleto();
  // empleadoSeleccionado: Usuario;
  empleados: Usuario[];

  // Instanciamos un grupo de formulario de reactiveForms
  //  y que tiene que coincidir con [formGroup]. Este elemento
  //  se pasa como instancia a [formGruop] = "pastillaForm"
  pastillaForm: FormGroup;
  
  constructor(

    public _usuarioService: UsuarioService,
    public _qrScannerService: QrScannerService,
    public _folioService: FolioService,
    public _listaDeOrdenesService: ListaDeOrdenesService,
    // Cremos el control abstracto para revisar las validaciones. 
    private formBuilder: FormBuilder,
    // El servicio de validaciones personalizados nuestro. 
    public _validacionesService: ValidacionesService

  ) { 
    this.cargarOrdenesDeDepartamento();
    this._usuarioService.buscarUsuarioPorROLE('MATERIALES_REGISTRO_ROLE')
        .subscribe( (usuarios: Usuario[]) => {
          this.empleados = usuarios;
        });

    
  
      this._qrScannerService.buscarOrden(this, () => { this.limpiar(); });
  //   this._qrScannerService.callback = (data) => {
  //     this._folioService.buscarOrden( data, this.NOMBRE_DEPTO, this._qrScannerService.callbackError).subscribe(
  //       ( resp: any ) => {
  //         this.orden = resp.orden;
  //         this.modeloCompleto = resp.modeloCompleto;
  //         this.linea.modeloCompleto = this.modeloCompleto;
  //         this._qrScannerService.lecturaCorrecta = true;
  //       }
  //     );
  //   };

  //   this._qrScannerService.callbackError = ( ) => {
  //     this.limpiar();
  //   };
  }

  cargarOrdenesDeDepartamento( ) {
    this._listaDeOrdenesService.depto = this.NOMBRE_DEPTO;
    this._listaDeOrdenesService.pastilla();
  }

  ngOnInit() {
    this._qrScannerService.iniciar();
    

    this.pastillaForm = this.formBuilder.group({
      // El nombre del objeto tiene que coincidir con 
      // el [formControlName] del input en el html. 
      cantidadPastilla: ['', 
        [
          Validators.required,
          Validators.min(1),
          Validators.max(99999),
          this._validacionesService.onlyIntegers
        ]
      ],
      espesorPastilla: ['', [
        Validators.required,
        Validators.min(0.1),
        Validators.max(99.99),
        this._validacionesService.numberValidator,
      ]],
      conto: ['', [
        Validators.required,
      ]],
   });
  }

  onSubmit() {
    // Creamos el objeto nuevo para guardar en el departamento.
    const pastilla: Pastilla = new Pastilla();
    pastilla.cantidadPastilla = this.pastillaForm.value.cantidadPastilla;
    pastilla.espesorPastilla = this.pastillaForm.value.espesorPastilla;
    pastilla.conto = this.pastillaForm.value.conto;
    
    this._folioService.modificarOrden( 
      pastilla, 
      this.orden._id,
      this.NOMBRE_DEPTO
      ).subscribe(
      resp => {
      this.limpiar();
    });
  }


  limpiar( ) {
     // Elimnamos la órden de la lista de órdenes.
     if ( this.orden != null) {
      this._listaDeOrdenesService.remover( this.orden._id);
    }
    // Reiniciamos el escanner. 
    this._qrScannerService.iniciar();

    // Limpiamos el formulario. 
    this.pastillaForm.reset();
  }

public get cantidad(): AbstractControl {
  return this.pastillaForm.get('cantidadPastilla');
}

public get espesor(): AbstractControl {
  return this.pastillaForm.get('espesorPastilla');
}

public get conto(): AbstractControl {
  return this.pastillaForm.get('conto');
}


 

 

}

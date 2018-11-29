import { Component, OnInit } from '@angular/core';
import { UsuarioService, FolioService } from '../../../services/service.index';
import { QrScannerService } from '../../../components/qrScanner/qr-scanner.service';
import { ListaDeOrdenesService } from '../../../components/lista-de-ordenes/lista-de-ordenes.service';
import { Pastilla, CantidadesPastilla } from '../../../models/pastilla.model';
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
  cantidadesPastilla: CantidadesPastilla[] = [new CantidadesPastilla()];

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
  }

  cargarOrdenesDeDepartamento( ) {
    this._listaDeOrdenesService.depto = this.NOMBRE_DEPTO;
    this._listaDeOrdenesService.pastilla();
  }

  ngOnInit() {
    this._qrScannerService.iniciar();
    this.construirForm();
  }

  construirForm ( ) {
    const valPeso10Botones = [
      Validators.required,
      Validators.min(1),
      Validators.max(1000),
      this._validacionesService.numberValidator,
    ];
    
    const valPesoTotalBoton = [
      Validators.required,
      Validators.min(1),
      Validators.max(99),
      this._validacionesService.numberValidator,
    ];

    const valEspesor = [
      Validators.required,
      Validators.min(0.1),
      Validators.max(99.99),
      this._validacionesService.numberValidator,
    ];
  
    const grupo = {
      // El nombre del objeto tiene que coincidir con 
      // el [formControlName] del input en el html. 
      // cantidadPastilla: ['', valCantidadDePastilla],
      // espesorPastilla: ['', valEspesor],
      conto: ['', [
        Validators.required,
      ]],
   };

   for (let i = 0; i < this.cantidadesPastilla.length; i++) {
     const cantidad = this.cantidadesPastilla[i];
        grupo['peso10Botones' + i] = ['', valPeso10Botones];  
        grupo['pesoTotalBoton' + i] = ['', valPesoTotalBoton];  
        grupo['espesorPastilla' + i] = ['', valEspesor];  
   }

    this.pastillaForm = this.formBuilder.group(grupo);
  }

  agregarCantidades( ) {
    const a: CantidadesPastilla = new CantidadesPastilla();
    this.cantidadesPastilla.push(a);
    // Limpiamos las cantidades hasta que no resolvamos el 
    // problema del binding. 
    this.cantidadesPastilla.forEach((b: CantidadesPastilla) => {
      b.espesorPastilla = null;
      b.peso10Botones = null;
      b.pesoTotalBoton = null;
    });
    this.construirForm();
  }

  eliminarCantidades(i: number) {
    this.cantidadesPastilla.splice(i, 1);
    this.construirForm() ;
  }

  onSubmit() {
    // Creamos el objeto nuevo para guardar en el departamento.
    const pastilla: Pastilla = new Pastilla();
    pastilla.cantidades = this.cantidadesPastilla;
    pastilla.conto = this.pastillaForm.value.conto;

    for (let i = 0; i < this.cantidadesPastilla.length; i++) {
      const cantidad = this.cantidadesPastilla[i];
        const a: CantidadesPastilla = new CantidadesPastilla();
        a.peso10Botones =   this.pastillaForm.value['peso10Botones' + i];
        a.pesoTotalBoton =   this.pastillaForm.value['pesoTotalBoton' + i];
        a.espesorPastilla =   this.pastillaForm.value['espesorPastilla' + i];
        pastilla.cantidades.push( a );
    }
 
    
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

// public get cantidad(): AbstractControl {
//   return this.pastillaForm.get('cantidadPastilla');
// }

// public get espesor(): AbstractControl {
//   return this.pastillaForm.get('espesorPastilla');
// }

public get conto(): AbstractControl {
  return this.pastillaForm.get('conto');
}

trackByFn(index: any, item: any) {
  return index;
}

}

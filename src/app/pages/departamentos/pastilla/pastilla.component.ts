import { Component, OnInit } from '@angular/core';
import { UsuarioService, FolioService } from '../../../services/service.index';
import { QrScannerService } from '../../../components/qrScanner/qr-scanner.service';
import { ListaDeOrdenesService } from '../../../components/lista-de-ordenes/lista-de-ordenes.service';
import { Pastilla, CantidadesPastilla } from '../../../models/pastilla.model';
import { FolioLinea } from '../../../models/folioLinea.models';
import { Orden } from '../../../models/orden.models';
import { ModeloCompleto } from '../../../models/modeloCompleto.modelo';
import { Usuario } from '../../../models/usuario.model';

import { FormBuilder, Validators, FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { ValidacionesService } from '../../../services/utilidades/validaciones.service';
import swal from 'sweetalert2';
import { DEPARTAMENTOS } from 'src/app/config/departamentos';


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
    private _fb: FormBuilder,
    // El servicio de validaciones personalizados nuestro. 
    public _validacionesService: ValidacionesService

  ) { 
    this.cargarOrdenesDeDepartamento();
    this._usuarioService.cargarMateriales(  )
        .subscribe( (usuarios: Usuario[]) => {
          this.empleados = usuarios;
        });
    this._qrScannerService.buscarOrden(this, () => { this.limpiar(); });
    this._qrScannerService.titulo = DEPARTAMENTOS.PASTILLA._n;
  }

  cargarOrdenesDeDepartamento( ) {
    this._listaDeOrdenesService.depto = this.NOMBRE_DEPTO;
    this._listaDeOrdenesService.pastilla();
  }

  ngOnInit() {
    this._qrScannerService.iniciar();
    this.inicialFormulario();
  }

  inicialFormulario ( ) {
    
  
    const grupo = {
      // El nombre del objeto tiene que coincidir con 
      // el [formControlName] del input en el html. 
      // cantidadPastilla: ['', valCantidadDePastilla],
      // espesorPastilla: ['', valEspesor],
      conto: ['', [
        Validators.required,
      ]],
      cantidades: this._fb.array([
        // Inicializamos por lo menos con un valor.
        this.getCantidades()
      ])
    };

  //  for (let i = 0; i < this.cantidadesPastilla.length; i++) {
  //    const cantidad = this.cantidadesPastilla[i];
  //       grupo['peso10Botones' + i] = ['', valPeso10Botones];  
  //       grupo['pesoTotalBoton' + i] = ['', valPesoTotalBoton];  
  //       grupo['espesorPastilla' + i] = ['', valEspesor];  
  //  }

    this.pastillaForm = this._fb.group(grupo);
  }

  getCantidades( ){
    // Este es la plantilla para crear
    // de manera dinamica los validadores para
    // el arreglo.
    const valPeso10Botones = [
      '',
     [ Validators.required,
      Validators.min(1),
      Validators.max(1000),
      this._validacionesService.numberValidator],
    ];
    
    const valPesoTotalBoton = [
      '',
      [Validators.required,
      Validators.min(1),
      Validators.max(99),
      this._validacionesService.numberValidator],
    ];

    const valEspesor = [
      '',
     [ Validators.required,
      Validators.min(0.1),
      Validators.max(99.99),
      this._validacionesService.numberValidator],
    ];
    return this._fb.group({
      espesorPastilla : valPesoTotalBoton,
      peso10Botones :  valPeso10Botones,
      pesoTotalBoton : valEspesor,
    });
  }

  agregarCantidades( ) {
    // Obtenemos el control al cual le vamos a agregar 
    // la nueva hilera.
    const control = <FormArray> this.pastillaForm.controls['cantidades'];
    control.push(this.getCantidades());


    // this.cantidadesPastilla.push(a);
    // // Limpiamos las cantidades hasta que no resolvamos el 
    // // problema del binding. 
    // this.cantidadesPastilla.forEach((b: CantidadesPastilla) => {
    //   b.espesorPastilla = null;
    //   b.peso10Botones = null;
    //   b.pesoTotalBoton = null;
    // });
    // this.construirForm();
  }


  eliminarCantidades(i: number) {
    // this.cantidadesPastilla.splice(i, 1);
    // this.construirForm() ;
    const control = <FormArray> this.pastillaForm.controls['cantidades'];
    control.removeAt(i);
  }

  onSubmit(model: any, isValid: boolean, e) {
    e.preventDefault()
    // Evitamos que medio mandee el formulario con el enter.
    if( !isValid ) return; 
    // Creamos el objeto nuevo para guardar en el departamento.
    const pastilla: Pastilla = <Pastilla>model;
      
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
    
    // Reiniciamos el escanner. 
    this._qrScannerService.iniciar();
    
    // Limpiamos el formulario. 
    this.pastillaForm.reset();
    this.inicialFormulario();

    this.cargarOrdenesDeDepartamento();
    
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

public _paso(a: any ){  
  return a;
    }

totalBoton(): number {
  // Recorremos todos los controles para obtener su valor.
  let t : number = 0;
  for (const x in this.pastillaForm.controls) {
    if (this.pastillaForm.controls.hasOwnProperty(x)) {
      const control = this.pastillaForm.controls[x];
      for (let i = 0; i < control.value.length; i++) {
        const datos = control.value[i];
        if ( datos ) {
          const ptb = datos.pesoTotalBoton ? datos.pesoTotalBoton : 0;
          const p10b = datos.peso10Botones ? datos.peso10Botones : 0;
          if( ptb && p10b){
            t += (ptb*1000)/(p10b/10);
          }
        }
      }
    }
  }
  return t;
}
}

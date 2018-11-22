import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Orden } from '../../../models/orden.models';
import { ModeloCompleto } from '../../../models/modeloCompleto.modelo';
import { FolioLinea } from '../../../models/folioLinea.models';
import { QrScannerService } from '../../../components/qrScanner/qr-scanner.service';
import { ListaDeOrdenesService } from '../../../components/lista-de-ordenes/lista-de-ordenes.service';
import { FolioService, ValidacionesService, UsuarioService } from '../../../services/service.index';
import { Seleccion } from 'src/app/models/seleccion.models';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styles: []
})
export class SeleccionComponent implements OnInit {

  // =========================================
  private NOMBRE_DEPTO: string = 'SELECCION';
  // =========================================

  seleccionForm: FormGroup;
  orden: Orden;
  modeloCompleto: ModeloCompleto;
  linea: FolioLinea = new FolioLinea();
  usuarios: Usuario[] = [];



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
    this._usuarioService.cargarSeleccionadores().subscribe( resp => {
      this.usuarios = resp;
    });
  }

  cargarOrdenesDeDepartamento() {
    this._listaDeOrdenesService.depto = this.NOMBRE_DEPTO;
    this._listaDeOrdenesService.pastilla();
  }

  ngOnInit() {
    this._qrScannerService.iniciar();
    
    // Iniciamos el formulario.

    this.seleccionForm = this.formBuilder.group({
      quebrados: ['', 
      [
        Validators.required,
        Validators.min(1),
        Validators.max(99999),
        this._validacionesService.numberValidator,
      ]
    ],
    paraNegro: ['', 
      [
        Validators.required,
        Validators.min(1),
        Validators.max(99999),
        this._validacionesService.numberValidator,
      ]
    ],
    seleccionadoPor: ['', 
      [
        Validators.required,
      ]
    ],
    
    });
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
    const seleccion: Seleccion = new Seleccion();
    seleccion.quebrados = this.seleccionForm.value.quebrados;
    seleccion.paraNegro = this.seleccionForm.value.paraNegro;
    seleccion.seleccionadoPor = this.seleccionForm.value.seleccionadoPor;

    this._folioService.modificarOrden( 
      seleccion, 
      this.orden._id,
      this.NOMBRE_DEPTO
    ).subscribe(
      () => {
        this.limpiar();
      });

  }

  public get getQuebrados(): AbstractControl {
     return this.seleccionForm.get('quebrados');
  }
  
  public get getParaNegro(): AbstractControl {
    return this.seleccionForm.get('paraNegro');
  }
  
  public get getSeleccionadoPor(): AbstractControl {
    return this.seleccionForm.get('seleccionadoPor');
  }
  

}

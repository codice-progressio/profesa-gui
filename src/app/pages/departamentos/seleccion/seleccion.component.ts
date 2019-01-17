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
import { DEPARTAMENTOS } from 'src/app/config/departamentos';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styles: []
})
export class SeleccionComponent implements OnInit {

  // =========================================
  private NOMBRE_DEPTO: string = DEPARTAMENTOS.SELECCION._n;
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
    this._qrScannerService.titulo = DEPARTAMENTOS.SELECCION._n;
    this._usuarioService.cargarSeleccionadores().subscribe( resp => {
      this.usuarios = resp;
    });
  }

  cargarOrdenesDeDepartamento() {
    // this._listaDeOrdenesService.depto = DEPARTAMENTOS.SELECCION._n;
    this._listaDeOrdenesService.seleccion();
  }

  ngOnInit() {
    this._qrScannerService.iniciar();
    
    // Iniciamos el formulario.

    this.seleccionForm = this.formBuilder.group({
      quebrados: ['', 
      [
        Validators.min(1),
        Validators.max(99999),
        this._validacionesService.numberValidator,
        this._validacionesService.onlyIntegers,
        this._validacionesService.onlyIntegers,
      ]
    ],
    paraNegro: ['', 
    [
      Validators.min(1),
      Validators.max(99999),
      this._validacionesService.numberValidator,
      this._validacionesService.onlyIntegers,
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

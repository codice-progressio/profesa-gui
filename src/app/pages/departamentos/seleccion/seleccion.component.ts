import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Orden } from '../../../models/orden.models';
import { ModeloCompleto } from '../../../models/modeloCompleto.modelo';
import { FolioLinea } from '../../../models/folioLinea.models';
import { QrScannerService } from '../../../components/qrScanner/qr-scanner.service';
import { ListaDeOrdenesService } from '../../../components/lista-de-ordenes/lista-de-ordenes.service';
import { FolioService, ValidacionesService, UsuarioService, DepartamentoService } from '../../../services/service.index';
import { Seleccion } from 'src/app/models/seleccion.models';
import { Usuario } from 'src/app/models/usuario.model';
import { DEPARTAMENTOS } from 'src/app/config/departamentos';
import { GeneralesComponents } from '../../utilidadesPages/generalesComponents';
import { DefaultsService } from 'src/app/services/configDefualts/defaults.service';
import { DepartamentosConfig } from 'src/app/config/departamentosConfig';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styles: []
})
export class SeleccionComponent  extends GeneralesComponents< Seleccion >  implements OnInit {

  usuarios: Usuario[] = [];



  constructor(
    public _qrScannerService: QrScannerService< Seleccion >,
    public _listaDeOrdenesService: ListaDeOrdenesService,
    public formBuilder: FormBuilder,
    public _folioService: FolioService,
    public _defaultService: DefaultsService,
    public _departamentoService: DepartamentoService,
    public _validacionesService: ValidacionesService,
    // Propios del departamento.
    public _usuarioService: UsuarioService
  ) { 
    super(
      _qrScannerService,
      _listaDeOrdenesService,
      formBuilder,
      _folioService,
      _defaultService,
      _departamentoService
    );
    this.tareasDeConfiguracion( new DepartamentosConfig().SELECCION )

    this._usuarioService.cargarSeleccionadores().subscribe( resp => {
      this.usuarios = resp;
    });
  }

  ngOnInit() {
    // Iniciamos el formulario.

    this.formulario = this.formBuilder.group({
    
    seleccionadoPor: ['', 
      [
        Validators.required,
      ]
    ],
    quebrados: ['', 
    [
      Validators.min(1),
      Validators.max(99999),
      this._validacionesService.numberValidator,
      this._validacionesService.onlyIntegers,
      this._validacionesService.onlyIntegers,
    ]
  ],
    reves: ['', 
    [
      Validators.min(1),
      Validators.max(99999),
      this._validacionesService.numberValidator,
      this._validacionesService.onlyIntegers,
      this._validacionesService.onlyIntegers,
    ]
  ],
    despostillado: ['', 
    [
      Validators.min(1),
      Validators.max(99999),
      this._validacionesService.numberValidator,
      this._validacionesService.onlyIntegers,
      this._validacionesService.onlyIntegers,
    ]
  ],
    sinLaser: ['', 
    [
      Validators.min(1),
      Validators.max(99999),
      this._validacionesService.numberValidator,
      this._validacionesService.onlyIntegers,
      this._validacionesService.onlyIntegers,
    ]
  ],
    sinHoyos: ['', 
    [
      Validators.min(1),
      Validators.max(99999),
      this._validacionesService.numberValidator,
      this._validacionesService.onlyIntegers,
      this._validacionesService.onlyIntegers,
    ]
  ],
    efectoMalo: ['', 
    [
      Validators.min(1),
      Validators.max(99999),
      this._validacionesService.numberValidator,
      this._validacionesService.onlyIntegers,
      this._validacionesService.onlyIntegers,
    ]
  ],
    otros: ['', 
    [
      Validators.min(1),
      Validators.max(99999),
      this._validacionesService.numberValidator,
      this._validacionesService.onlyIntegers,
      this._validacionesService.onlyIntegers,
    ]
  ],
    descripcionDeOtro: ['', 
    [
      
    ]
  ],


  
    
    });
  }
  
  public get getSeleccionadoPor(): AbstractControl {
    return this.formulario.get('seleccionadoPor');
  }
  public get getQuebrados(): AbstractControl {
     return this.formulario.get('quebrados');
  }
  public get getReves(): AbstractControl {
     return this.formulario.get('reves');
  }
  public get getDespostillado(): AbstractControl {
     return this.formulario.get('despostillado');
  }
  public get getSinLaser(): AbstractControl {
     return this.formulario.get('sinLaser');
  }
  public get getSinHoyos(): AbstractControl {
     return this.formulario.get('sinHoyos');
  }
  public get getEfectoMalo(): AbstractControl {
     return this.formulario.get('efectoMalo');
  }
  public get getOtros(): AbstractControl {
     return this.formulario.get('otros');
  }
  public get getDescripcionDeOtro(): AbstractControl {
     return this.formulario.get('descripcionDeOtro');
  }
  
 
  
  

}

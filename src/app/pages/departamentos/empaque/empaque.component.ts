import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { QrScannerService } from 'src/app/components/qr-scanner/qr-scanner.service';
import { ListaDeOrdenesService } from 'src/app/components/lista-de-ordenes/lista-de-ordenes.service';
import { FolioService, ValidacionesService, UsuarioService, DepartamentoService } from 'src/app/services/service.index';
import { Empaque } from 'src/app/models/empaque.models';
import { Usuario } from 'src/app/models/usuario.model';
import { GeneralesComponents } from '../../utilidadesPages/generalesComponents';
import { DefaultsService } from 'src/app/services/configDefualts/defaults.service';
import { DepartamentosConfig } from 'src/app/config/departamentosConfig';

@Component({
  selector: 'app-empaque',
  templateUrl: './empaque.component.html',
  styles: []
})
export class EmpaqueComponent extends GeneralesComponents< Empaque > implements OnInit {

  usuarios: Usuario [] = [];
  

  constructor(
    public _qrScannerService: QrScannerService<Empaque>,
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
    
    this.tareasDeConfiguracion( new DepartamentosConfig().EMPAQUE )

    this._usuarioService.cargarEmpacadores().subscribe( resp => {
      this.usuarios = resp;
    });

  }

  ngOnInit() {

    this.formulario = this.formBuilder.group({
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

  public get getCantidadDeBoton(): AbstractControl {
    return this.formulario.get('cantidadDeBoton');
  }

  public get getContadoPor(): AbstractControl {
    return this.formulario.get('contadoPor');
  }


}

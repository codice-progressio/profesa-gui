import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Orden } from '../../../models/orden.models';
import { ModeloCompleto } from '../../../models/modeloCompleto.modelo';
import { FolioLinea } from '../../../models/folioLinea.models';
import { Maquina } from '../../../models/maquina.model';
import { QrScannerService } from '../../../components/qrScanner/qr-scanner.service';
import { ListaDeOrdenesService } from '../../../components/lista-de-ordenes/lista-de-ordenes.service';
import { FolioService, ValidacionesService, MaquinaService, UsuarioService } from '../../../services/service.index';
import { Transformacion } from '../../../models/transformacion.models';
import swal from 'sweetalert2';
import { Pulido } from '../../../models/pulido.models';

@Component({
  selector: 'app-pulido',
  templateUrl: './pulido.component.html',
  styles: []
})
export class PulidoComponent implements OnInit {

  // =========================================
  private NOMBRE_DEPTO: string = 'PULIDO';
  // =========================================

  pulidoForm: FormGroup;
  orden: Orden;
  modeloCompleto: ModeloCompleto;
  linea: FolioLinea = new FolioLinea();
  



  constructor(
    public _qrScannerService: QrScannerService,
    public _listaDeOrdenesService: ListaDeOrdenesService,
    private formBuilder: FormBuilder,
    public _folioService: FolioService,
    private _validacionesService: ValidacionesService,
    // public _usuarioService: UsuarioService
  ) { 
    
    this.cargarOrdenesDeDepartamento();
    this._qrScannerService.buscarOrden( this, () => { this.limpiar(); });


  }

  cargarOrdenesDeDepartamento( ) {
    this._listaDeOrdenesService.depto = this.NOMBRE_DEPTO;
    this._listaDeOrdenesService.pastilla();
  }

  ngOnInit() {
    this._qrScannerService.iniciar();
    
    // Iniciamos el formulario.
    this.pulidoForm = this.formBuilder.group({
      peso10Botones: ['', 
      [
        Validators.required,
        Validators.min(0.01),
        Validators.max(500),
        this._validacionesService.numberValidator,
      ]
    ],
    pesoTotalBoton: ['', [
      Validators.required,
      Validators.min(0.1),
      Validators.max(99.99),
      this._validacionesService.numberValidator,
    ]],
    });
    
    
  }

  limpiar( ) {
    this.cargarOrdenesDeDepartamento();
    // Reiniciamos el escanner. 
    this._qrScannerService.iniciar();

    // Reiniciamos el formulario.
    this.pulidoForm.reset();
  }

  onSubmit(    ) {
     // Creamos el objeto nuevo para guardar en el departamento.
    const pulido: Pulido = new Pulido();
    pulido.peso10Botones = this.pulidoForm.value.peso10Botones;
    pulido.pesoTotalBoton = this.pulidoForm.value.pesoTotalBoton;
    pulido.cantidad = this.calcularCantidad();

    this._folioService.modificarOrden( 
      pulido, 
      this.orden._id,
      this.NOMBRE_DEPTO
    ).subscribe(
      resp => {
      this.limpiar();
    });

  }

  public get peso10(): AbstractControl {
     return this.pulidoForm.get('peso10Botones');
  }
  
  public get pesoTotal(): AbstractControl {
    return this.pulidoForm.get('pesoTotalBoton');
  }
  
  // public get cant(): AbstractControl {
  //   return this.pulidoForm.get('cantidad');
  // }
    
  public calcularCantidad( ): number {
    const peso: number = +this.peso10.value;
    const pesoTotal: number = +this.pesoTotal.value;

    return (pesoTotal * 1000) / (peso / 10);
    

  }

}

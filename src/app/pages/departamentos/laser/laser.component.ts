import { Component, OnInit } from '@angular/core';
import { QrScannerService } from 'src/app/components/qrScanner/qr-scanner.service';
import swal from 'sweetalert2';
import { ListaDeOrdenesService } from 'src/app/components/lista-de-ordenes/lista-de-ordenes.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FolioService, ValidacionesService } from 'src/app/services/service.index';
import { DEPARTAMENTOS } from 'src/app/config/departamentos';
import { Metalizado } from '../../../models/metalizado.model';
import { Orden } from 'src/app/models/orden.models';
import { FolioLinea } from 'src/app/models/folioLinea.models';
import { Laser } from 'src/app/models/laser.model';

@Component({
  selector: 'app-laser',
  templateUrl: './laser.component.html',
  styles: []
})
export class LaserComponent implements OnInit {

    laserForm: FormGroup;
    orden: Orden;
    laser: Laser;
    linea: FolioLinea = new FolioLinea();
    
    
    // =========================================
    private NOMBRE_DEPTO: string = DEPARTAMENTOS.LASER._n;
    // =========================================
    
  

  constructor(
    public _qrScannerService: QrScannerService,
    public _listaDeOrdenesService: ListaDeOrdenesService,
    private formBuilder: FormBuilder,
    public _folioService: FolioService,
    private _validacionesService: ValidacionesService,
  
  ) {

    this.cargarOrdenesDeDepartamento();
    this._qrScannerService.titulo = DEPARTAMENTOS.LASER._n;
    this._qrScannerService.buscarOrden( this, () => { this.limpiar(); });
    
   }

  ngOnInit() {
    this._qrScannerService.iniciar();

    this.laserForm = this.formBuilder.group({
      cantidadDeBotones: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(99999),
        this._validacionesService.numberValidator,
      ]
    ]
    });
  }

  public get cantidadDeBotones_FB() : AbstractControl {
    return this.laserForm.get('cantidadDeBotones');
  }
  

  cargarOrdenesDeDepartamento(){
    this._listaDeOrdenesService.laser();
  }

  limpiar(){
    this.cargarOrdenesDeDepartamento();
    this._qrScannerService.iniciar();
    this.laserForm.reset();
  }

  onSubmit(modelo: Laser, isValid:boolean, e ){
    e.preventDefault();
    if( !isValid ) return;

    console.log(` Los datos del submit ${JSON.stringify(modelo)}`);

    // this._folioService.modificarOrden(modelo, this.orden._id, DEPARTAMENTOS.LASER._n)
    // .subscribe(()=>{
    //   this.limpiar();
    // });
    
  }

}

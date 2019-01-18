import { Component, OnInit } from '@angular/core';
import { QrScannerService } from 'src/app/components/qrScanner/qr-scanner.service';
import swal from 'sweetalert2';
import { ListaDeOrdenesService } from 'src/app/components/lista-de-ordenes/lista-de-ordenes.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FolioService, ValidacionesService, MaquinaService } from 'src/app/services/service.index';
import { DEPARTAMENTOS } from 'src/app/config/departamentos';
import { Metalizado } from '../../../models/metalizado.model';
import { Orden } from 'src/app/models/orden.models';
import { FolioLinea } from 'src/app/models/folioLinea.models';
import { Laser } from 'src/app/models/laser.model';
import { Maquina } from 'src/app/models/maquina.model';

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

    maquinas: Maquina[]=[];
    
    
    
    // =========================================
    private NOMBRE_DEPTO: string = DEPARTAMENTOS.LASER._n;
    // =========================================
    
  

  constructor(
    public _qrScannerService: QrScannerService,
    public _listaDeOrdenesService: ListaDeOrdenesService,
    private formBuilder: FormBuilder,
    public _folioService: FolioService,
    private _validacionesService: ValidacionesService,
    public _maquinaService: MaquinaService
  
  ) {

    this.cargarOrdenesDeDepartamento();
    this._qrScannerService.titulo = DEPARTAMENTOS.LASER._n;
    this._qrScannerService.buscarOrden( this, 
      () => { this.limpiar(), 
      () => { 
          if ( this.orden.ubicacionActual.laser == null ) {
            // Creamos el departamento transformación para que no nos de error. 
            this.orden.ubicacionActual.laser = new Laser();
            // False por que a esta altura solo vamos a guardar la máquina. 
            this.orden.ubicacionActual.laser.guardar = false;
            this.orden.ubicacionActual.laser.maquinaActual = null;
            
        }
        }
      }
    );

    this._maquinaService.obtenerTodasLasMaquinas().subscribe(( maquinas:Maquina[])=>{
      this.maquinas = maquinas;
    });

    
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

  /**
   *eSta funcion se llama desde el html y manda 
   a que esta orden se marque como trabajando. 
   *
   * @memberof LaserComponent
   */
  public iniciarTrabajoDeOrden( ) {
    // enviamos solo la modificación de la órden con el id 
    // para empezarla a trabajar. La modificación que necesitamos
    // es la de al ubicación actual.
    
    this._folioService.iniciarTrabajoDeOrden(this.orden, DEPARTAMENTOS.TRANSFORMACION, () => { this.limpiar(); } ).subscribe( orden => {
     this.limpiar();
    });

  }

  /**
   *Se ejecuta desde el html y pone en nulo la maquina actual. Se hace
   asi poor que si no existe el departaemtno en el trayecto(Por modificaiones)
  * lo crea. 
   *
   * @memberof LaserComponent
   */
  maquinaActualEnNulo(orden: Orden ) {
    if( orden.ubicacionActual.laser ){
    orden.ubicacionActual.laser.maquinaActual = null
   } else{
     orden.ubicacionActual.laser = new Laser();
     orden.ubicacionActual.laser.maquinaActual = null;
   }
  }




}

import { Component, OnInit } from '@angular/core';
import { QrScannerService } from 'src/app/components/qr-scanner/qr-scanner.service';
import { ListaDeOrdenesService } from 'src/app/components/lista-de-ordenes/lista-de-ordenes.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FolioService, ValidacionesService, MaquinaService, DepartamentoService } from 'src/app/services/service.index';
import { Orden } from 'src/app/models/orden.models';
import { Laser } from 'src/app/models/laser.model';
import { Maquina } from 'src/app/models/maquina.model';
import { GeneralesComponents } from '../../utilidadesPages/generalesComponents';
import { DefaultsService } from 'src/app/services/configDefualts/defaults.service';
import { DepartamentosConfig } from 'src/app/config/departamentosConfig';

@Component({
  selector: 'app-laser',
  templateUrl: './laser.component.html',
  styles: []
})
export class LaserComponent extends GeneralesComponents< Laser > implements OnInit {


  maquinas: Maquina[]=[];
    

  constructor(
    public _qrScannerService: QrScannerService<Laser>,
    public _listaDeOrdenesService: ListaDeOrdenesService,
    public formBuilder: FormBuilder,
    public _folioService: FolioService,
    public _defaultService: DefaultsService,
    public _departamentoService: DepartamentoService,
    public _validacionesService: ValidacionesService,
    // Propios del departamento.
    public _maquinaService: MaquinaService
  
  ) {
    super(
      _qrScannerService,
      _listaDeOrdenesService,
      formBuilder,
      _folioService,
      _defaultService,
      _departamentoService
    );

    this.callbackOpcional_QRScannerService = ( ) => { 
        if ( this.orden.ubicacionActual.laser == null ) {
          // Creamos el departamento transformación para que no nos de error. 
          this.orden.ubicacionActual.laser = new Laser();
          // False por que a esta altura solo vamos a guardar la máquina. 
          this.orden.ubicacionActual.laser.guardar = false;
          this.orden.ubicacionActual.laser.maquinaActual = null; 
      }; 
    }
    
    this.tareasDeConfiguracion( new DepartamentosConfig().LASER )
    
    this._maquinaService.todo().subscribe(( maquinas:Maquina[])=>{
      this.maquinas = maquinas;
    });
  }
  
  ngOnInit() {
     // Propios del departamento.
    this.formulario = this.formBuilder.group({
      cantidadDeBotones: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(99999),
        this._validacionesService.numberValidator,
      ]],
      bl: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(500),
        this._validacionesService.numberValidator,
      ]],
    });
  }

  public get cantidadDeBotones_FB() : AbstractControl {
    return this.formulario.get('cantidadDeBotones');
  }

  public get bl_FB(): AbstractControl{
    return this.formulario.get('bl');
  }
  

  /**
   *Se ejecuta desde el html y pone en nulo la maquina actual. Se hace
   asi poor que si no existe el departaemtno en el trayecto(Por modificaiones)
  * lo crea. 
   *
   * @memberof LaserComponent
   */
  maquinaActualEnNulo(orden: Orden ) {
    if( !orden.ubicacionActual.laser ) orden.ubicacionActual.laser = new Laser();
     orden.ubicacionActual.laser.maquinaActual = null;
  }

  setMaquinaActual( orden: Orden, maquina: Maquina ){
    if( !orden.ubicacionActual.laser ) orden.ubicacionActual.laser = new Laser();
    orden.ubicacionActual.laser.maquinaActual = maquina
  }

}

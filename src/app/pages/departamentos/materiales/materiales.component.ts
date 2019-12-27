import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Orden } from 'src/app/models/orden.models';
import { Materiales } from 'src/app/models/materiales.models';
import { Maquina } from 'src/app/models/maquina.model';
import { QrScannerService } from 'src/app/components/qr-scanner/qr-scanner.service';
import { ListaDeOrdenesService } from 'src/app/components/lista-de-ordenes/lista-de-ordenes.service';
import { DEPARTAMENTOS } from 'src/app/config/departamentos';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { FolioService } from 'src/app/services/folio/folio.service';
import { MaquinaService } from 'src/app/services/maquina/maquina.service';
import { Usuario } from 'src/app/models/usuario.model';
import { GeneralesComponents } from '../../utilidadesPages/generalesComponents';
import { DefaultsService } from 'src/app/services/configDefualts/defaults.service';
import { DepartamentosConfig } from 'src/app/config/departamentosConfig';
import { DepartamentoService } from 'src/app/services/departamento/departamento.service';
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service';
import { filter } from 'rxjs/operators'



@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styles: []
})

export class MaterialesComponent extends GeneralesComponents< Materiales > implements OnInit {

  empleados: Usuario[];
  empleado: Usuario;
  maquinas: Maquina[]=[];
  
  constructor(
    public _qrScannerService: QrScannerService<Materiales>,
    public _listaDeOrdenesService: ListaDeOrdenesService,
    public formBuilder: FormBuilder,
    public _folioService: FolioService,
    public _defaultService: DefaultsService,
    public _departamentoService: DepartamentoService,
    public _validacionesService: ValidacionesService,
    // Propios del departamento.
    public _maquinaService: MaquinaService,
    public _usuarioService: UsuarioService,

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
      if ( this.orden.ubicacionActual.materiales == null ) {
        // Creamos el departamento transformación para que no nos de error. 
        this.orden.ubicacionActual.materiales = new Materiales();
        // False por que a esta altura solo vamos a guardar la máquina. 
        this.orden.ubicacionActual.materiales.guardar = true;
        // this.orden.ubicacionActual.materiales.maquinaActual = null;
        
      } 
    }; 
    
    
    this.tareasDeConfiguracion( new DepartamentosConfig().MATERIALES )


  }



  
  filtrarMaquinas( maquinas: Maquina[]){
    return maquinas.filter(m=>{
    let depto = this.filtrarDeptos(m)
    return depto.length > 0

    } ); 
  }

  filtrarDeptos( m: Maquina ){
    return m.departamentos.filter( 
      (d)=>{ 
        return d.nombre == 'MATERIALES'} 
    )
  }

  ngOnInit() {

    // Propios del departamento.
    this.cargarUsuarios();
    this._maquinaService.todoAbstracto(1, 1000, Maquina)
      .subscribe( ( maquinas:Maquina[] )=>{
        this.maquinas = this.filtrarMaquinas(maquinas)
    });

  
  // Creamos el formulario. 
  this.formulario = this.formBuilder.group({
    // SE VALIDA UN INPUT ESCONDIDO. 
    cargo: ['', [
        Validators.required,
      ]],
    });
  }

  // Get de los campos del formulario. 
  public get cargo_FB() : AbstractControl {
    return this.formulario.get('cargo');
  }

 /**
  *Cargamos los usuarios que pertenecen a materiales.
  *
  * @memberof MaterialesComponent
  */
 cargarUsuarios( ){
  this._usuarioService.cargarMateriales().subscribe(usuarios=>{
    this.empleados = usuarios;
  })

 }

 /**
  *Definimos el empleado que cargo el material 
  para poder registrar la orden. 
  *
  * @param {Usuario} empleado
  * @memberof MaterialesComponent
  */
 setEmpleado( empleado: Usuario ){ 
    this.formulario.get('cargo').setValue( empleado._id );
 }

}

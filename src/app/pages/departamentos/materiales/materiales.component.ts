import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Orden } from 'src/app/models/orden.models';
import { Materiales } from 'src/app/models/materiales.models';
import { FolioLinea } from 'src/app/models/folioLinea.models';
import { Maquina } from 'src/app/models/maquina.model';
import { QrScannerService } from 'src/app/components/qrScanner/qr-scanner.service';
import { ListaDeOrdenesService } from 'src/app/components/lista-de-ordenes/lista-de-ordenes.service';
import { DEPARTAMENTOS } from 'src/app/config/departamentos';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { FolioService } from 'src/app/services/folio/folio.service';
import { MaquinaService } from 'src/app/services/maquina/maquina.service';
import { Usuario } from 'src/app/models/usuario.model';



@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styles: []
})
export class MaterialesComponent implements OnInit {

  materialesForm: FormGroup;
  orden: Orden;
  materiales: Materiales;
  linea: FolioLinea = new FolioLinea();
  empleados: Usuario[];
  empleado: Usuario;



  maquinas: Maquina[]=[];
  
  // =========================================
  private NOMBRE_DEPTO: string = DEPARTAMENTOS.MATERIALES._n;
  // =========================================
  

constructor(
  public _qrScannerService: QrScannerService,
  public _listaDeOrdenesService: ListaDeOrdenesService,
  private formBuilder: FormBuilder,
  public _folioService: FolioService,
  public _maquinaService: MaquinaService,
  public _usuarioService: UsuarioService

) {

  this.cargarOrdenesDeDepartamento();
  this.cargarUsuarios();
  this._qrScannerService.titulo = DEPARTAMENTOS.MATERIALES._n;
  this._qrScannerService.buscarOrden( this, 
    () => { this.limpiar(), 
    () => { 
        if ( this.orden.ubicacionActual.materiales == null ) {
          // Creamos el departamento transformación para que no nos de error. 
          this.orden.ubicacionActual.materiales = new Materiales();
          // False por que a esta altura solo vamos a guardar la máquina. 
          this.orden.ubicacionActual.materiales.guardar = false;
          this.orden.ubicacionActual.materiales.maquinaActual = null;
          
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

  this.materialesForm = this.formBuilder.group({
    // SE VALIDA UN INPUT ESCONDIDO. 
    cargo: ['', [
        Validators.required,
      ]],
    });
  }

  public get cargo_FB() : AbstractControl {
    return this.materialesForm.get('cargo');
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
    this.materialesForm.get('cargo').setValue( empleado._id );
 }

  cargarOrdenesDeDepartamento(){
    this._listaDeOrdenesService.materiales();
  }

  limpiar(){
    this.cargarOrdenesDeDepartamento();
    this._qrScannerService.iniciar();
    this.materialesForm.reset();
  }

  onSubmit(modelo: Materiales, isValid:boolean, e ){
    e.preventDefault();
    if( !isValid ) return;

    this._folioService.modificarOrden(modelo, this.orden._id, DEPARTAMENTOS.MATERIALES._n)
    .subscribe(()=>{
      this.limpiar();
    });
    
  }

  /**
   *eSta funcion se llama desde el html y manda 
  a que esta orden se marque como trabajando. 
  *
  * @memberof MaterialesComponent
  */
  public iniciarTrabajoDeOrden( ) {
    // enviamos solo la modificación de la órden con el id 
    // para empezarla a trabajar. La modificación que necesitamos
    // es la de al ubicación actual.
    
    this._folioService.iniciarTrabajoDeOrden(this.orden, DEPARTAMENTOS.MATERIALES, () => { this.limpiar(); } ).subscribe( () => {
    this.limpiar();
    });

  }

  /**
   *Se ejecuta desde el html y pone en nulo la maquina actual. Se hace
  asi poor que si no existe el departaemtno en el trayecto(Por modificaiones)
  * lo crea. 
  *
  * @memberof MaterialesComponent
  */
  maquinaActualEnNulo(orden: Orden ) {
    if( !orden.ubicacionActual.materiales ) orden.ubicacionActual.materiales = new Materiales();
    orden.ubicacionActual.materiales.maquinaActual = null;
  }

  setMaquinaActual( orden: Orden, maquina: Maquina ){
    if( !orden.ubicacionActual.materiales ) orden.ubicacionActual.materiales = new Materiales();
    orden.ubicacionActual.materiales.maquinaActual = maquina
  }




}

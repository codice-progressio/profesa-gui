import { Component, OnInit } from '@angular/core';
import { MaquinaService } from 'src/app/services/service.index';
import { Maquina } from 'src/app/models/maquina.model';
import { timeout } from 'rxjs/operators';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { MaquinasCrearModificarComponent } from './maquinas-crear-modificar.component';
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service';
import { Generales_GUI_CRUD } from '../../utilidadesPages/Generales_GUI_CRUD';


@Component({
  selector: 'app-maquinas',
  templateUrl: './maquinas.component.html',
  styles: []
})
export class MaquinasComponent extends Generales_GUI_CRUD< Maquina, MaquinaService, MaquinasCrearModificarComponent>  implements OnInit {


  // /**
  //  * Obtiene la lista de las maquinas. 
  //  *
  //  * @type {Maquina []}
  //  * @memberof MaquinasComponent
  //  */
  // elementos: Maquina [] = null;


  // /**
  //  *Almacena el detalle de la maquina 
  //  *
  //  * @type {Maquina}
  //  * @memberof MaquinasComponent
  //  */
  // elementoDetalle: Maquina = null;


  // /**
  //  *Oculta todos los elementos para mostrar 
  //  el componente de creacion de maquinas. 
  //  *
  //  * @type {boolean}
  //  * @memberof MaquinasComponent
  //  */
  // crearModificar: boolean = false;

  // /**
  //  *El id del elemento que se va a modificar. 
  //  Si este elemento esta en null entonces se crea 
  //  uno nuevo en el componente crear-modificar. 
  //  *
  //  * @type {string}
  //  * @memberof MaquinasComponent
  //  */
  // idModificar: string = null;

  // /**
  //  *Muestra la lista de objetos. Sirve para la animacion.
  //  *
  //  * @type {boolean}
  //  * @memberof MaquinasComponent
  //  */
  // mostrarLista: boolean = true;
  // /**
  //  *Muestra el componente crearModificar. 
  //  *
  //  * @type {boolean}
  //  * @memberof MaquinasComponent
  //  */
  // mostrarCrearModificar: boolean = false;
  // /**
  //  *El tiempo que dura en ocultar el componente
  //  completamente. Se toma del tiempo de la clase
  //  faster que es de 500 milisegundos. 
  //  *
  //  * @type {number}
  //  * @memberof MaquinasComponent
  //  */
  // tiempoDeTransicion: number = 500;

  // /**
  //  *Este callback se utiliza para llamar desde el componente 
  //  crear la animacion. 
  //  *
  //  * @type {*}
  //  * @memberof MaquinasComponent
  //  */
  // cbAnimar: any = ()=>{
  //   this.animar();
  // } 

  // /**
  //  *Este callback se tuliza para llamar la carga de elementos desde el componente.
   
  //  *
  //  * @type {*}
  //  * @memberof MaquinasComponent
  //  */
  // cbCargarElementos: any = (  )=>{
  //   this.cargarElementos();
  // } 

  constructor(
    public _maquinaService: MaquinaService,
    public _paginadorService: PaginadorService,
    public _msjService: ManejoDeMensajesService,
  ) {
    super(
      _maquinaService, 
      _paginadorService,
       _msjService);
    
  }


  ngOnInit() {
  }

  // cargarElementos( ){
  //   this._maquinaService.todo().subscribe( elementos => {
  //     this.elementos = elementos;
  //   });
  // }

  // /**
  //  *Muestra el componente de detalles. 
  //  *
  //  * @param {string} id
  //  * @memberof MaquinasComponent
  //  */
  // mostrarDetalle( id: string ) {
  //   this.elementoDetalle = null
  //   this._maquinaService.buscarPorId(id).subscribe((maquina)=>{
  //     this.elementoDetalle = maquina;
  //   } );

  // }

  

  // /**
  //  * Crea una nueva maquina. 
  //  *
  //  * @memberof MaquinasComponent
  //  */
  // crear ( ){
  //   this.animar();
  // }

  // /**
  //  * Interpola los valores necesarios para que se cree
  //  * la animacion al cambiar entre la lista y el registroModificion.
  //  *
  //  * @memberof MaquinasComponent
  //  */
  // animar( ){
  //   this.crearModificar = !this.crearModificar;
  //   setTimeout( ()=>{
  //     this.mostrarLista = !this.mostrarLista;
  //     this.mostrarCrearModificar = !this.mostrarCrearModificar;
  //   }, this.tiempoDeTransicion );
  // }

  // /**
  //  *Elimina una maquina. 
  //  *
  //  * @param {string} id
  //  * @memberof MaquinasComponent
  //  */
  // eliminar( id: string ){
  //   let msj: string ='Si eliminas esta maquina no podras recuperar sus registros y perderas todo su historial. '
  //   this._msjService.confirmacionDeEliminacion(msj, ()=>{
  //     this._maquinaService.eliminar( id ).subscribe( (maquinaEliminada)=>{
  //       this.cargarElementos();
  //     } )
  //   } )
  // }

  // buscar( ) {
  //   console.log( ' buscando ')
  //   // Creamos un nuevo callback.
  //   if( !this.busqueda ){
  //     console.log( ' no se ha realizado busqueda. ')
  //     this.busqueda = true;
  //     setTimeout(() => {
  //       console.log( 'obteniendo termindo actual: ' + this.terminoDeBusqueda)
  //       // Si no hay termino no buscamos. 
  //       if( this.terminoDeBusqueda !== '' ){
  //         this._maquinaService.buscar(this.terminoDeBusqueda ).subscribe( (maquinas)=>{
  //           console.log( ' se ejecuta la busqueda.')
  //           this.elementos = maquinas
  //           this.busqueda = false;
  //         } )
  //       }else {
  //         console.log( ' no hay termino, ejecutamos la busqueda ')
  //         this.busqueda = false;
  //         this.cargarElementos()
  //       }
  //     }, 400);
  //   }


  // }



}

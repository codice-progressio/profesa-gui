import { Component, OnInit, Inject } from '@angular/core';
import { Folio } from 'src/app/models/folio.models';
import {  FolioNewService, ManejoDeMensajesService, UsuarioService } from 'src/app/services/service.index';
import { FoliosCrearModificarComponent } from './folios-crear-modificar.component';
import { Generales_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Generales_GUI_CRUD';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { FiltrosFolio } from 'src/app/services/utilidades/filtrosParaConsultas/FiltrosFolio';

@Component({
  selector: 'app-folios',
  templateUrl: './folios.component.html',
  providers: [
    { provide: 'paginadorFolios', useClass: PaginadorService },
]

})
export class FoliosComponent extends Generales_GUI_CRUD< Folio, FolioNewService, FoliosCrearModificarComponent>  implements OnInit {
  

  /**
   *Almacena la opcion para mostrar o no los folios termiandos. Por defecto no los muestra. 
   *
   * @type {boolean}
   * @memberof FoliosComponent
   */
  mostrarTerminados: boolean = false;



  constructor(
    public _folioNewService: FolioNewService,
    @Inject('paginadorFolios') public _paginadorService: PaginadorService,
    // public _paginadorService: PaginadorService,
    public _msjService: ManejoDeMensajesService,
    public _usuarioService: UsuarioService
  ) { 
    super(
      _folioNewService, 
      _paginadorService,
       _msjService,
       false 
       );

      this._paginadorService.callback = ()=>{
        this.cargarElementosTerminados( this.mostrarTerminados )
      } 
      this.cargarElementosTerminados( this.mostrarTerminados )


   }

  
  
   ngOnInit(): void {
    
  }





  /**
   *Lanza la carga de folios con el parametro terminado en false o true
   dependiendo de lo que se le pase y retorna el valor que se le paso 
   para continuar con la comprobacion. 
   *
   * @param {boolean} mostrarFoliosTerminados
   * @returns {boolean}
   * @memberof FoliosComponent
   */
  mostrarFoliosTerminados( mostrarFoliosTerminados: boolean ): boolean {
    
    
    this.cargarElementosTerminados( mostrarFoliosTerminados )
    
    
    return mostrarFoliosTerminados
  }
  
  cargarElementosTerminados( terminados: boolean = false ){
    this._folioNewService
      .filtros(new FiltrosFolio(this._folioNewService))
        .setVendedor( this._usuarioService.usuario._id )
        .setTerminado( terminados? '1':'0' )
      .servicio
        .todoPorVendedor()
        .subscribe( ( folios ) => {
          this.elementos = folios
      } )

  }









}

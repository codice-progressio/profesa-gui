import { NIVEL } from '../../config/nivelesDeUrgencia';
import { Component, OnInit } from '@angular/core';
import { Folio } from '../../models/folio.models';
import { PreLoaderService } from '../../components/pre-loader/pre-loader.service';
import { PaginadorService } from '../../components/paginador/paginador.service';
import { Usuario } from '../../models/usuario.model';
import { BuscadorRapidoService } from 'src/app/components/buscador-rapido/buscador-rapido.service';
import { BuscadorRapido } from 'src/app/components/buscador-rapido/buscador-rapido';
import { Cliente } from 'src/app/models/cliente.models';
import { FolioService } from 'src/app/services/folio/folio.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';


@Component({
  selector: 'app-seguimiento-de-folios',
  templateUrl: './seguimiento-de-folios.component.html',
  styles: []
})
export class SeguimientoDeFoliosComponent implements OnInit {

  folios: Folio[] = [];
  niveles = NIVEL;
  vendedores: Usuario [] = [];
  filtrando: boolean;
  filtro: string;
  filtros = NIVEL
  
  
  

  constructor(
    public _folioService: FolioService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService,
    public _buscadorRapidoService: BuscadorRapidoService<Cliente>,
    public _clienteService: ClienteService

  ) {
    

    this._buscadorRapidoService.limpiarTodo();
    this._buscadorRapidoService.callbackElementoSeleccionado = ()=>{
      // Filtra los folios por cliente. 
      let idClliente = this._buscadorRapidoService.elementoSeleccionado.objeto._id
      this._folioService.buscarPorCliente( idClliente ).subscribe( (folios)=>{
        this.folios = folios 
      })
    } 
    this._buscadorRapidoService.callbackEliminar = ()=>{
      this.filtrando = false;
      this.filtrar('')
    } 
    this._buscadorRapidoService.nombreDeElemento = 'cliente';
    this._buscadorRapidoService.promesa =()=>{
      return new Promise( (resolve, reject )=>{
        this._clienteService.buscar( this._buscadorRapidoService.termino ).subscribe(
          (folios)=>{
            const datosBuscados: BuscadorRapido<Cliente>[] = [];
            folios.forEach((cliente:Cliente) => {
              const a: BuscadorRapido<Cliente> =  new BuscadorRapido();
              a.nombre = ` ${cliente.nombre}`;
              a.setObjeto(cliente)
              datosBuscados.push(a);

            });
            resolve(datosBuscados )
           
        });
      });
    }

   }

   
  ngOnInit() {

    this._paginadorService.callback = ( desde, limite ) => {
      this.cargarFolios(desde, limite);
    };

    this.cargarFolios();
    
  }

  cargarFolios( desde: number = 0, limite: number = 5) {
    this._folioService.cargarFoliosConOrdenesSinTerminar(desde, limite)
    .subscribe( folios => {
      this.folios = folios;
      this._paginadorService.activarPaginador(this._folioService.totalFolios);
    });
   }

   paginadorConFiltro(  desde: number = 0, limite: number = 5) {
     
     this._folioService.cargarFolioPorPrioridad(this.filtro).subscribe( (folios: any) => {
       this.folios = folios;
       this._paginadorService.activarPaginador(this._folioService.totalFolios);
      });
      
    }
    
    filtrar( filtro: string) {
      // this.filtrando = !(!filtro);
      // this.filtro = filtro;
      // if ( this.filtrando ) {
      //   this._paginadorService.callback = (desde, limite) => {
      //     this.paginadorConFiltro(desde, limite);
      //   };
      //   this.paginadorConFiltro();
        
      // } else {
      //   this._paginadorService.callback = ( desde, limite ) => {
      //     this.cargarFolios(desde, limite);
      //   };
      //   this.cargarFolios();
      // }


   }



}

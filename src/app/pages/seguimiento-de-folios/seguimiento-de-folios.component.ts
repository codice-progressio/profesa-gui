import { NIVEL } from '../../config/nivelesDeUrgencia';
import { Component, OnInit } from '@angular/core';
import { Folio } from '../../models/folio.models';
import { FolioService, UsuarioService } from '../../services/service.index';
import { PreLoaderService } from '../../components/pre-loader/pre-loader.service';
import { PaginadorService } from '../../components/paginador/paginador.service';
import { Usuario } from '../../models/usuario.model';


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
  

  constructor(
    public _folioService: FolioService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService,

  ) {
    
    
   }

   
  ngOnInit() {
    this._preLoaderService.cargando = true;
   

    this._paginadorService.callback = ( desde, limite ) => {
      this.cargarFolios(desde, limite);
    };

    this.cargarFolios();
    
  }

  cargarFolios( desde: number = 0, limite: number = 5) {
    this._folioService.cargarFoliosConOrdenes(desde, limite)
    .subscribe( folios => {
      console.log(folios);
      
      this.folios = folios;
      this._preLoaderService.cargando = false;
      this._paginadorService.activarPaginador(this._folioService.totalFolios);
    });
   }

   paginadorConFiltro(  desde: number = 0, limite: number = 5) {
     
     this._preLoaderService.cargando = true;
     this._folioService.cargarFolioPorPrioridad(0, 15, this.filtro).subscribe( (folios: any) => {
       this._preLoaderService.cargando = false;
       this.folios = folios;
       this._paginadorService.activarPaginador(this._folioService.totalFolios);
      });
      
    }
    
    filtrar( filtro: string) {
      this.filtrando = !(!filtro);
      this.filtro = filtro;
      if ( this.filtrando ) {
        this._paginadorService.callback = (desde, limite) => {
          this.paginadorConFiltro(desde, limite);
        };
        this.paginadorConFiltro();
        
      } else {
        this._paginadorService.callback = ( desde, limite ) => {
          this.cargarFolios(desde, limite);
        };
        this.cargarFolios();
      }


   }



}

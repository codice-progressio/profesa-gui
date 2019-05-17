import { Component, OnInit, Inject } from '@angular/core';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { Generales_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Generales_GUI_CRUD';
import { Tamano } from 'src/app/models/tamano.models';
import { TamanosCrearModificarComponent } from './tamanos-crear-modificar.component';
import { TamanoService } from 'src/app/services/modelo/tamano.service';
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service';

@Component({
  selector: 'app-tamanos',
  templateUrl: './tamanos.component.html',
  styles: []
  ,providers: [{ provide: 'paginadorServiceTamanos', useClass: PaginadorService },]
})
export class TamanosComponent extends Generales_GUI_CRUD< Tamano, TamanoService, TamanosCrearModificarComponent> implements OnInit {

  constructor(
    public elementoService: TamanoService,
    @Inject('paginadorServiceTamanos') public _paginadorService: PaginadorService,
    // public _paginadorService: PaginadorService,
    public _msjService: ManejoDeMensajesService,
  ) {
    super(
      elementoService, 
      _paginadorService,
       _msjService);
    
    
  }


  ngOnInit() {
  }

}
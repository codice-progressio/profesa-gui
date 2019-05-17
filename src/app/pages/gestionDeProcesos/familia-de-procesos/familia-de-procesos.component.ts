import { Component, OnInit, Inject } from '@angular/core';
import { FamiliaDeProcesos } from '../../../models/familiaDeProcesos.model';
import { FamiliaDeProcesosService } from '../../../services/proceso/familia-de-procesos.service';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { Generales_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Generales_GUI_CRUD';
import { FamiliaDeProcesosCrearModificarComponent } from '../familiaDeProcesos/familia-de-procesos-crear-modificar.component';
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service';

@Component({
  selector: 'app-familia-de-procesos',
  templateUrl: './familia-de-procesos.component.html',
  styles: []
  ,
  providers: [
    { provide: 'paginadorServiceFamiliaDeProcesos', useClass: PaginadorService }]
})
export class FamiliaDeProcesosComponent extends Generales_GUI_CRUD< FamiliaDeProcesos, FamiliaDeProcesosService, FamiliaDeProcesosCrearModificarComponent>  implements OnInit {

  constructor(
    public _elementoService: FamiliaDeProcesosService,
    @Inject('paginadorServiceFamiliaDeProcesos') public _paginadorService: PaginadorService,
    // public _paginadorService: PaginadorService,
    public _msjService: ManejoDeMensajesService,
  ) {
    super(
      _elementoService, 
      _paginadorService,
       _msjService);
    
  }


  ngOnInit() {
  }

}

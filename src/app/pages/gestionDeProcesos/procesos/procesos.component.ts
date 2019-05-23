import { Component, OnInit, Inject } from '@angular/core';
import { Proceso } from 'src/app/models/proceso.model';
import { ProcesosCrearModificarComponent } from './procesos-crear-modificar.component';
import { Generales_GUI_CRUD } from '../../utilidadesPages/utilidades-tipo-crud-para-GUI/Generales_GUI_CRUD';
import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { ProcesoService } from 'src/app/services/proceso/proceso.service';
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styles: []
  ,
  providers: [
    { provide: 'paginadorServiceProcesos', useClass: PaginadorService },
]
})
export class ProcesosComponent extends Generales_GUI_CRUD< Proceso, ProcesoService, ProcesosCrearModificarComponent> implements OnInit  {
 

  constructor(
    public _procesoService: ProcesoService,
    @Inject('paginadorServiceProcesos') public _paginadorService: PaginadorService,
    // public _paginadorService: PaginadorService,
    public _msjService: ManejoDeMensajesService,
  ) {
    super(
      _procesoService, 
      _paginadorService,
       _msjService);


    
  }

  ngOnInit() {
  }

}
